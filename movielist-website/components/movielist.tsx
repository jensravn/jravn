import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  FormControl,
  InputGroup,
  Spinner,
} from "react-bootstrap";

export default function MovieList() {
  const [movies, setMovies] = useState<any>();
  const [genreInput, setGenreInput] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = (genre?: string) => {
    fetch("api/movies")
      .then((response) => response.json())
      .then((movie) => setMovies(movie));
  };

  const handleChange = (event: any) => {
    setGenreInput(event.target.value);
  };

  const handleClick = () => {
    setMovies(undefined);
    if (genreInput !== "") {
      fetchMovies(genreInput);
    } else {
      fetchMovies();
    }
  };

  return movies === undefined ? (
    <div
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="grow" />
    </div>
  ) : (
    <div style={{ padding: 100 }}>
      <Row xs={1} md={4} className="g-4">
        {movies.map((movie: any) => (
          <Col key={movie.id}>
            <Card>
              <Card.Img variant="top" src={movie?.image} height={300} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Card.Footer>{movie.genre.join(", ")}</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <hr />
      <InputGroup className="mb-3">
        <FormControl
          onChange={handleChange}
          placeholder="Search for a genre"
          aria-label="Search for a genre"
          aria-describedby="basic-addon2"
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={handleClick}
        >
          Search
        </Button>
      </InputGroup>
    </div>
  );
}
