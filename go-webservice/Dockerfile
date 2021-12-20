# Use official golang image
FROM golang

# Create app folder
RUN mkdir /app

# Copy root into /app
ADD . /app

# CD into app folder
WORKDIR /app

# Compile binary go executable
RUN go build -o main .

# start command for the binary executable
CMD ["/app/main"]