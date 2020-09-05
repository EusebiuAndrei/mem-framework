import { MutationMethod } from '../types';
import ActionHandler from './ActionHandler';

class MutationHandler extends ActionHandler<MutationMethod> {
  constructor() {
    super();
  }
}

export default MutationHandler;
