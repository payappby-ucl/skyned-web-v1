export interface IValidationUtility {
  validateEmail(data: {
    email: string;
    errorType?: "server" | "client";
    message?: string;
  }): void;

  validateTokenId(tokenId: string): void;
}
