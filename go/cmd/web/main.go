package main

import (
	"log"
	"net/http"
	"os"

	"github.com/jensravn/gcp-playground-jens/go/cmd/web/handler"
)

type message struct {
	Data string `json:"data"`
	Type string `json:"type"`
}

func main() {
	http.HandleFunc("/product", handler.Product)
	port, exists := os.LookupEnv("PORT")
	if !exists {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}
	log.Printf("Listening on port %s", port)
	err := http.ListenAndServe(":"+port, nil)
	log.Fatalf("Web server, err: %v", err)
}
