package com.jensravn.springapi.repository;

import com.jensravn.domain.models.Movie;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class MovieRepositoryImpl implements MovieRepository {

  public List<Movie> findAll() {
    return null;
  }
}
