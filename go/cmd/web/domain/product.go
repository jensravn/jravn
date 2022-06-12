package domain

import (
	"fmt"
	"time"
)

type ProductId string

type ProductName string

type Product struct {
	Id        ProductId
	Name      ProductName
	StartDate time.Time
	EndDate   time.Time
}

func NewProduct(id, name, startDate, endDate string) *Product {

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
		Name:      ProductName(name),
		StartDate: start,
		EndDate:   end,
	}
}
