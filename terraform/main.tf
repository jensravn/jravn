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

locals {
  zone   = "europe-west1"
  region = "europe-west1-b"
  google_apis = [
    "cloudbuild.googleapis.com",
    "run.googleapis.com"
  ]
}

provider "google" {
  project = var.project
  region  = local.region
  zone    = local.zone
}

resource "google_project_service" "enable_google_apis" {
  count                      = length(local.google_apis)
  service                    = local.google_apis[count.index]
  disable_dependent_services = true
  disable_on_destroy         = true
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
  location    = google_cloud_run_service.go_cmd_web.location
  project     = google_cloud_run_service.go_cmd_web.project
  service     = google_cloud_run_service.go_cmd_web.name
  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_cloud_run_service" "go_cmd_web" {
  name     = "go-cmd-web"
  location = local.region

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
