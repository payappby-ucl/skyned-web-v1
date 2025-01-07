import { SINGLETON_NAMES } from "./lib";

class SkynedRegistry {
  private static instance: Map<typeof SINGLETON_NAMES, any> = new Map();
  private constructor() {
    // * Private
  }

  static getSingleton<T>(name: typeof SINGLETON_NAMES, factory: () => T): T {
    if (!this.instance.get(name)) {
      this.instance.set(name, factory());
    }

    return this.instance.get(name);
  }
}

export default SkynedRegistry;
