import { RegistryKeysEnum } from "./enum";

class SkynedRegistry {
  private static instance: Map<RegistryKeysEnum, any> = new Map();
  private constructor() {
    // * Private
  }

  static getSingleton<T>(name: RegistryKeysEnum, factory: () => T): T {
    if (!this.instance.get(name)) {
      this.instance.set(name, factory());
    }

    return this.instance.get(name);
  }
}

export default SkynedRegistry;
