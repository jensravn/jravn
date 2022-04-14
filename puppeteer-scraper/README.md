# puppeteer-scraper

## Run in local

1. Run `node server`
2. Visit `localhost:8080?url=https://github.com`
3. Should show screenshot of github.com

## Save screenshot

```js
page.screenshot({ path: "screenshots/github.png" });
```
