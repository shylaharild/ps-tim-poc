output "logs_bucket_arn" {
  value       = aws_s3_bucket.logs_bucket.arn
  description = "ARN of the Logs S3 bucket"
}

output "assets_bucket_arn" {
  value       = aws_s3_bucket.assets_bucket.arn
  description = "ARN of the Assets S3 bucket"
}
