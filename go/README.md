# go

## Setup go project

- Install the Go extension in VS Code
- The extension will prompt you to download and install the Go language and tools
- Open gcp-playground-jens.code-workspace with VS Code
- Run `cd go/`
- Run `go build ./...`

## Run cmd in terminal

- Navigate to cmd package folder (e.g. `cd go/cmd/web`)
- Run `go run main.go`

## Run cmd in VS Code in debug mode

- Click on "Run and Debug"-section to the left in VS code
- Click on the dropdown and "Add Configuration"
- Change "program" value in launch.json to "main.go", like this `"program": "main.go"`

## Run tests in terminal

- Run `go test ./...`

## Run tests in VS Code

- Open the test explorer in VS Code.
- Click the play icon for one or multiple tests.

## Debug a test in VS Code

- Open a test file in VS Code
- Click `debug test` on top of the test function
