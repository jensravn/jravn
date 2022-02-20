package com.jensravn.springapi.repository;

import com.jensravn.springapi.models.Movie;
import java.util.List;

public interface MovieRepository {

  List<Movie> findAll();
}
