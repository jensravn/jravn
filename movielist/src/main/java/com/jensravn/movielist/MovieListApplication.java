package com.jensravn.movielist;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
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

  public static void main(String[] args) {
    SpringApplication.run(MovieListApplication.class, args);
  }

  @GetMapping("/movies")
  public ArrayList<Movie> movies(@RequestParam(required = false) String genrer)
      throws IOException, ExecutionException, InterruptedException {
    return getMoviesDatastore(genrer);
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
          .add(new Movie(1, document.getString("title"), document.getString("description"),
              "https://storage.googleapis.com/gcp-playground-jens.appspot.com/"
                  + document.getString("imageFilename"), (List<String>) document.get("genre")));
    }
    return movieList;
  }

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
}
