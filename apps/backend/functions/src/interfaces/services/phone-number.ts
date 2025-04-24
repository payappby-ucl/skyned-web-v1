import { IPhoneNumber } from "@workspace/shared";

/**
 * Represents a service to verify and format phone number
 */
export interface IPhoneNumberService {
  isValidPhoneNumber(phoneNumber: string): boolean;
  formatPhoneNumber(phoneNumber: string): IPhoneNumber;
}
