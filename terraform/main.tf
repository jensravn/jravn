terraform {
  backend "gcs" {
    # bucket and prefix is being set through backend-config
  }
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.50.0"
    }
  }
}

locals {
  region = "europe-west1"
  zone   = "europe-west1-b"
}

provider "google" {
  project = var.project_id
  region  = local.region
  zone    = local.zone
}

// Registries
resource "google_artifact_registry_repository" "cloud_run" {
  format                 = "DOCKER"
  location               = local.region
  repository_id          = "cloud-run"
  cleanup_policy_dry_run = false
  // Cleanup policies. Keep policies will take precedence over delete policies.
  cleanup_policies {
    id     = "delete-if-older-than-30-days"
    action = "DELETE"
    condition {
      older_than = "2592000s" // 30 days
    }
  }
  cleanup_policies {
    id     = "keep-minimum-versions"
    action = "KEEP"
    most_recent_versions {
      keep_count = 5
    }
  }
}

// Services
resource "google_cloud_run_v2_service" "jravn" {
  name     = "jravn"
  location = local.region
  ingress  = "INGRESS_TRAFFIC_ALL"
  template {
    containers {
      image = "europe-west1-docker.pkg.dev/jensravn/cloud-run/jravn:${var.label}"
    }
    service_account = google_service_account.cloud_run_jravn_sa.email
  }
}
resource "google_cloud_run_service_iam_binding" "jravn_iam_binding" {
  location = google_cloud_run_v2_service.jravn.location
  service  = google_cloud_run_v2_service.jravn.name
  role     = "roles/run.invoker"
  members = [
    "allUsers"
  ]
}

// Databases
resource "google_firestore_database" "database" {
  project     = var.project_id
  name        = "(default)"
  location_id = local.region
  type        = "FIRESTORE_NATIVE"
}

// Service accounts
resource "google_service_account" "cloud_run_jravn_sa" {
  account_id   = "cloud-run-jravn-sa"
  display_name = "service account for cloud run service jravn"
}

// IAM role bindings
resource "google_project_iam_binding" "role_binding_datastore_user" {
  project = var.project_id
  role    = "roles/datastore.user"
  members = [
    "serviceAccount:${google_service_account.cloud_run_jravn_sa.email}",
  ]
}
