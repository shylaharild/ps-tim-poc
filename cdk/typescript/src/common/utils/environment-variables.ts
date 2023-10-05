import { TargetAccounts } from "./account-environment";
import { StackEnvs } from "../constants/stack-environment.enum";

export interface EnvironmentVariableObject {
  [key: string]: string | string[];
}

export interface EnvironmentVariablesOptions {
  dev?: EnvironmentVariableObject;
  staging?: EnvironmentVariableObject;
  preprod?: EnvironmentVariableObject;
  prod?: EnvironmentVariableObject;
}

/**
 * This function takes in a user's configured AWS account for the service and
 * returns the account variables for the account being deployed to
 * dev will always be selected as it is the "default" account for all services
 *
 * @param target - Target Account i.e. TargetAccounts.dev
 * @param account - Account Variables Configured
 */
function getEnvironmentVariables(
  env: EnvironmentVariablesOptions,
  target?: TargetAccounts
): EnvironmentVariableObject {
  const targetEnvVariables = target ? loadConfig(target.name, env) : {};
  return { ...loadConfig(StackEnvs.dev, env), ...targetEnvVariables };

  function loadConfig(
    target: StackEnvs,
    variables: EnvironmentVariablesOptions
  ): EnvironmentVariableObject {
    const accounts = variables[target];
    return accounts ?? {};
  }
}

export function parseEnvironmentVariables(opts: {
  envVariables?: EnvironmentVariablesOptions;
  targetAccount?: TargetAccounts;
}): EnvironmentVariableObject {
  const { targetAccount, envVariables } = opts;
  if (!envVariables) return {};
  return getEnvironmentVariables(envVariables, targetAccount);
}

export function getTargetAccount(opts: { serviceAcc: StackEnvs }): TargetAccounts {
  const { serviceAcc } = opts;
  switch (serviceAcc) {
    case "dev":
      return TargetAccounts.dev;
    case "staging":
      return TargetAccounts.staging;
    case "prod":
      return TargetAccounts.prod;
    default:
      return TargetAccounts.dev;
  }
}
