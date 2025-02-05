import { toast } from "sonner";
import { HTTPClientV1 } from "./http";
import { IBrandApi } from "./interface";
import { BrandError } from "./error";
import { Utils } from "./utils";

export class BrandApi implements IBrandApi {
  private static instance: IBrandApi | null = null;
  private constructor() {}

  static factory() {
    if (!BrandApi.instance) {
      BrandApi.instance = new BrandApi();
    }

    return BrandApi.instance;
  }

  httpClient = new HTTPClientV1();
  toast = toast;
  error = new BrandError(this.toast);
  utils = new Utils();
}
