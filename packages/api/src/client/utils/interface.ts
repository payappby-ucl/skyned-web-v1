import { toast } from "sonner";

export type ToastType = typeof toast;
export interface IUtils {
  toast: ToastType;
  handleError(error: any): string;
  alertError(error: any): void;

  pick<T extends object, K extends keyof T>(
    data: T,
    properties: K[],
  ): Pick<T, K>;
  exclude<T extends object, K extends keyof T>(
    data: T,
    properties: K[],
  ): Omit<T, K>;
}
