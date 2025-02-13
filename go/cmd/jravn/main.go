package main

import (
	"fmt"
	"log/slog"
	"os"

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
	s := jravn.NewHTTPServer(projectID)
	slog.Info("starting http server", "port", 8080)
	err := s.ListenAndServe()
	return fmt.Errorf("listen and serve: %w", err)
}
