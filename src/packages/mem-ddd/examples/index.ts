import { Entity } from '../model/Entity';
import { BusinessRule } from '../rule/BusinessRule';

class SomeRule implements BusinessRule {
  message = 'Some Rule';

  isBroken() {
    return false;
  }
}

interface SomeProps {
  age: number;
  name: string;
}

class Some extends Entity<SomeProps> {
  get age() {
    return this.props.age;
  }

  get name() {
    return this.props.name;
  }

  private constructor(props: SomeProps) {
    super(props);
  }

  public static create(props: SomeProps) {
    return new Some(props);
  }

  public doSth() {
    this.checkRule(new SomeRule());
  }
}

const some = Some.create({ age: 23, name: 'John' });
console.log(some);
some.doSth();
