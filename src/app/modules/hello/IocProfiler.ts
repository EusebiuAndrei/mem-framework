import { Container } from 'inversify';
import HelloRepo from './repos/HelloRepo';

class HelloIocProfiler {
  static async profile(container: Container) {
    container.bind<HelloRepo>(HelloRepo).toSelf();
  }
}

export default HelloIocProfiler;
