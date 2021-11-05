export interface BusinessRule {
  message: string;
  isBroken: () => boolean;
}
