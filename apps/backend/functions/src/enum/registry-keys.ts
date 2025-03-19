/**
 * Unique keys for every class instances
 * @readonly
 * @enum {string}
 */
export enum RegistryKeysEnum {
  /** The App */
  APP = "App",

  // * Infrastructure
  /** Logger infrastructure */
  LOGGER = "Logger",
  /** Email infrastructure */
  EMAIL = "Email",
  /** Storage infrastructure */
  STORAGE = "Storage",

  //* Middlewares
  /** Request validation middleware */
  REQUEST_VALIDATION = "RequestValidationMiddleware",

  // * Routers
  /** Base Router */
  BASE_ROUTER = "BaseRouter",
  /** Health Router */
  HEALTH_ROUTER = "HealthRouter",
  /** API Router */
  API_ROUTER = "ApiRouter",
  /** Version one Router */
  V1_ROUTER = "V1Router",

  // * Controllers
  /** Exception Controller */
  EXCEPTION_CONTROLLER = "ExceptionController",
  /** Health Controller */
  HEALTH_CONTROLLER = "HealthController",

  // * Services
  /** Email Service */
  EMAIL_SERVICE = "EmailService",
  /** Storage Service */
  STORAGE_SERVICE = "StorageService",
}
