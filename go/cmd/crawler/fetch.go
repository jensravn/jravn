package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"

	"golang.org/x/net/html"
)

type Fetcher interface {
	Fetch(url string) (body string, urls []string, err error)
}

type fetch struct {
}

func (rf fetch) Fetch(url string) (string, []string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", nil, fmt.Errorf("Could not get from url %s: %v", url, err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", nil, fmt.Errorf("Could not read body of %s: %v", url, err)
	}
	tokens := html.NewTokenizer(bytes.NewReader(body))
	urls := urls(tokens)
	return string(body), urls, nil
}

func urls(tokens *html.Tokenizer) []string {
	var urls []string
loop:
	for {
		tt := tokens.Next()
		switch tt {
		case html.ErrorToken:
			break loop
		case html.StartTagToken:
			t := tokens.Token()
			for _, a := range t.Attr {
				if a.Key == "href" {
					urls = append(urls, a.Val)
				}
			}
		}
	}
	return urls
}
