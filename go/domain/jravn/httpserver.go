package jravn

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/jensravn/jravn/domain/question"
)

func NewHTTPServer(questionNoteRepo question.NoteRepo) *http.Server {
	router := http.NewServeMux()

	// routes - api
	router.HandleFunc("GET /api/daily-cloud-question/{year}/{month}/{day}", getApiDailyCloudQuestion)
	router.HandleFunc("GET /api/daily-cloud-question/note/{year}/{month}/{day}", getApiDailyCloudQuestionNote(questionNoteRepo))
	router.HandleFunc("POST /api/daily-cloud-question/note/comment/{year}/{month}/{day}", postApiDailyCloudQuestionNoteComment(questionNoteRepo))
	router.HandleFunc("PUT /api/daily-cloud-question/note/most-voted/{year}/{month}/{day}", putApiDailyCloudQuestionNoteMostVoted(questionNoteRepo))
	router.HandleFunc("PUT /api/daily-cloud-question/note/our-answer/{year}/{month}/{day}", putApiDailyCloudQuestionNoteOurAnswer(questionNoteRepo))

	// routes - html
	router.HandleFunc("GET /404", get404)
	router.HandleFunc("GET /question", getQuestion)
	router.HandleFunc("GET /question/review", getQuestionReview)

	// static files
	fs := http.FileServer(http.Dir("./static"))
	router.Handle("/", fs)

	return &http.Server{
		Addr:    ":8080",
		Handler: router,
	}
}

func get404(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/404.html")
}

func getQuestion(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/question.html")
}

func getQuestionReview(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/question/review.html")
}

func getApiDailyCloudQuestion(w http.ResponseWriter, r *http.Request) {
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
}

func getApiDailyCloudQuestionNote(questionNoteRepo question.NoteRepo) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
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
		q, exist, err := questionNoteRepo.Get(t)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		if !exist {
			q = &question.Note{}
		}
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(q)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
	}
}

func postApiDailyCloudQuestionNoteComment(questionNoteRepo question.NoteRepo) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
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
		n, exist, err := questionNoteRepo.Get(t)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		if !exist {
			n = &question.Note{}
		}
		type comment struct {
			Comment string `json:"comment"`
		}
		cmt := comment{}
		err = json.NewDecoder(r.Body).Decode(&cmt)
		if err != nil {
			http.Error(w, `invalid request body`, http.StatusBadRequest)
			return
		}
		n.Comments = append(n.Comments, question.Comment{Text: cmt.Comment, TimeStamp: time.Now()})
		err = questionNoteRepo.Put(t, n)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusNoContent)
	}
}

func putApiDailyCloudQuestionNoteMostVoted(questionNoteRepo question.NoteRepo) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
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
		n, exist, err := questionNoteRepo.Get(t)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		if !exist {
			n = &question.Note{}
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
		err = questionNoteRepo.Put(t, n)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusNoContent)
	}
}

func putApiDailyCloudQuestionNoteOurAnswer(questionNoteRepo question.NoteRepo) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
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
		n, exist, err := questionNoteRepo.Get(t)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		if !exist {
			n = &question.Note{}
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
		err = questionNoteRepo.Put(t, n)
		if err != nil {
			http.Error(w, `internal server error`, http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusNoContent)
	}
}
