import { BusinessRule } from './BusinessRule';

export class BusinessRuleValidationError extends Error {
  constructor(brokenRule: BusinessRule) {
    super(brokenRule.message);
  }
}
