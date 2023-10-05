# Logs Bucket Resource
resource "aws_s3_bucket" "logs_bucket" {
  bucket = "${var.prefix}-logs-${data.aws_caller_identity.current.account_id}-${var.environment}"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "logs_bucket" {
  bucket = aws_s3_bucket.logs_bucket.bucket

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "logs_bucket" {
  bucket = aws_s3_bucket.logs_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Assets Bucket Resource
resource "aws_s3_bucket" "assets_bucket" {
  bucket = "${var.prefix}-assets-${data.aws_caller_identity.current.account_id}-${var.environment}"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "assets_bucket" {
  bucket = aws_s3_bucket.assets_bucket.bucket

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "assets_bucket" {
  bucket = aws_s3_bucket.assets_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
