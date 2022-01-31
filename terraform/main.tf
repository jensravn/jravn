terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.6.0"
    }
  }
}

provider "google" {
    credentials = file("terraform-key.json")

    project = "gcp-playground-jens"
    region = "europe-west1"
    zone = "europe-west1-b"
}

resource "google_cloud_run_service" "run_go_webservice" {
  name = "go-webservice"
  location = "europe-west1"

  template {
    spec {
      containers {
        image = "eu.gcr.io/gcp-playground-jens/go-webservice"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

terraform {
    backend "gcs" {
      bucket = "gcp-playground-jens-terraform"
      prefix = "state"
      credentials = "terraform-key.json"
    }
}
