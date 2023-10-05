import { AWSAccountIds } from "../constants/account.constants";
import { StackEnvs } from "../constants/stack-environment.enum";

/**
 * Helper class to help manage account configuration and other useful parts
 * This allows us to map from environment name, to an actual account number
 */
export class TargetAccounts {
  public static dev = new TargetAccounts(AWSAccountIds.dev, StackEnvs.dev);
  public static staging = new TargetAccounts(AWSAccountIds.staging, StackEnvs.staging);
  public static prod = new TargetAccounts(AWSAccountIds.prod, StackEnvs.prod);

  public accountId: string;
  public name: StackEnvs;

  private constructor(accountId: string, name: StackEnvs) {
    this.accountId = accountId;
    this.name = name;
  }
}
