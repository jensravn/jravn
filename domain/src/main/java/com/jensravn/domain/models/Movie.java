package com.jensravn.domain.models;

import java.util.List;

public class Movie {

  private final int id;
  private final String title;
  private final String description;
  private final String image;
  private final List<String> genre;

  public Movie(int id, String title, String description, String image, List<String> genre) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.genre = genre;
  }

  public int getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public String getImage() {
    return image;
  }

  public List<String> getGenre() {
    return genre;
  }
}
