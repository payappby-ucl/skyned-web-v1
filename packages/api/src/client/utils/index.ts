"use client";

import { IUtils, ToastType } from "./interface";

export * from "./interface";
export class Utils implements IUtils {
  constructor(toast: ToastType) {
    this.toast = toast;
  }
  toast: IUtils["toast"];
  handleError: IUtils["handleError"] = (error) => {
    if (error?.name === "FirebaseError") {
      switch (error.code) {
        // * Auth Errors
        case "auth/email-already-exists":
          return "Email address already exist.";
        case "auth/insufficient-permission":
          return "Permission Denied";
        case "auth/invalid-email":
          return "Invalid email address";
        case "auth/invalid-password":
          return "Password must be at least 6 charaters";
        case "auth/user-not-found":
        case "auth/wrong-password":
          return "Email / password not correct.";
        case "auth/invalid-login-credentials":
          return "Email / password not correct.";
        case "auth/invalid-credential":
          return "Email / password not correct.";
        case "auth/user-disabled":
          return "Error: Your account may have been suspended. Please contact support";
        case "auth/too-many-requests":
          return "Access to this account has been temporarily disabled due to many failed login attempts.";
        case "auth/network-request-failed":
          return "A network error has occurred, please try again.";
        case "auth/internal-error":
          return "Please verify your email address";

        default:
          return "Oops! something went wrong please try again.";
      }
    }

    return (
      error?.message ||
      error?.data?.message ||
      "Oops! something went wrong please try again."
    );
  };

  alertError: IUtils["alertError"] = (err) => {
    const message = this.handleError(err);
    this.toast.error(message);
  };

  handleServerActionResponse: IUtils["handleServerActionResponse"] = (data) => {
    if (data.success === false) {
      throw new Error(data.message);
    }

    return data.data;
  };

  pick: IUtils["pick"] = <T extends object, K extends keyof T>(
    data: T,
    properties: K[],
  ) => {
    const entries = Object.entries(data) as [K, T[K]][];
    const result = Object.fromEntries(
      entries.filter(([key]) => properties.includes(key)),
    ) as Pick<T, K>;

    return result;
  };

  exclude: IUtils["exclude"] = <T extends object, K extends keyof T>(
    data: T,
    properties: K[],
  ) => {
    const entries = Object.entries(data) as [K, T[K]][];
    const result = Object.fromEntries(
      entries.filter(([key]) => !properties.includes(key)),
    ) as unknown as Omit<T, K>;

    return result;
  };

  copyToClipboard: IUtils["copyToClipboard"] = (text, alertMessage) => {
    navigator.clipboard.writeText(text);
    this.toast.info(`${alertMessage || text} copied to clipboard.`);
  };

  formatCurrency: IUtils["formatCurrency"] = ({
    amount,
    currency = "CAD",
    currencyDisplay = "narrowSymbol",
    maximumFractionDigits = 2,
    style = "currency",
    ...rest
  }) => {
    return new Intl.NumberFormat("en-Us", {
      style,
      currency,
      currencyDisplay,
      maximumFractionDigits,
      ...rest,
    }).format(amount);
  };

  formatNumber: IUtils["formatNumber"] = ({ value, ...rest }) => {
    return new Intl.NumberFormat("en-Us", {
      ...rest,
    }).format(value);
  };
}
