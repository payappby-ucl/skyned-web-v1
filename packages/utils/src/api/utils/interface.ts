export interface IUtils {
  pick<T extends object, K extends keyof T>(
    data: T,
    properties: K[],
  ): Pick<T, K>;
  exclude<T extends object, K extends keyof T>(
    data: T,
    properties: K[],
  ): Omit<T, K>;
}
