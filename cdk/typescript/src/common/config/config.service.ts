import { StackEnvs } from "../constants/stack-environment.enum";
import { StackConfigOptions, StackConfigParamsOptions } from "../interfaces/config.interface";

export class StackConfigService {
  private cdkContext?: string = process.env.CDK_CONTEXT_JSON;
  private account?: string = process.env.CDK_DEFAULT_ACCOUNT;
  private region?: string = process.env.CDK_DEFAULT_REGION;
  private stackEnvs = Object.values(StackEnvs);

  public stackConfig: StackConfigParamsOptions = {
    context: this.getCdkContext(),
    account: this.getDefaultAccount(),
    region: this.getDefaultRegion(),
  };

  public getCdkContext(): StackConfigOptions {
    if (this.cdkContext) {
      return JSON.parse(this.cdkContext);
    }
    throw new Error("CDK_CONTEXT_JSON is missing.");
  }

  private getDefaultAccount(): string {
    if (this.account) {
      return this.account;
    }
    throw new Error("CDK_DEFAULT_ACCOUNT is missing.");
  }

  private getDefaultRegion(): string {
    if (this.region) {
      return this.region;
    }
    throw new Error("CDK_DEFAULT_REGION is missing.");
  }

  private getStackContext(): StackConfigOptions {
    return this.stackConfig.context;
  }

  public getStackPrefix(): string {
    const prefix = this.getStackContext().stackPrefix;
    if (!prefix) {
      throw new Error(`Missing 'stackPrefix' parameter from context`);
    }
    return prefix.toLowerCase();
  }

  public getEnvironment(): StackEnvs {
    const env = this.stackEnvs.find((env) => env === this.getStackContext().environment);
    if (!env) {
      throw new Error(`Parameter 'environment' should be: ${this.stackEnvs}`);
    }
    return env;
  }

  public getApplicationName(): string {
    const appName = this.getStackContext().application;
    if (!appName) {
      throw new Error(`Missing 'application' parameter from context`);
    }
    return appName.toLowerCase();
  }

  public getAccountId(): string {
    return this.stackConfig.account;
  }

  public getRegion(): string {
    return this.stackConfig.region;
  }
}
