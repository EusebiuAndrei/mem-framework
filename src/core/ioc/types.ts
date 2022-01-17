import { Container } from 'inversify';

export interface AutomaticRegistrationOptions {
  rootDirectory: string;
}

export type IocSetup<T = void> = (container: Container) => T;
export type IocSetupWithRegistrationOptions<T = void> = (
  container: Container,
  options: AutomaticRegistrationOptions,
) => T;
