import { SSTConfig } from 'sst';
import { MainStack } from './stacks/MainStack';

export default {
  config(_input) {
    return {
      name: 'kanban-app',
      region: 'eu-west-1',
    };
  },
  stacks(app) {
    app.stack(MainStack);
  },
} satisfies SSTConfig;
