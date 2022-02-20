package com.jensravn.springapi.service;

import com.jensravn.springapi.models.Movie;
import java.util.List;

public interface MovieService {

  List<Movie> findAll();
}
