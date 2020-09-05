import { BaseContext } from './core/@cqs/types';

export type TContext = {
  user: null | {
    id: string;
    name: string;
    isAuthenticated: boolean;
  };
};

export type Context = TContext & BaseContext;
