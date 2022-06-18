package domain

import (
	"testing"
	"time"
)

func TestNewProduct(t *testing.T) {
	t.Parallel()
	now, _ := time.Parse("2006-01-02", "2006-01-02")
	tests := []struct {
		test      string
		id        string
		name      string
		startDate string
		endDate   string
		want      Product
	}{
		{
			test:      "Test 1",
			id:        "0001",
			name:      "Name 1",
			startDate: "2000-01-01",
			endDate:   "2000-02-01",
			want: Product{
				Id:        "0336616735",
				Created:   time.Date(2006, time.January, 2, 0, 0, 0, 0, time.UTC),
				Name:      "Name 1",
				StartDate: time.Date(2000, time.January, 1, 0, 0, 0, 0, time.UTC),
				EndDate:   time.Date(2000, time.February, 1, 0, 0, 0, 0, time.UTC),
			},
		},
	}
	for _, tc := range tests {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			if got := NewProduct(now, tc.name, tc.startDate, tc.endDate); *got != tc.want {
				t.Errorf(
					"AddBorder(%s, %s, %s) = \"%s\", want \"%s\"",
					tc.name,
					tc.startDate,
					tc.endDate,
					got,
					tc.want)
			}
		})
	}
}
