export enum RegistryKeysEnum {
  APP = "App",

  // * Infrastructure
  LOGGER = "Logger",
  EMAIL = "Email",
  STORAGE = "Storage",

  //* Middlewares
  REQUEST_VALIDATION = "RequestValidationMiddleware",

  // * Routers
  BASE_ROUTER = "BaseRouter",
  HEALTH_ROUTER = "HealthRouter",
  API_ROUTER = "ApiRouter",
  V1_ROUTER = "V1Router",

  // * Controllers
  EXCEPTION_CONTROLLER = "ExceptionController",
  HEALTH_CONTROLLER = "HealthController",

  // * Services
  EMAIL_SERVICE = "EmailService",
  STORAGE_SERVICE = "StorageService",
}
