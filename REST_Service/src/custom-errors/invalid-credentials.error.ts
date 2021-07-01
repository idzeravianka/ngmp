const UNAUTHORIZED_STATUS_CODE = 401;

export class UnauthorizedError extends Error {
  public readonly statusCode: number;
  constructor(message: string) {
      super(message);
      this.statusCode = UNAUTHORIZED_STATUS_CODE;
  }
}
