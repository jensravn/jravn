package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"cloud.google.com/go/firestore"
	"golang.org/x/net/websocket"
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

// type Product struct {
// 	id        string    `firestore:"id,omitempty"`
// 	name      string    `firestore:"name,omitempty"`
// 	startDate time.Time `firestore:"startDate,omitempty"`
// 	endDate   time.Time `firestore:"endDate,omitempty"`
// }

func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/websocket", fs)
	http.Handle("/ws", websocket.Handler(MessageWebSocket))
	http.HandleFunc("/product", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			http.ServeFile(w, r, "product-form.html")
		case "POST":
			// CONTROLLER PASS FORM - START
			// Call ParseForm() to parse the raw query and update r.PostForm and r.Form.
			if err := r.ParseForm(); err != nil {
				fmt.Printf("ParseForm() err: %v", err)
				return
			}
			fmt.Printf("Post from website! r.PostFrom = %v\n", r.PostForm)
			formName := r.PostFormValue("name")
			formStartDate := r.PostFormValue("startDate")
			formEndDate := r.PostFormValue("endDate")
			fmt.Printf("Name = %s\n", formName)
			fmt.Printf("Start date = %s\n", formStartDate)
			fmt.Printf("End date = %s\n", formEndDate)
			// CONTROLLER PASS FORM - END

			// CREATE DTO - START
			// product := Product{
			// 	id:        "0003",
			// 	name:      "test 3",
			// 	startDate: time.Now(),
			// 	endDate:   time.Now(),
			// }
			id := fmt.Sprintf("%04d", rand.Intn(1000))
			startDate, _ := time.Parse("2006-01-02", formStartDate)
			endDate, _ := time.Parse("2006-01-02", formEndDate)
			// CREATE DTO - END

			// DATASTORE REPOSITORY - START
			ctx := context.Background()
			client := createClient(ctx)
			_, wr, err := client.Collection("product").Add(ctx, map[string]interface{}{
				"id":        string(id),
				"name":      formName,
				"startDate": startDate,
				"endDate":   endDate,
			})
			if err != nil {
				log.Fatalf("Failed adding alovelace: %v", err)
			}
			text, err := wr.UpdateTime.MarshalText()
			if err != nil {
				log.Fatalf("Failed to get update time")
			}
			// DATASTORE REPOSITORY - END

			data := []byte(text)
			fmt.Println(string(data))
			fmt.Print("response")
			w.Write(data)
		}
	})
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func createClient(ctx context.Context) *firestore.Client {
	// Sets your Google Cloud Platform project ID.
	projectID := "gcp-playground-jens"

	client, err := firestore.NewClient(ctx, projectID)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	// Close client when done with
	// defer client.Close()
	return client
}
