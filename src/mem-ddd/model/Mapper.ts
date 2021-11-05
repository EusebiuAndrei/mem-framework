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
  public itemName: string;
  public itemPower: number;

  constructor(abc: string, itemName: string, itemPower: number) {
    this.abc = abc;
    this.itemName = itemName;
    this.itemPower = itemPower;
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
