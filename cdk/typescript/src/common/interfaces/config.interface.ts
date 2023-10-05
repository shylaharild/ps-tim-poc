import { Construct } from "constructs";

export interface StackConfigOptions {
  environment: string; // Environment in which the stack is used/deployed
  stackPrefix: string; // Prefix to the name of the stack
  application: string; // Name of the application eg: app
}

export interface StackConfigParamsOptions {
  context: StackConfigOptions; //Context associated with the AWS Account
  account: string; // AWS Account ID
  region: string; // AWS Region
}

export interface StackOptions {
  parent: Construct;
  stackName: string;
  config: StackConfigOptions;
}
