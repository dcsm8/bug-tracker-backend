import { BadRequestException, ValidationPipe } from '@nestjs/common';

export function setupValidationPipe(): ValidationPipe {
  return new ValidationPipe({
    forbidUnknownValues: true,
    skipMissingProperties: false,
    transform: true,
    exceptionFactory: (errors): BadRequestException => {
      const errorMessage = errors.toString().trimEnd();
      return new BadRequestException(
        `Errors were encountered while validating a request:\n${errorMessage}`,
      );
    },
  });
}
