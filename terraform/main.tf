provider "google" {
    credentials = file("terraform-key.json")

    project = "gcp-playground-jens"
    region = "europe-west1"
    zone = "europe-west1-b"
}

resource "google_cloud_run_service" "run1" {
  // nextjs-website
}

resource "google_cloud_run_service" "run1" {
  // go-webservice 
}

resource "google_app_engine_application" "app1" {
  // springapi
}

terraform {
    backend "gcs" {
      bucket = "gcp-playground-jens-terraform"
      prefix = "state"
      credentials = "terraform-key.json"
    }
}
