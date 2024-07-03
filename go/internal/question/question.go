package question

import (
	"math/rand/v2"
	"time"
)

type Date struct {
	Date     string `json:"date"`
	Exam     string `json:"exam"`
	Page     int    `json:"page"`
	Question int    `json:"question"`
}

type Note struct {
	MostVoted string    `json:"mostVoted"`
	OurAnswer string    `json:"ourAnswer"`
	Comments  []Comment `json:"comments"`
}

type Comment struct {
	Text      string    `json:"text"`
	TimeStamp time.Time `json:"timeStamp"`
}

func GetDate(t time.Time) Date {
	seed := t.UnixNano()
	r := rand.New(rand.NewPCG(uint64(seed), 2))
	exams = getExams(t)
	n := r.IntN(len(exams))
	e := exams[n]
	q := r.IntN(e.Questions) + 1
	page := getPage(q, e.PageSize)
	date := t.Format(time.DateOnly)
	return Date{
		Date:     date,
		Exam:     e.Exam,
		Page:     page,
		Question: q,
	}
}

func getPage(question int, pageSize int) int {
	if pageSize == 0 {
		pageSize = 5
	}
	return (question-1)/pageSize + 1
}

func getExams(t time.Time) []exam {
	if t.Before(time.Date(2024, 7, 3, 0, 0, 0, 0, time.UTC)) {
		return examsUntil2024_07_03

	}
	return exams
}

type exam struct {
	Exam      string
	Questions int
	PageSize  int
}

var exams = []exam{
	{Exam: "associate-cloud-engineer", Questions: 65},
	{Exam: "cloud-digital-leader", Questions: 70},
	{Exam: "professional-cloud-architect", Questions: 276},
	{Exam: "professional-cloud-database-engineer", Questions: 132, PageSize: 4},
	{Exam: "professional-cloud-developer", Questions: 279},
	{Exam: "professional-cloud-devops-engineer", Questions: 166, PageSize: 4},
	{Exam: "professional-cloud-network-engineer", Questions: 172, PageSize: 4},
	{Exam: "professional-cloud-security-engineer", Questions: 244},
	{Exam: "professional-data-engineer", Questions: 311, PageSize: 10},
	{Exam: "professional-google-workspace-administrator", Questions: 132, PageSize: 4},
	{Exam: "professional-machine-learning-engineer", Questions: 285},
}

var examsUntil2024_07_03 = []exam{
	{Exam: "associate-cloud-engineer", Questions: 65},
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
