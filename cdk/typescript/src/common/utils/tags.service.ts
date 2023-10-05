import { Aspects, Tag } from "aws-cdk-lib";
import { Construct } from "constructs";
import { StackEnvs } from "../constants/stack-environment.enum";
import { EnvironmentTag, ServiceNameTag, ServiceTypeTag } from "../constants/tags.constants";

export interface TagOptions {
  construct: Construct;
  environment: EnvironmentTag;
  serviceName: ServiceNameTag;
  serviceType: ServiceTypeTag;
}
export function getEnvironmentTag(opts: { environment: string }): EnvironmentTag {
  const { environment } = opts;
  const stackEnvs = Object.values(StackEnvs);
  switch (environment) {
    case "dev":
      return EnvironmentTag.DEV;
    case "staging":
      return EnvironmentTag.STAGE;
    case "prod":
      return EnvironmentTag.PROD;
    default:
      throw new Error(`'environment' should be from this list: ${stackEnvs}`);
  }
}

export class TagsService {
  public static setTags(opts: TagOptions): void {
    const { construct, environment, serviceName, serviceType } = opts;
    Aspects.of(construct).add(new Tag("environment", environment));
    Aspects.of(construct).add(new Tag("service_name", serviceName));
    Aspects.of(construct).add(new Tag("service_type", serviceType));
  }
}
