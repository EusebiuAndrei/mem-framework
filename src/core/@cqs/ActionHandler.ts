import express, { NextFunction, Request, Response } from 'express';
import asyncHandler from '../helpers/asyncHandler';
import { HTTPMethod } from '../types';
import { ClassType } from 'class-transformer/ClassTransformer';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestError } from '../api/ApiError';
import { ACIFactory, ACI, BaseContext } from './types';

type DecoratorsPayload<Method extends HTTPMethod> = {
  method: Method;
  path: string;
  SchemaType: ClassType<unknown> | null;
  middlewares: any[];
};

type ExpandedProperty = {
  name: string;
  descriptor: PropertyDescriptor;
};

abstract class ActionHandler<V extends HTTPMethod = HTTPMethod> {
  public readonly router = express.Router();
  public resource = '';
  protected decorated = false;
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
        SchemaType: null,
        middlewares: [],
      }),
    );
  }

  protected decorate(): void {
    this.getExpandedProperties().forEach(({ descriptor: { value: method } }) => method.call(this));
    this.decorated = true;
  }

  public handle<TContext>(factory: ACIFactory<TContext>): void {
    this.getExpandedProperties().forEach(({ name, descriptor: { value: action } }) => {
      const props = this.decoratorsPayload.get(name);
      const middlewares = [
        ...props.middlewares,
        // a
      ];
      this.router[props.method](
        props.path,
        ...middlewares,
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
          // Args - Context - Info Construction
          const { args, context, info } = this.makeACI(req, res, factory);

          // Validation
          const payload = plainToClass(props.SchemaType, args);
          const classErrors = await validate(payload);

          if (classErrors && classErrors.length > 0) {
            // additional logging here

            // const { details } = error;
            // const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',');
            // Logger.error(message);
            return next(new BadRequestError(classErrors[0].toString()));
          }

          // Next
          return action.call(this, args, context, info);
        }),
      );
    });
  }

  private makeACI<TContext>(
    req: Request,
    res: Response,
    factory: ACIFactory<TContext>,
  ): ACI<TContext & BaseContext> {
    // Args - Context - Info Construction
    const { query, params, body, cookies, signedCookies } = req;

    // There are specific to a request (local)
    const defaultArgs = { ...query, ...params, ...body };
    const factoryArgs = factory.args ? factory.args(req) : {}; //
    const args: Record<string, any> = { ...defaultArgs, ...factoryArgs };

    // These are available across any request (global)
    // Anything regarding persistence should be put here to
    // This is where we should extract the user from the authorization token or make any similar operation from a cookie
    const defaultContext = { cookies, signedCookies };
    const factoryContext = factory.context(req) || {};
    const context = { ...defaultContext, ...factoryContext };

    // These are additional information about the request - not pretty sure what to put here yet
    const info = { req, res };

    return {
      args,
      context: context as TContext & BaseContext,
      info,
    };
  }
}

export default ActionHandler;
