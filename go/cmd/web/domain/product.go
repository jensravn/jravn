package domain

import (
	"fmt"
	"math/rand"
	"time"
)

type ProductId string

type ProductName string

type Product struct {
	Id        ProductId
	Created   time.Time
	Name      ProductName
	StartDate time.Time
	EndDate   time.Time
}

func NewProduct(now time.Time, name, startDate, endDate string) *Product {
	rand.Seed(now.UnixNano())
	idMax := 10000000000
	id := fmt.Sprintf("%d", rand.Intn(idMax))
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
		Created:   now,
		Name:      ProductName(name),
		StartDate: start,
		EndDate:   end,
	}
}
