terraform {
  backend "gcs" {
    # bucket and prefix is being set through backend-config
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
        image = "eu.gcr.io/gcp-playground-jens-dev/go-cmd-web"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_project_service" "enable_google_apis" {
  count                      = length(var.gc_services_list)
  service                    = var.gc_services_list[count.index]
  disable_dependent_services = true
  disable_on_destroy         = true
}
