import { shallowEqual } from 'shallow-equal-object';
import { BusinessRule } from '../rule/BusinessRule';
import { BusinessRuleValidationError } from '../rule/BusinessRuleValidationError';
import { BusinessRuleChecker } from '../rule/BusinessRuleChecker';

interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> implements BusinessRuleChecker {
  protected readonly props: T;

  protected constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.props === undefined) {
      return false;
    }

    return shallowEqual(this.props, vo.props);
  }

  public checkRule(rule: BusinessRule) {
    if (rule.isBroken()) {
      throw new BusinessRuleValidationError(rule);
    }
  }
}
