import { Container } from 'inversify';

export interface AutomaticRegistrationOptions {
  rootDirectory: string;
}

export type IocSetup = (container: Container) => void;
