variable "bucket" {
  type = string
}

variable "project" {
  type = string
}

variable "region" {
  type = string
}

variable "zone" {
  type = string
}

variable "gc_services_list" {
  description = "List of Google Cloud APIs & Services used by project"
  type        = list(string)
}
