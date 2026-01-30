/* eslint-disable max-len */
import { RegistryKeysEnum } from "./enum";

/**
 * Singleton class that registers housing all class instances
 * @class
 */
class SkynedRegistry {
  /**
   * The registry instance
   * @private
   * @type {Map}
   */
  private static instance: Map<RegistryKeysEnum, any> = new Map();

  /**
   * Creates the registry instance
   * @private
   */
  private constructor() {
    // * Private
  }

  /**
   *
   * A factory method that creates the instance
   *
   * @template T - The type of the singleton instance
   * @param {RegistryKeysEnum} name - The unique identifier for the class instance
   * @param {function(): T} factory - The factory method for the class
   * @returns {T} The singleton instance
   */

  static getSingleton<T>(name: RegistryKeysEnum, factory: () => T): T {
    if (!this.instance.get(name)) {
      this.instance.set(name, factory());
    }

    return this.instance.get(name);
  }
}

export default SkynedRegistry;
