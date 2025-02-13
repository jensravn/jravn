package firestore

import (
	"context"
	"errors"
	"fmt"

	"cloud.google.com/go/firestore"
)

var ErrNotFound = errors.New("not found")

type Client struct {
	fs *firestore.Client
}

func NewClient(projectID string) (*Client, error) {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, projectID)
	if err != nil {
		return nil, fmt.Errorf("firestore.NewClient: %w", err)
	}
	return &Client{fs: client}, nil
}
