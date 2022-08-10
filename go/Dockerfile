FROM golang:1.19 AS builder

ARG CMD

WORKDIR /src/app/

COPY . .

COPY /cmd/web/product-form.html /app/resources/

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build \
    -ldflags='-w -s -extldflags "-static"' \
    -a \
    -o /app/cmd \
    ./cmd/${CMD}

FROM gcr.io/distroless/static-debian11:latest

COPY --from=builder /app/resources/ /app/resources/
COPY --from=builder /app/cmd /app/cmd

WORKDIR /app

EXPOSE 8080

ENTRYPOINT ["/app/cmd"]