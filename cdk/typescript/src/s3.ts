import { RemovalPolicy } from "aws-cdk-lib";
import { BlockPublicAccess, Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { StackOptions } from "./common/interfaces/config.interface";
import { ServiceNameTag, ServiceTypeTag } from "./common/constants/tags.constants";
import { TagsService, getEnvironmentTag } from "./common/utils/tags.service";

export function createS3Bucket(opts: {
  stackContext: StackOptions;
  bucketNameSuffix: string;
}): Bucket {
  const { stackContext, bucketNameSuffix } = opts;
  const { parent, stackName, config } = stackContext;

  const s3 = new Bucket(parent, `${stackName}-${bucketNameSuffix}-bucket`, {
    encryption: BucketEncryption.S3_MANAGED,
    bucketName: `${stackName}-${bucketNameSuffix}`.toLowerCase(),
    removalPolicy: RemovalPolicy.RETAIN,
    blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
  });

  TagsService.setTags({
    construct: parent,
    environment: getEnvironmentTag({
      environment: config.environment,
    }),
    serviceName: ServiceNameTag.POC,
    serviceType: ServiceTypeTag.S3,
  });

  return s3;
}
