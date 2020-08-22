import express, { Express } from 'express';
import Joi from '@hapi/joi';
import decorateWithCQS, { DecorateWithCQSProps } from './decorateWithCQS';
import validator from '../../helpers/validator';
import asyncHandler from '../../helpers/asyncHandler';
import { ValidationSource } from '../../helpers/validator';
import { CQSRequest } from 'app-request';
import { MutationMethods } from '../@cqs/cqs';

type MutationDecorators = {
  method: MutationMethods;
  path: string;
  schema: Joi.ObjectSchema<any>;
};

const hiddenMethods = [
  'constructor',
  'initializeMutations',
  'decorateMutations',
  'handleMutations',
  'getMutationsPropertyDescriptor',
];

class MutationHandler {
  private decorated = false;
  public readonly router = express.Router();
  private mutations: Map<string, MutationDecorators> = new Map<string, MutationDecorators>();

  constructor() {
    this.initializeMutations();
    this.decorateMutations();
  }

  private getMutationsPropertyDescriptor(): Array<{
    name: string;
    descriptor: PropertyDescriptor;
  }> {
    return Object.entries(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(this)))
      .map(([propertyDescriptorName, propertyDescriptor]) => ({
        name: propertyDescriptorName,
        descriptor: propertyDescriptor,
      }))
      .filter((queryPropertyDescriptor) => !hiddenMethods.includes(queryPropertyDescriptor.name));
  }

  private initializeMutations(): void {
    const queryNames = this.getMutationsPropertyDescriptor().map(({ name }) => name);
    queryNames.forEach((queryName) =>
      this.mutations.set(queryName, {
        method: 'post',
        path: '',
        schema: Joi.object().keys({}),
      }),
    );
  }

  private decorateMutations(): void {
    this.getMutationsPropertyDescriptor().forEach(({ descriptor: { value: method } }) =>
      method.call(this),
    );

    this.decorated = true;
  }

  public handleMutations(app: Express, cqs: DecorateWithCQSProps): void {
    this.getMutationsPropertyDescriptor().forEach(({ name, descriptor: { value: query } }) => {
      const props = this.mutations.get(name);
      const middlewares = [
        // before decoration middlewares
        decorateWithCQS(cqs),
        validator(props.schema, ValidationSource.ARGS),
      ];

      this.router[props.method](
        props.path,
        ...middlewares,
        asyncHandler(async (req: CQSRequest) => {
          const { args, ctx, info } = req.cqs;
          return query.call(this, args, ctx, info);
        }),
      );
    });
  }
}

export default MutationHandler;
