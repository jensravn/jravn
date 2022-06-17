package domain

import (
	"fmt"
	"time"
)

type ProductId string

type ProductName string

type Timestamp string

type Product struct {
	Id        ProductId
	Timestamp Timestamp
	Name      ProductName
	StartDate time.Time
	EndDate   time.Time
}

func NewProduct(now time.Time, name, startDate, endDate string) *Product {
	id := fmt.Sprintf("%04d", int(now.Unix()))
	timestamp := fmt.Sprintf("%v", now.Format("2006-01-02 15:04:05"))
	start, err := time.Parse("2006-01-02", startDate)
	if err != nil {
		fmt.Printf("Could not parse startDate")
	}
	end, err := time.Parse("2006-01-02", endDate)
	if err != nil {
		fmt.Printf("Could not parse endDate")
	}
	return &Product{
		Id:        ProductId(id),
		Timestamp: Timestamp(timestamp),
		Name:      ProductName(name),
		StartDate: start,
		EndDate:   end,
	}
}
