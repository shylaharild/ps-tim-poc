include {
  path = find_in_parent_folders()
}

locals {
  global_vars = merge(
    yamldecode(
      file(find_in_parent_folders("variables.yaml", find_in_parent_folders("empty.yaml")))
    ),
  )
}

inputs = {}
