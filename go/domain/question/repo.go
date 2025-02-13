package question

import (
	"time"
)

type NoteRepo interface {
	Get(date time.Time) (note *Note, exist bool, err error)
	Put(date time.Time, note *Note) error
}
