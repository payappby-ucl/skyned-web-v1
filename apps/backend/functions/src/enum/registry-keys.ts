/**
 * Unique keys for every class instances
 * @readonly
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
  /** Auth infrastructure */
  AUTH = "Auth",
  /** Database */
  REPOSITORY = "Repository",
  /** Marketing */
  MARKETING = "Marketing",
  /** Events Emitter */
  EVENTS = "Events",

  //* Middlewares
  /** Request validation middleware */
  REQUEST_VALIDATION = "RequestValidationMiddleware",
  AUTH_MIDDLEWARE = "AuthMiddleware",

  // * Routers
  /** Base Router */
  BASE_ROUTER = "BaseRouter",
  /** Health Router */
  HEALTH_ROUTER = "HealthRouter",
  /** API Router */
  API_ROUTER = "ApiRouter",
  /** Version one Router */
  V1_ROUTER = "V1Router",
  /** Auth Router */
  AUTH_ROUTER = "AuthRouter",
  /** Auth Router */
  ADMIN_ROUTER = "AdminRouter",
  /** Contact us Router */
  CONTACT_ROUTER = "ContactRouter",

  // * Controllers
  /** Exception Controller */
  EXCEPTION_CONTROLLER = "ExceptionController",
  /** Health Controller */
  HEALTH_CONTROLLER = "HealthController",
  /** Auth Controller */
  AUTH_CONTROLLER = "AuthController",
  /** Admin Controller */
  ADMIN_CONTROLLER = "AdminController",
  /** Contact Controller */
  CONTACT_CONTROLLER = "ContactController",

  // * Services
  /** Email Service */
  EMAIL_SERVICE = "EmailService",
  /** Storage Service */
  STORAGE_SERVICE = "StorageService",
  /** ID Generator */
  ID_GENERATOR_SERVICE = "IdGeneratorService",
  /** Token Service */
  TOKEN_SERVICE = "TokenService",
  /** Admin Service */
  ADMIN_SERVICE = "AdminService",
  /** Phone number service */
  PHONE_NUMBER_SERVICE = "PhoneNumberService",
  /** Contact Service */
  INQUIRY_SERVICE = "InquiryService",

  // * Utilities
  /** Handles internal validations */
  VALIDATION_UTILITY = "ValidationUtility",
}
