abstract class BaseException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidInputException extends BaseException {
  constructor(message: string) {
    super(message);
  }
}
