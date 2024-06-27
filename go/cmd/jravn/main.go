package main

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"strconv"
	"time"

	"github.com/jensravn/net/internal/question"
)

func main() {

	// api
	http.HandleFunc("GET /api/daily-cloud-question/{year}/{month}/{day}", func(w http.ResponseWriter, r *http.Request) {
		year, err := strconv.Atoi(r.PathValue("year"))
		if err != nil {
			http.Error(w, "invalid year", http.StatusBadRequest)
			return
		}
		month, err := strconv.Atoi(r.PathValue("month"))
		if err != nil {
			http.Error(w, "invalid month", http.StatusBadRequest)
			return
		}
		day, err := strconv.Atoi(r.PathValue("day"))
		if err != nil {
			http.Error(w, "invalid day", http.StatusBadRequest)
			return
		}
		dateString := fmt.Sprintf("%04d-%02d-%02d", year, month, day)
		t, err := time.Parse(time.DateOnly, dateString)
		if err != nil {
			msg := fmt.Sprintf("invalid date: %s", dateString)
			http.Error(w, msg, http.StatusBadRequest)
			return
		}
		if t.After(time.Now()) {
			http.Error(w, `cannot get future question`, http.StatusBadRequest)
			return
		}
		q := question.Date(t)
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(q)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
	})

	// routes
	http.HandleFunc("/404", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./static/404.html")
	})
	http.HandleFunc("/question", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./static/question.html")
	})

	// static files
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	slog.Info("web server started", "port", 8080)
	err := http.ListenAndServe(":8080", nil)
	slog.Error("web server error", "error", err)
}
