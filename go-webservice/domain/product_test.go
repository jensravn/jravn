package domain

import (
	"testing"
	"time"
)

func TestNewProduct(t *testing.T) {
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
				Id:        "0001",
				Name:      "Name 1",
				StartDate: time.Date(2000, time.January, 1, 0, 0, 0, 0, time.UTC),
				EndDate:   time.Date(2000, time.February, 1, 0, 0, 0, 0, time.UTC),
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewProduct(tt.id, tt.name, tt.startDate, tt.endDate); *got != tt.want {
				t.Errorf(
					"AddBorder(%s, %s, %s) = \"%s\", want \"%s\"",
					tt.name,
					tt.startDate,
					tt.endDate,
					got,
					tt.want)
			}
		})
	}
}
