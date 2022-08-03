package main

import (
	"log"
)

func main() {
	f := fetch{}
	_ = Crawl("https://golang.org/", 1, f)
	log.Println("END")
}
