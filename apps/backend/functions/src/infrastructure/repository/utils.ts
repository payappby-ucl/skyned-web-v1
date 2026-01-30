import { SkynedUtils } from "../../utils";

/**
 * Concrete implementation of IDBUtils
 *
 * @class
 */
export abstract class DBUtils {
  /**
   * Casts Database json type of interface
   */

  protected deserialize = SkynedUtils.deserialize;
}
