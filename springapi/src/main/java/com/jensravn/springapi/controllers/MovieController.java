package com.jensravn.springapi.controllers;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.jensravn.springapi.models.Movie;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MovieController {

  @GetMapping("/movies")
  public ArrayList<Movie> movies(@RequestParam(required = false) String genrer)
      throws IOException, ExecutionException, InterruptedException {
    return getMoviesDatastore(genrer);
  }

  public ArrayList<Movie> getMoviesDatastore(String genrer)
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
      movieList.add(
          new Movie(
              1,
              document.getString("title"),
              document.getString("description"),
              "https://storage.googleapis.com/gcp-playground-jens.appspot.com/"
                  + document.getString("imageFilename"),
              (List<String>) document.get("genre")));
    }
    return movieList;
  }
}
