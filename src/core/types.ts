export type HTTPMethod = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
export type QueryMethod = 'all' | 'get' | 'head';
export type MutationMethod = 'post' | 'put' | 'delete' | 'patch' | 'options';

export type CQMethod = (args: any, ctx: any, info: any) => any;
