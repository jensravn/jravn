package com.jensravn.springapi.service;

import com.jensravn.domain.models.Movie;
import java.util.List;

public interface MovieService {

  List<Movie> findAll();
}
