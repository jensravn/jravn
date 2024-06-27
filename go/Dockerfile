FROM golang:1.22.4 AS builder

WORKDIR /src/app/

RUN mkdir static

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build \
    -o /app/cmd \
    ./cmd/jravn

FROM gcr.io/distroless/static-debian11:latest

COPY --from=builder /src/app/static /app/static
COPY --from=builder /app/cmd /app/cmd

WORKDIR /app

EXPOSE 8080

ENTRYPOINT ["/app/cmd"]