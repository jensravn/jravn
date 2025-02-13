package main

import (
	"fmt"
	"log/slog"
	"os"

	"github.com/jensravn/jravn/adapters/firestore"
	"github.com/jensravn/jravn/domain/jravn"
)

func main() {
	err := run()
	slog.Error(err.Error())
	os.Exit(1)
}

func run() error {
	projectID := os.Getenv("PROJECT_ID")
	if projectID == "" {
		return fmt.Errorf("missing environment variable PROJECT_ID")
	}
	slog.Info("ENV", "PROJECT_ID", projectID)
	fsc, err := firestore.NewClient(projectID)
	if err != nil {
		return fmt.Errorf("new firestore client: %w", err)
	}
	questionNoteRepo := firestore.NewQuestionNoteRepo(fsc)
	s := jravn.NewHTTPServer(questionNoteRepo)
	slog.Info("starting http server", "port", 8080)
	err = s.ListenAndServe()
	return fmt.Errorf("listen and serve: %w", err)
}
