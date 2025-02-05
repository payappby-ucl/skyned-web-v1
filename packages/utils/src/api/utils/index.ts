import { IUtils } from "./interface";

export * from "./interface";
export class Utils implements IUtils {
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
}
