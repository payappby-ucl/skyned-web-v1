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
  /** FAQ Router */
  FAQ_ROUTER = "FaqRouter",
  /** Newsletter Router */
  NEWSLETTER_ROUTER = "NewsLetterRouter",
  /** Department Router */
  DEPARTMENT_ROUTER = "DepartmentRouter",
  /** Our team Router */
  OUR_TEAM_ROUTER = "OurTeamRouter",
  /** School Router */
  SCHOOL_ROUTER = "SchoolRouter",
  /** Accommodation Router */
  ACCOMMODATION_ROUTER = "AccommodationRouter",
  /** Intake Router */
  INTAKE_ROUTER = "IntakeRouter",
  /** Blog Post Router */
  BLOG_POST_ROUTER = "BlogPostRouter",
  /** Category Router */
  CATEGORY_ROUTER = "CategoryRouter",
  /** Tag Router */
  TAG_ROUTER = "TagRouter",

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
  /** FAQ Controller */
  FAQ_CONTROLLER = "FaqController",
  /** Newsletter Controller */
  NEWSLETTER_CONTROLLER = "NewsLetterController",
  /** Department Controller */
  DEPARTMENT_CONTROLLER = "DepartmentController",
  /** Our team Controller */
  OUR_TEAM_CONTROLLER = "OurTeamController",
  /** School controller */
  SCHOOL_CONTROLLER = "SchoolController",
  /** Accommodation Controller */
  ACCOMMODATION_CONTROLLER = "AccommodationController",
  /** Intake Controller */
  INTAKE_CONTROLLER = "IntakeController",
  /** program Controller */
  PROGRAM_CONTROLLER = "ProgramController",
  /** Blog Post Controller */
  BLOG_POST_CONTROLLER = "BlogPostController",
  /** Category Controller */
  CATEGORY_CONTROLLER = "CategoryController",
  /** Tag Controller */
  TAG_CONTROLLER = "TagController",

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
  /** Activity Log */
  ACTIVITY_LOG_SERVICE = "ActivityLogService",
  /** FAQ Service */
  FAQ_SERVICE = "FaqService",
  /** Department Service */
  DEPARTMENT_SERVICE = "DepartmentService",
  /** Our team Service */
  OUR_TEAM_SERVICE = "OurTeamService",
  /** School Service */
  SCHOOL_SERVICE = "SchoolService",
  /** Accommodation Service */
  ACCOMMODATION_SERVICE = "AccommodationService",
  /** Intake Service */
  INTAKE_SERVICE = "IntakeService",
  /** program Service */
  PROGRAM_SERVICE = "ProgramService",
  /** Blog Post Service */
  BLOG_POST_SERVICE = "BlogPostService",
  /** Category Service */
  CATEGORY_SERVICE = "CategoryService",
  /** Tag Service */
  TAG_SERVICE = "TagService",
  /** Analytics Service */
  ANALYTICS_SERVICE = "AnalyticsService",

  // * CRON JOBS
  /** Cron jobs */
  CRON_JOBS = "SkynedCronJobs",
  /** Intake Cron job */
  INTAKE_CRON_JOB = "IntakeCronJob",
  /** Blog post Cron job */
  BLOG_POST_CRON_JOB = "BlogPostCronJob",

  // * Utilities
  /** Handles internal validations */
  VALIDATION_UTILITY = "ValidationUtility",
}
