remote_state {
  backend = "s3"
  config = {
    bucket         = "ps-tim-terraform-state-dev-us-east-2"
    key            = "state/dev/us-east-2/tf-ps-tim-s3-buckets-infra.tfstate"
    region         = "us-east-2"
    encrypt        = true
    dynamodb_table = "ps-tim-terraform-state-dev-us-east-2"
  }
}

terraform {
  source = "../../..//modules/"
}

locals {
  vars = merge(
    yamldecode(
      file(find_in_parent_folders("variables.yaml", find_in_parent_folders("empty.yaml")))
    ),
  )
}

inputs = merge(
  local.vars,
  {
  }
)
