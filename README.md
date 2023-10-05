# PoC

The main purpose of this repo is to show how various types of IaC can be used to create resources in AWS

## Requirements / Prerequisites

1. AWS Account
2. Install terragrunt, terraform, tfenv
3. Install AWS CDK
4. Install AWS CLI & configure your local using the AWS Credentials
5. Make sure your user in AWS has right access

## Terragrunt and Terraform

The codebase for using Terragrunt and Terraform can be found in the folder `./terragrunt`. You may need to enable the right version of the Terraform using `tfenv`.

```
tfenv install 1.5.7
tfenv use 1.5.7
```

The codebase creates 2 S3 private buckets in the `us-east-2` region of the AWS Account. To run the code, use the following commands.

To initialise the stack:

```
$ cd ./terragrunt/config/dev/us-east-2
$ terragrunt init
```

The output might look like the one below

```
sri@sri:~/ps-tim-poc/terragrunt/config/dev/us-east-2$ terragrunt init
Remote state S3 bucket ps-tim-terraform-state-dev-us-east-2 does not exist or you don't have permissions to access it. Would you like Terragrunt to create it? (y/n) y

Initializing the backend...

Successfully configured the backend "s3"! Terraform will automatically
use this backend unless the backend configuration changes.

Initializing provider plugins...
- Finding latest version of hashicorp/aws...
- Installing hashicorp/aws v5.19.0...
- Installed hashicorp/aws v5.19.0 (signed by HashiCorp)

Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository
so that Terraform can guarantee to make the same selections by default when
you run "terraform init" in the future.

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

To list the resources to be created, use the command `terragrunt plan` in the same location. The output will be as given below

```
sri@sri:~/ps-tim-poc/terragrunt/config/dev/us-east-2$ terragrunt plan

Initializing the backend...

Initializing provider plugins...
- Reusing previous version of hashicorp/aws from the dependency lock file
- Using previously-installed hashicorp/aws v5.19.0

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
Acquiring state lock. This may take a few moments...
data.aws_caller_identity.current: Reading...
data.aws_iam_policy.AmazonS3FullAccess: Reading...
data.aws_iam_policy.AmazonS3ReadOnlyAccess: Reading...
data.aws_region.current: Reading...
data.aws_region.current: Read complete after 0s [id=eu-west-2]
data.aws_caller_identity.current: Read complete after 0s [id=217695964301]
data.aws_iam_policy.AmazonS3FullAccess: Read complete after 0s [id=arn:aws:iam::aws:policy/AmazonS3FullAccess]
data.aws_iam_policy.AmazonS3ReadOnlyAccess: Read complete after 0s [id=arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess]

Terraform used the selected providers to generate the following execution
plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_s3_bucket.assets_bucket will be created
  + resource "aws_s3_bucket" "assets_bucket" {
      + acceleration_status         = (known after apply)
      + acl                         = (known after apply)
      + arn                         = (known after apply)
      + bucket                      = "ps-tim-assets-217695964301-dev"
      + bucket_domain_name          = (known after apply)
      + bucket_prefix               = (known after apply)
      + bucket_regional_domain_name = (known after apply)
      + force_destroy               = false
      + hosted_zone_id              = (known after apply)
      + id                          = (known after apply)
      + object_lock_enabled         = (known after apply)
      + policy                      = (known after apply)
      + region                      = (known after apply)
      + request_payer               = (known after apply)
      + tags_all                    = (known after apply)
      + website_domain              = (known after apply)
      + website_endpoint            = (known after apply)
    }

  # aws_s3_bucket.logs_bucket will be created
  + resource "aws_s3_bucket" "logs_bucket" {
      + acceleration_status         = (known after apply)
      + acl                         = (known after apply)
      + arn                         = (known after apply)
      + bucket                      = "ps-tim-logs-217695964301-dev"
      + bucket_domain_name          = (known after apply)
      + bucket_prefix               = (known after apply)
      + bucket_regional_domain_name = (known after apply)
      + force_destroy               = false
      + hosted_zone_id              = (known after apply)
      + id                          = (known after apply)
      + object_lock_enabled         = (known after apply)
      + policy                      = (known after apply)
      + region                      = (known after apply)
      + request_payer               = (known after apply)
      + tags_all                    = (known after apply)
      + website_domain              = (known after apply)
      + website_endpoint            = (known after apply)
    }

  # aws_s3_bucket_public_access_block.assets_bucket will be created
  + resource "aws_s3_bucket_public_access_block" "assets_bucket" {
      + block_public_acls       = true
      + block_public_policy     = true
      + bucket                  = (known after apply)
      + id                      = (known after apply)
      + ignore_public_acls      = true
      + restrict_public_buckets = true
    }

  # aws_s3_bucket_public_access_block.logs_bucket will be created
  + resource "aws_s3_bucket_public_access_block" "logs_bucket" {
      + block_public_acls       = true
      + block_public_policy     = true
      + bucket                  = (known after apply)
      + id                      = (known after apply)
      + ignore_public_acls      = true
      + restrict_public_buckets = true
    }

  # aws_s3_bucket_server_side_encryption_configuration.assets_bucket will be created
  + resource "aws_s3_bucket_server_side_encryption_configuration" "assets_bucket" {
      + bucket = "ps-tim-assets-217695964301-dev"
      + id     = (known after apply)

      + rule {
          + apply_server_side_encryption_by_default {
              + sse_algorithm = "AES256"
            }
        }
    }

  # aws_s3_bucket_server_side_encryption_configuration.logs_bucket will be created
  + resource "aws_s3_bucket_server_side_encryption_configuration" "logs_bucket" {
      + bucket = "ps-tim-logs-217695964301-dev"
      + id     = (known after apply)

      + rule {
          + apply_server_side_encryption_by_default {
              + sse_algorithm = "AES256"
            }
        }
    }

Plan: 6 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + assets_bucket_arn = (known after apply)
  + logs_bucket_arn   = (known after apply)

─────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't
guarantee to take exactly these actions if you run "terraform apply" now.
Releasing state lock. This may take a few moments...
```

You can apply these resource creation by using the command `terragrunt apply`

All of these are managed by the configuration in the `terragrunt.hcl` which manages the remote state for the stack. The configuration is as given below.

```
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
```

Although these values are hard coded, they can be externalised by using `${local.vars["parameter"]}` and defining the parameter in the `variables.yaml` in the corresponding config folder.

