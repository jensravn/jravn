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
