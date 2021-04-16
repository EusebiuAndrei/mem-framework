import { UniqueEntityID } from '../identity/UniqueEntityId';
import { BusinessRule } from '../rule/BusinessRule';
import { BusinessRuleValidationError } from '../rule/BusinessRuleValidationError';
import { BusinessRuleChecker } from '../rule/BusinessRuleChecker';

export abstract class Entity<T> implements BusinessRuleChecker {
  protected readonly _id: UniqueEntityID;
  protected readonly props: T;

  protected constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }

  public checkRule(rule: BusinessRule) {
    if (rule.isBroken()) {
      throw new BusinessRuleValidationError(rule);
    }
  }
}

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};
