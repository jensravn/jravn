package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"cloud.google.com/go/pubsub"
	"github.com/jensravn/gcp-playground-jens/go/cmd/web/domain"
	"github.com/jensravn/gcp-playground-jens/go/cmd/web/repository"
)

type message struct {
	Data string `json:"data"`
	Type string `json:"type"`
}

func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/websocket", fs)
	http.HandleFunc("/product", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			http.ServeFile(w, r, "product-form.html")
		case "POST":
			if err := r.ParseForm(); err != nil {
				fmt.Printf("ParseForm() err: %v", err)
				return
			}
			name := r.PostFormValue("name")
			start := r.PostFormValue("startDate")
			end := r.PostFormValue("endDate")

			id := fmt.Sprintf("%04d", int(time.Now().Unix()))
			timestamp := fmt.Sprintf("%v", time.Now().Format("2006-01-02 15:04:05"))

			/***** I/O 💀 -> 🦄 PURE  *****/

			product := domain.NewProduct(id, timestamp, name, start, end)

			/***** PURE 🦄 -> 💀 I/O *****/

			// Pub/Sub
			projectID := "gcp-playground-jens"
			topicID := "go-webservice-product-topic"
			publish(w, projectID, topicID, name)

			// Firestore
			updateTime := repository.Save(product)
			w.Write(updateTime)
		}
	})
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func publish(w io.Writer, projectID, topicID, msg string) error {

	ctx := context.Background()
	client, err := pubsub.NewClient(ctx, projectID)
	if err != nil {
		return fmt.Errorf("pubsub.NewClient: %v", err)
	}
	defer client.Close()

	t := client.Topic(topicID)
	result := t.Publish(ctx, &pubsub.Message{
		Data: []byte(msg),
	})
	// Block until the result is returned and a server-generated
	// ID is returned for the published message.
	id, err := result.Get(ctx)
	if err != nil {
		return fmt.Errorf("Get: %v", err)
	}
	fmt.Fprintf(w, "Published a message; msg ID: %v\n", id)
	return nil
}
