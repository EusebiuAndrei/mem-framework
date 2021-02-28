import * as generators from './generators';

const cli = {
  'gen-query': () => generators.generateQuery(),
  'gen-command': () => generators.generateCommand(),
  'gen-event': () => generators.generateEvent(),
};

export default cli;
