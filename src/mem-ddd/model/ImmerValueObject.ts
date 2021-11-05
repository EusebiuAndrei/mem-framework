import { shallowEqual } from 'shallow-equal-object';
import { BusinessRule } from '../rule/BusinessRule';
import { BusinessRuleValidationError } from '../rule/BusinessRuleValidationError';
import { BusinessRuleChecker } from '../rule/BusinessRuleChecker';
import { immerable } from 'immer';

interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> implements BusinessRuleChecker {
  // Find a way to automatically incorporate immer inside of ValueObject
  [immerable] = true;

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
