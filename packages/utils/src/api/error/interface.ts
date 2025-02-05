export interface IError {
  handleError(error: any): {
    statusCode: number;
    message: string;
  };

  alertError(error: any, header?: string): void;
}
