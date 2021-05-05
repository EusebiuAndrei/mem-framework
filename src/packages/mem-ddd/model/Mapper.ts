import Reshaper from './reshaper/Reshaper';

class Item {
  name: string;
  power: number;

  constructor(name: string, power: number) {
    this.name = name;
    this.power = power;
  }
}

class A {
  bc: string;
  item: Item;

  constructor(bc: string, item: Item) {
    this.bc = bc;
    this.item = item;
  }
}

class B {
  public abc: string;
  public item_name: string;
  public item_power: number;

  constructor(abc: string, item_name: string, item_power: number) {
    this.abc = abc;
    this.item_name = item_name;
    this.item_power = item_power;
  }

  public doSmth() {
    console.log('BBBBBB');
  }
}

const reshaper = new Reshaper((configuration) => {
  configuration
    .createMap<A, B>({ source: A, destination: B }, { transformObjectToClassInstance: true })
    .forMember<'abc'>('abc', (source) => source.bc)
    .expand('item', (source) => source.item);
});

const a = new A('aaaa', new Item('knife', 3));
console.log(a);

const b = reshaper.reshape<A, B>({ source: A, destination: B }, a);
console.log(b);
b.doSmth();
