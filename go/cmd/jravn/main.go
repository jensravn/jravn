package main

import (
	"fmt"
	"log/slog"
	"net/http"
	"strconv"
	"time"

	"github.com/jensravn/net/internal/dailycloudquestion"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/daily-cloud-question", http.StatusSeeOther)
	})
	http.HandleFunc("GET /daily-cloud-question", func(w http.ResponseWriter, r *http.Request) {
		t := time.Now()
		path := fmt.Sprintf("/daily-cloud-question/%d/%d/%d", t.Year(), t.Month(), t.Day())
		http.Redirect(w, r, path, http.StatusSeeOther)
	})
	http.HandleFunc("GET /daily-cloud-question/{year}/{month}/{day}", func(w http.ResponseWriter, r *http.Request) {
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
		url := dailycloudquestion.Date(year, time.Month(month), day)
		_, _ = w.Write([]byte(url))
	})
	err := http.ListenAndServe(":8080", nil)
	slog.Error("web server error", "error", err)
}
