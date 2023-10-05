variable "prefix" {
  description = "Prefix for the resource name"
  type        = string
  default     = "ps-tim"
}

variable "environment" {
  description = "Environment Name"
  type        = string
  default     = "dev"
}

variable "region" {
  description = "AWS Region"
  type        = string
  default     = "eu-west-2"
}
