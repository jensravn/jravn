package handler

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/jensravn/gcp-playground-jens/go/cmd/web/domain"
	"github.com/jensravn/gcp-playground-jens/go/cmd/web/repository"
	"github.com/jensravn/gcp-playground-jens/go/lib/pubsub"
)

func Product(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		http.ServeFile(w, r, "resources/product-form.html")
	case http.MethodPost:
		if err := r.ParseForm(); err != nil {
			log.Printf("ParseForm() err: %v", err)
			return
		}
		name := r.PostFormValue("name")
		start := r.PostFormValue("startDate")
		end := r.PostFormValue("endDate")
		now := time.Now()

		product := domain.NewProduct(now, name, start, end)

		// Pub/Sub
		projectID := "gcp-playground-jens"
		topicID := "go-webservice-product-topic"
		id, err := pubsub.Publish(projectID, topicID, name)
		if err != nil {
			log.Printf("Publish() err: %v", err)
		}
		fmt.Fprintf(w, "Published a message; msg ID: %v\n", id)

		// Firestore
		updateTime := repository.Save(product)
		w.Write(updateTime)
	}
}
