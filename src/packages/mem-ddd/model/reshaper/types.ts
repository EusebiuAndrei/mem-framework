export type Constructor = { new (...args: any[]): {} };

export interface ReshaperParties {
  source: Constructor;
  destination: Constructor;
}
