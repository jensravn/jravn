package repository

import (
	"context"
	"log"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/jensravn/gcp-playground-jens/go/cmd/web/domain"
)

type Product struct {
	id        string    `firestore:"id,omitempty"`
	name      string    `firestore:"name,omitempty"`
	startDate time.Time `firestore:"startDate,omitempty"`
	endDate   time.Time `firestore:"endDate,omitempty"`
}

func Save(p *domain.Product) []byte {
	ctx := context.Background()
	client := createClient(ctx)
	productDto := toFsDto(p)
	_, wr, err := client.Collection("product").Add(ctx, productDto)
	if err != nil {
		log.Fatalf("Failed adding alovelace: %v", err)
	}
	updateTime, err := wr.UpdateTime.MarshalText()
	if err != nil {
		log.Fatalf("Failed to get update time")
	}
	return updateTime
}

func toFsDto(p *domain.Product) map[string]interface{} {
	fsDto := map[string]interface{}{
		"id":        p.Id,
		"name":      p.Name,
		"startDate": p.StartDate,
		"endDate":   p.EndDate,
	}
	return fsDto
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
