package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

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

func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)
	http.Handle("/ws", websocket.Handler(MessageWebSocket))
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
