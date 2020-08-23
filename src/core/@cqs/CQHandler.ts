import express, { Express } from 'express';
import Joi from '@hapi/joi';
import { DecorateWithCQSProps } from './decorateWithCQS';
import { HTTPMethods } from '../@cqs/cqs';

type DecoratorsPayload<Method extends HTTPMethods> = {
  method: Method;
  path: string;
  schema: Joi.ObjectSchema<any>;
  middlewares: any[];
};

type ExpandedProperty = {
  name: string;
  descriptor: PropertyDescriptor;
};

abstract class CQHandler<V extends HTTPMethods = HTTPMethods> {
  protected decorated = false;
  public readonly router = express.Router();
  protected decoratorsPayload: Map<string, DecoratorsPayload<V>> = new Map<
    string,
    DecoratorsPayload<V>
  >();

  constructor() {
    this.initialize();
    this.decorate();
  }

  protected getExpandedProperties(): Array<ExpandedProperty> {
    return Object.entries(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(this)))
      .map(([propertyDescriptorName, propertyDescriptor]) => ({
        name: propertyDescriptorName,
        descriptor: propertyDescriptor,
      }))
      .filter((expandedProperty) => expandedProperty.name !== 'constructor');
  }

  protected initialize(): void {
    const queryNames = this.getExpandedProperties().map(({ name }) => name);
    queryNames.forEach((queryName) =>
      this.decoratorsPayload.set(queryName, {
        method: '' as V,
        path: '',
        schema: Joi.object().keys({}),
        middlewares: [],
      }),
    );
  }

  protected decorate(): void {
    this.getExpandedProperties().forEach(({ descriptor: { value: method } }) => method.call(this));
    this.decorated = true;
  }

  public abstract handle(cqs: DecorateWithCQSProps): void;
}

export default CQHandler;
