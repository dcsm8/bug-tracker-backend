import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  buildHttpExceptionObject,
  HttpExceptionObject,
} from '../errors/http-exception-object';

type HttpExceptionConstructor = (object: HttpExceptionObject) => HttpException;

const mapOfHedgeDocErrorsToHttpErrors: Map<string, HttpExceptionConstructor> =
  new Map([
    ['NotFoundError', (object): HttpException => new NotFoundException(object)],
  ]);

@Catch()
export class ErrorExceptionMapping extends BaseExceptionFilter<Error> {
  catch(error: Error, host: ArgumentsHost): void {
    super.catch(ErrorExceptionMapping.transformError(error), host);
  }

  private static transformError(error: Error): Error {
    const httpExceptionConstructor = mapOfHedgeDocErrorsToHttpErrors.get(
      error.name,
    );
    if (httpExceptionConstructor === undefined) {
      return error;
    }
    const httpExceptionObject = buildHttpExceptionObject(
      error.name,
      error.message,
    );
    return httpExceptionConstructor(httpExceptionObject);
  }
}
