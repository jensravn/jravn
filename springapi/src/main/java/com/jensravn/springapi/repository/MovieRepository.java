package com.jensravn.springapi.repository;

import com.jensravn.domain.models.Movie;
import java.util.List;

public interface MovieRepository {

  List<Movie> findAll();
}
