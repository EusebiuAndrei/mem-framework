import { GenericDictionary } from 'app-request';

export type TContext = {
  user: null | {
    id: string;
    name: string;
    isAuthenticated: boolean;
  };
};

export type TInfo = GenericDictionary;
