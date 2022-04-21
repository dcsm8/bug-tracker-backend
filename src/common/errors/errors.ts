export class NotFoundError extends Error {
  name = 'NotFoundError';
}

export class NotInDBError extends Error {
  name = 'NotInDBError';
}

export class AlreadyInDBError extends Error {
  name = 'AlreadyInDBError';
}

export class ForbiddenIdError extends Error {
  name = 'ForbiddenIdError';
}

export class ClientError extends Error {
  name = 'ClientError';
}

export class PermissionError extends Error {
  name = 'PermissionError';
}

export class TokenNotValidError extends Error {
  name = 'TokenNotValidError';
}

export class TooManyTokensError extends Error {
  name = 'TooManyTokensError';
}

export class PermissionsUpdateInconsistentError extends Error {
  name = 'PermissionsUpdateInconsistentError';
}

export class MediaBackendError extends Error {
  name = 'MediaBackendError';
}

export class PrimaryAliasDeletionForbiddenError extends Error {
  name = 'PrimaryAliasDeletionForbiddenError';
}

export class InvalidCredentialsError extends Error {
  name = 'InvalidCredentialsError';
}

export class NoLocalIdentityError extends Error {
  name = 'NoLocalIdentityError';
}
