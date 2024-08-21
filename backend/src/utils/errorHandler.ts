export class CustomError extends Error {
  statusCode: number;
  code: string;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = "CUSTOM_ERROR"
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}
