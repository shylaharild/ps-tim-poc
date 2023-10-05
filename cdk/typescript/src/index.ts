import { App, Stack, StackProps } from "aws-cdk-lib";
import { StackConfigService } from "./common/config/config.service";
import { StackOptions } from "./common/interfaces/config.interface";
import { createS3Bucket } from "./s3";

export class S3BucketsStack extends Stack {
  private getContext(): StackOptions {
    return {
      parent: this,
      config: config.getCdkContext(),
      stackName: this.stackName,
    };
  }

  private stackContext = this.getContext();

  protected logsBucket = createS3Bucket({
    stackContext: this.stackContext,
    bucketNameSuffix: `logs`,
  }).bucketArn;

  protected assetsBucket = createS3Bucket({
    stackContext: this.stackContext,
    bucketNameSuffix: `assets`,
  }).bucketArn;
}

const config = new StackConfigService();
const app = new App();
const stackName = config.getStackPrefix();
const region = config.getRegion();
const accountId = config.getAccountId();
const stackProps: StackProps = {
  env: {
    region: region,
    account: accountId,
  },
};
new S3BucketsStack(app, stackName, stackProps);
app.synth();
