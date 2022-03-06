package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"time"

	"cloud.google.com/go/pubsub"
	"golang.org/x/net/websocket"
	"jensravn.com/web/domain"
	"jensravn.com/web/repository"
)

type message struct {
	Data string `json:"data"`
	Type string `json:"type"`
}

func MessageWebSocket(ws *websocket.Conn) {
	// we can verify that the origin is an allowed origin
	fmt.Printf("origin: %s\n", ws.Config().Origin)

	done := make(chan struct{})
	go func(c *websocket.Conn) {
		for {
			var msg message
			if err := websocket.JSON.Receive(ws, &msg); err != nil {
				log.Println(err)
				break
			}
			fmt.Printf("recieved message %s\n", msg.Data)
		}
		close(done)
	}(ws)

loop:
	for {
		select {
		case <-done:
			fmt.Println("connection was closed, lets break out of here")
			break loop
		default:
			fmt.Println("sending message")
			message := []message{{
				Data: "datadata",
				Type: "typetype",
			}}
			if err := websocket.JSON.Send(ws, message); err != nil {
				log.Println(err)
				break
			}
			// pause for 3 seconds before sending again
			time.Sleep(3 * time.Second)
		}
	}
	fmt.Println("closing the connection")
	defer ws.Close()
}

func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/websocket", fs)
	http.Handle("/ws", websocket.Handler(MessageWebSocket))
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

			id := fmt.Sprintf("%04d", rand.Intn(1000))

			/***** I/O 💀 -> 🦄 PURE  *****/

			product := domain.NewProduct(id, name, start, end)

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
