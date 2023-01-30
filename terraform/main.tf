terraform {
  backend "gcs" {
    # bucket and prefix is being set through backend-config
  }
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

locals {
  region = "europe-west1"
  zone   = "europe-west1-b"
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
  disable_dependent_services = false
  disable_on_destroy         = false
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service" "go_cmd_pubsub_processor" {
  name     = "${var.image_version_tag}-go-cmd-pubsub-processor"
  location = local.region

  template {
    spec {
      containers {
        image = "eu.gcr.io/${var.project}/go-cmd-pubsub-processor:${var.image_version_tag}"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_policy" "noauth_go_cmd_web" {
  location    = google_cloud_run_service.go_cmd_web.location
  project     = google_cloud_run_service.go_cmd_web.project
  service     = google_cloud_run_service.go_cmd_web.name
  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_cloud_run_service" "go_cmd_web" {
  name     = "${var.image_version_tag}-go-cmd-web"
  location = local.region

  template {
    spec {
      containers {
        image = "eu.gcr.io/${var.project}/go-cmd-web:${var.image_version_tag}"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_policy" "noauth_nextjs" {
  location    = google_cloud_run_service.nextjs.location
  project     = google_cloud_run_service.nextjs.project
  service     = google_cloud_run_service.nextjs.name
  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_cloud_run_service" "nextjs" {
  name     = "${var.image_version_tag}-nextjs"
  location = local.region

  template {
    spec {
      containers {
        image = "eu.gcr.io/${var.project}/nextjs:${var.image_version_tag}"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}
