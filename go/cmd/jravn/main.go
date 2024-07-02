package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/jensravn/jravn/internal/firestore"
	"github.com/jensravn/jravn/internal/question"
)

func main() {
	projectID := os.Getenv("PROJECT_ID")
	if projectID == "" {
		slog.Error("missing environment variable PROJECT_ID")
		os.Exit(1)
		return
	}
	slog.Info("ENV", "PROJECT_ID", projectID)

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
		q := question.GetDate(t)
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(q)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
	})

	http.HandleFunc("GET /api/daily-cloud-question/note/{year}/{month}/{day}", func(w http.ResponseWriter, r *http.Request) {
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
		c, err := firestore.NewClient(projectID)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		repo := firestore.NewQuestionNoteRepo(c)
		q, err := repo.Get(t)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(q)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
	})

	http.HandleFunc("PUT /api/daily-cloud-question/note/our-answer/{year}/{month}/{day}", func(w http.ResponseWriter, r *http.Request) {
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
			http.Error(w, `cannot save answer for future question`, http.StatusBadRequest)
			return
		}
		if t.Before(time.Now().Add(-24 * time.Hour)) {
			http.Error(w, `cannot save answer for past question`, http.StatusBadRequest)
			return
		}
		c, err := firestore.NewClient(projectID)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		repo := firestore.NewQuestionNoteRepo(c)
		n, err := repo.Get(t)
		if err != nil {
			if errors.Is(err, firestore.ErrNotFound) {
				n = &question.Note{}
			} else {
				http.Error(w, `internal server error`, http.StatusInternalServerError)
				return
			}
		}
		if n.OurAnswer != "" {
			http.Error(w, `answer already saved`, http.StatusBadRequest)
			return
		}
		note := question.Note{}
		err = json.NewDecoder(r.Body).Decode(&note)
		if err != nil {
			http.Error(w, `invalid request body`, http.StatusBadRequest)
			return
		}
		if note.OurAnswer != "A" && note.OurAnswer != "B" && note.OurAnswer != "C" && note.OurAnswer != "D" {
			http.Error(w, `invalid answer`, http.StatusBadRequest)
			return
		}
		n.OurAnswer = note.OurAnswer
		err = repo.Put(t, n)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusNoContent)
	})

	http.HandleFunc("PUT /api/daily-cloud-question/note/most-voted/{year}/{month}/{day}", func(w http.ResponseWriter, r *http.Request) {
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
			http.Error(w, `cannot save most voted for future question`, http.StatusBadRequest)
			return
		}
		if t.Before(time.Now().Add(-24 * time.Hour)) {
			http.Error(w, `cannot save most voted for past question`, http.StatusBadRequest)
			return
		}
		c, err := firestore.NewClient(projectID)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		repo := firestore.NewQuestionNoteRepo(c)
		n, err := repo.Get(t)
		if err != nil {
			if errors.Is(err, firestore.ErrNotFound) {
				n = &question.Note{}
			} else {

				http.Error(w, `internal server error`, http.StatusInternalServerError)
				return
			}
		}
		if n.MostVoted != "" {
			http.Error(w, `most voted already saved`, http.StatusBadRequest)
			return
		}
		note := question.Note{}
		err = json.NewDecoder(r.Body).Decode(&note)
		if err != nil {
			http.Error(w, `invalid request body`, http.StatusBadRequest)
			return
		}
		if note.MostVoted != "A" && note.MostVoted != "B" && note.MostVoted != "C" && note.MostVoted != "D" {
			http.Error(w, `invalid most voted`, http.StatusBadRequest)
			return
		}
		n.MostVoted = note.MostVoted
		err = repo.Put(t, n)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusNoContent)
	})

	type comment struct {
		Comment string `json:"comment"`
	}

	http.HandleFunc("POST /api/daily-cloud-question/note/comment/{year}/{month}/{day}", func(w http.ResponseWriter, r *http.Request) {
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
			http.Error(w, `cannot save comment for future question`, http.StatusBadRequest)
			return
		}
		c, err := firestore.NewClient(projectID)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		repo := firestore.NewQuestionNoteRepo(c)
		n, err := repo.Get(t)
		if err != nil {
			if errors.Is(err, firestore.ErrNotFound) {
				n = &question.Note{}
			} else {
				http.Error(w, `internal server error`, http.StatusInternalServerError)
				return
			}
		}
		comment := comment{}
		err = json.NewDecoder(r.Body).Decode(&comment)
		if err != nil {
			http.Error(w, `invalid request body`, http.StatusBadRequest)
			return
		}
		n.Comments = append(n.Comments, question.Comment{Text: comment.Comment, TimeStamp: time.Now()})
		err = repo.Put(t, n)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusNoContent)
	})

	// routes
	http.HandleFunc("/404", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./static/404.html")
	})
	http.HandleFunc("/question", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./static/question.html")
	})
	http.HandleFunc("/question/review", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./static/question/review.html")
	})

	// static files
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	slog.Info("web server started", "port", 8080)
	err := http.ListenAndServe(":8080", nil)
	slog.Error("web server error", "error", err)
}
