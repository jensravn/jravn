FROM golang:1.23.3 AS builder

ARG PROJECT_ID

WORKDIR /src/app/

RUN mkdir static

COPY go.* ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build \
    -o /app/cmd \
    ./cmd/jravn

FROM gcr.io/distroless/static-debian11:latest

ARG PROJECT_ID
ENV PROJECT_ID=${PROJECT_ID}

COPY --from=builder /src/app/static /app/static
COPY --from=builder /app/cmd /app/cmd

WORKDIR /app

EXPOSE 8080

ENTRYPOINT ["/app/cmd"]