package dailycloudquestion

import (
	"fmt"
	"math/rand/v2"
	"time"
)

var exams = []struct {
	Exam      string
	Questions int
	PageSize  int
}{
	{Exam: "associate-cloud-engineer", Questions: 266},
	{Exam: "cloud-digital-leader", Questions: 70},
	{Exam: "professional-cloud-architect", Questions: 276},
	{Exam: "professional-cloud-database-engineer", Questions: 132, PageSize: 4},
	{Exam: "professional-cloud-developer", Questions: 279},
	{Exam: "professional-cloud-devops-engineer", Questions: 166, PageSize: 4},
	{Exam: "professional-cloud-network-engineer", Questions: 172, PageSize: 4},
	{Exam: "professional-cloud-security-engineer", Questions: 244},
	{Exam: "professional-collaboration-engineer", Questions: 79},
	{Exam: "professional-data-engineer", Questions: 311, PageSize: 10},
	{Exam: "professional-google-workspace-administrator", Questions: 132, PageSize: 4},
	{Exam: "professional-machine-learning-engineer", Questions: 285},
}

func Date(year int, month time.Month, day int) string {
	seed := time.Date(year, month, day, 0, 0, 0, 0, time.UTC).UnixNano()
	r := rand.New(rand.NewPCG(uint64(seed), 2))
	n := r.IntN(len(exams))
	e := exams[n]
	q := r.IntN(e.Questions) + 1
	page := getPage(q, e.PageSize)
	template := `<a href="https://www.examtopics.com/exams/google/%s/view/%d">%s</a>`
	text := fmt.Sprintf("%s #%d\n", e.Exam, q)
	url := fmt.Sprintf(template, e.Exam, page, text)
	return url
}

func getPage(question int, pageSize int) int {
	if pageSize == 0 {
		pageSize = 5
	}
	return (question-1)/pageSize + 1
}
