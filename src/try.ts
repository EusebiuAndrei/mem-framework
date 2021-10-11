import 'reflect-metadata';
import { MeetingProposal } from './packages/mem-ddd/examples/meetingProposal/MeetingProposal';

class InnerAbc {
  public inner: string;
}

class ABC {
  private _some: string;

  private constructor(some: string) {
    this._some = some;
  }

  get some() {
    return this._some;
  }
}
Object.defineProperty(ABC.prototype, 'some', { enumerable: true });

const main = async () => {
  // console.log(ABC);

  const abc = new (MeetingProposal.prototype as any).constructor();
  // console.log(abc);
  for (const key in abc) {
    console.log(key);
  }
  // console.log(Object.getOwnPropertyDescriptor(abc, 'some'));
};

main();
