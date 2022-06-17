FROM golang:1.18 AS builder

ARG CMD

WORKDIR /src/app/

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build \
    -ldflags='-w -s -extldflags "-static"' \
    -a \
    -o /app/cmd \
    ./cmd/${CMD}

COPY ./cmd/"${CMD}"/resource[s]/ /app/resources/

FROM gcr.io/distroless/static-debian11:latest

COPY --from=builder /app/cmd /app/cmd
COPY --from=builder /app/resource[s]/ /app/resources/

WORKDIR /app

EXPOSE 8080

ENTRYPOINT ["/app/cmd"]