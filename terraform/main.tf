terraform {
  backend "gcs" {
    bucket = var.bucket
    prefix = "state"
  }
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.27.0"
    }
  }
}

provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.run_web_service.location
  project  = google_cloud_run_service.run_web_service.project
  service  = google_cloud_run_service.run_web_service.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_cloud_run_service" "run_web_service" {
  name     = "go-cmd-web"
  location = "europe-west1"

  template {
    spec {
      containers {
        image = "eu.gcr.io/gcp-playground-jens/go-cmd-web"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

