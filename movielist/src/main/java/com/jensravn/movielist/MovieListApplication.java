package com.jensravn.movielist;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.auth.oauth2.GoogleCredentials;

@SpringBootApplication
@RestController
public class MovieListApplication {

  ArrayList<Movie> movies = new ArrayList<>() {
    {
      add(new Movie(1, "Finding Neverland",
          "The story of Sir J.M. Barrie's friendship with a family who inspired him to create Peter Pan.",
          "/finding_neverland.jpg", "Biography, Drama, Family"));
      add(new Movie(2, "The Dark knight",
          "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice. ",
          "/the_dark_knight.jpg", "Action, Crime, Drama"));
      add(new Movie(3, " Goodfellas",
          "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate. ",
          "/goodfellas.jpg", " Biography, Crime, Drama"));
      add(new Movie(4, "Lucky Number Slevin",
          "A case of mistaken identity lands Slevin into the middle of a war being plotted by two of the city's most rival crime bosses. Under constant surveillance by Detective Brikowski and assassin Goodkat, he must get them before they get him. ",
          "/lucky_number_slevin.jpg", " Crime, Drama, Thriller"));
    }
  };

  public static void main(String[] args) {
    SpringApplication.run(MovieListApplication.class, args);
  }

  @GetMapping("/movies")
  public ArrayList<Movie> movies(@RequestParam(required = false) String genrer)
      throws IOException, ExecutionException, InterruptedException {
    return getMoviesDatastore(genrer);
  }

  private ArrayList<Movie> getMovies(String genrer) {
    if (genrer != null) {
      return movies.stream()
          .filter(movie -> movie.genrer.contains(genrer))
          .collect(Collectors.toCollection(ArrayList::new));
    } else {
      return movies;
    }
  }

  private ArrayList<Movie> getMoviesDatastore(String genrer)
      throws IOException, ExecutionException, InterruptedException {
    FirestoreOptions firestoreOptions =
        FirestoreOptions.getDefaultInstance().toBuilder()
            .setProjectId("gcp-playground-jens")
            .setCredentials(GoogleCredentials.getApplicationDefault())
            .build();
    Firestore db = firestoreOptions.getService();
    ApiFuture<QuerySnapshot> query = db.collection("movies").get();
    QuerySnapshot querySnapshot = query.get();
    List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();
    ArrayList<Movie> movieList = new ArrayList<>();
    for (QueryDocumentSnapshot document : documents) {
      movieList
          .add(new Movie(1, document.getString("title"), "description...", "/img...", "genre..."));
    }
    return movieList;
  }

  public class Movie {

    private final int id;
    private final String title;
    private final String description;
    private final String image;
    private final String genrer;

    public Movie(int id, String title, String description, String image, String genrer) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.image = image;
      this.genrer = genrer;
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

    public String getGenrer() {
      return genrer;
    }
  }

}
