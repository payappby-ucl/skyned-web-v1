import { IObject, IPhoneNumber } from "@workspace/shared";

/**
 * Concrete implementation of IDBUtils
 *
 * @class
 */
export abstract class DBUtils {
  /**
   * Casts Database json type of interface
   */

  protected deserialize<T extends object, K>(data: T): K {
    const deserialized = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (["primaryImage", "secondaryImage"].includes(key)) {
          return [key, value as unknown as IObject];
        }

        if (key === "phoneNumber") {
          return [key, value as unknown as IPhoneNumber];
        }

        if (key === "previousState" || key === "currentState") {
          return [key, value as any];
        }

        if (Array.isArray(value)) {
          return [key, value.map((v) => this.deserialize(v))];
        }

        return [key, value];
      }),
    );

    return deserialized as K;
  }
}
