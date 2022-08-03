package pubsub

import (
	"context"
	"fmt"
	"log"

	"cloud.google.com/go/pubsub"
)

func Publish(projectID, topicID, msg string) (string, error) {
	ctx := context.Background()

	client, err := pubsub.NewClient(ctx, projectID)
	if err != nil {
		log.Fatalf("pubsub.NewClient: %v", err)
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
		return "", fmt.Errorf("Get: %v", err)
	}

	return id, nil
}
