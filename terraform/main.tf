terraform {
  backend "gcs" {
    # bucket and prefix is being set through backend-config
  }
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.30.0"
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
  project = var.project_id
  region  = local.region
  zone    = local.zone
}
