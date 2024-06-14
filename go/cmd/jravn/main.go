package main

import (
	"log"
	"net/http"

	"github.com/jensravn/net/internal/dailycloudquestion"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/daily-cloud-question", http.StatusSeeOther)
	})
	http.HandleFunc("GET /daily-cloud-question", func(w http.ResponseWriter, r *http.Request) {
		url := dailycloudquestion.Today()
		w.Write([]byte(url))
	})
	err := http.ListenAndServe(":8080", nil)
	log.Fatal(err)
}
