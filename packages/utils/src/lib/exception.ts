export class Exception extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly statusText: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
}
