import { BusinessRule } from './BusinessRule';

export interface BusinessRuleChecker {
  // is the rule isBroken it should throw an error
  checkRule(rule: BusinessRule): void;
}
