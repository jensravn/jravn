package firestore

import (
	"context"
	"fmt"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/jensravn/jravn/domain/question"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type QuestionNoteRepo struct {
	c *firestore.CollectionRef
}

func NewQuestionNoteRepo(c *Client) *QuestionNoteRepo {
	return &QuestionNoteRepo{c: c.fs.Collection("question-notes")}
}

func (r *QuestionNoteRepo) Get(date time.Time) (note *question.Note, exist bool, err error) {
	docID := date.Format(time.DateOnly)
	docsnap, err := r.c.Doc(docID).Get(context.TODO())
	if err != nil {
		if status.Code(err) == codes.NotFound {
			return nil, false, nil
		}
		return nil, false, fmt.Errorf("doc.Get: %w", err)
	}
	q := question.Note{}
	err = docsnap.DataTo(&q)
	if err != nil {
		return nil, false, fmt.Errorf("docsnap.DataTo: %w", err)
	}
	return &q, true, nil
}

func (r *QuestionNoteRepo) Put(date time.Time, note *question.Note) error {
	docID := date.Format(time.DateOnly)
	_, err := r.c.Doc(docID).Set(context.TODO(), note)
	if err != nil {
		return fmt.Errorf("doc.Set: %w", err)
	}
	return nil
}
