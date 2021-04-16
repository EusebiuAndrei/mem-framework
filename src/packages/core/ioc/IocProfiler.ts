import { Container } from 'inversify';

type IocProfiler = (container: Container) => Promise<void>;

export default IocProfiler;
