package main

import (
	"fmt"
	"log"
	"sync"
)

func Crawl(url string, depth int, fetcher Fetcher) map[string]string {
	um := SafeUrlMap{v: make(map[string]string)}
	var wg sync.WaitGroup
	wg.Add(1)
	go recCrawl("https://golang.org/", depth, fetcher, &um, &wg)
	wg.Wait()
	return um.v
}

func recCrawl(url string, depth int, fetcher Fetcher, um *SafeUrlMap, wg *sync.WaitGroup) {
	defer wg.Done()
	body, urls, err := fetcher.Fetch(url)
	if err != nil {
		s := fmt.Sprint(err)
		um.Add(url, s)
		return
	}
	log.Printf("url: %-50.50s - body: %-80.80q\n", url, body)
	um.Add(url, body)
	var subWg sync.WaitGroup
	for _, u := range urls {
		if depth > 0 && um.Value(u) == "" {
			um.Add(u, "requested")
			subWg.Add(1)
			go recCrawl(u, depth-1, fetcher, um, &subWg)
		}
	}
	subWg.Wait()
	return
}

type SafeUrlMap struct {
	mu sync.Mutex
	v  map[string]string
}

func (um *SafeUrlMap) Add(url, body string) {
	um.mu.Lock()
	um.v[url] = body
	um.mu.Unlock()
}

func (um *SafeUrlMap) Value(url string) string {
	um.mu.Lock()
	defer um.mu.Unlock()
	return um.v[url]
}
