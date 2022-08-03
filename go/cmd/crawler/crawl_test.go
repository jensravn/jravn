package main

import (
	"log"
	"testing"
)

func TestCrawl(t *testing.T) {
	fetchMock := fetchMock{}
	type args struct {
		url     string
		depth   int
		fetcher Fetcher
	}
	tests := []struct {
		name string
		args args
	}{
		{"golang", args{"https://golang.org/", 4, fetchMock}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			urlMap := Crawl(tt.args.url, tt.args.depth, tt.args.fetcher)
			log.Print(urlMap)
		})
	}
}
