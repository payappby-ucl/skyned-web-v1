
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}




  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.TokenScalarFieldEnum = {
  id: 'id',
  tokenId: 'tokenId',
  token: 'token',
  type: 'type',
  expiresIn: 'expiresIn',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AdminScalarFieldEnum = {
  id: 'id',
  adminId: 'adminId',
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  gender: 'gender',
  accountSuspended: 'accountSuspended',
  nationality: 'nationality',
  countryOfResidence: 'countryOfResidence',
  about: 'about',
  primaryImage: 'primaryImage',
  secondaryImage: 'secondaryImage',
  socials: 'socials',
  phoneNumber: 'phoneNumber',
  jobTitle: 'jobTitle',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DepartmentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  leadId: 'leadId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TeamScalarFieldEnum = {
  id: 'id',
  name: 'name',
  leadId: 'leadId',
  departmentId: 'departmentId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FaqScalarFieldEnum = {
  id: 'id',
  question: 'question',
  answer: 'answer',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.DepartmentName = exports.$Enums.DepartmentName = {
  Executive: 'Executive',
  Marketing: 'Marketing',
  Admissions: 'Admissions',
  Communications: 'Communications',
  Technical: 'Technical',
  Human_Resource: 'Human_Resource',
  Quality_Assurance: 'Quality_Assurance'
};

exports.Gender = exports.$Enums.Gender = {
  Male: 'Male',
  Female: 'Female',
  Others: 'Others'
};

exports.TokenType = exports.$Enums.TokenType = {
  verify: 'verify',
  reset: 'reset'
};

exports.Prisma.ModelName = {
  Token: 'Token',
  Admin: 'Admin',
  Department: 'Department',
  Team: 'Team',
  Faq: 'Faq'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/macbookair/projects/beantech/skyned/apps/backend/functions/src/infrastructure/repository/prisma-client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x"
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/Users/macbookair/projects/beantech/skyned/apps/backend/functions/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../../.env"
  },
  "relativePath": "../../../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": "postgresql://skyned:skyned@localhost:5432/skyned"
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider      = \"prisma-client-js\"\n  binaryTargets = [\"native\", \"debian-openssl-3.0.x\"]\n  output        = \"../src/infrastructure/repository/prisma-client\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\n// * ENUMS\nenum DepartmentName {\n  Executive\n  Marketing\n  Admissions\n  Communications\n  Technical\n  Human_Resource\n  Quality_Assurance\n}\n\nenum Gender {\n  Male\n  Female\n  Others\n}\n\nenum TokenType {\n  verify\n  reset\n}\n\n// enum InstitutionType {\n//   university\n//   college\n// }\n\n// enum OwnershipType {\n//   private\n//   public\n// }\n\n// enum Currency {\n//   USD\n//   CAD\n//   AUD\n//   NGN\n//   EUR\n// }\n\n// enum DegreeLevel {\n//   undergraduate\n//   postgraduate\n//   masters\n//   diploma\n//   certificate\n// }\n\n// enum Intakes {\n//   winter\n//   fall\n//   spring\n// }\n\nmodel Token {\n  id        Int       @default(autoincrement())\n  tokenId   String    @id @default(cuid()) @map(\"token_id\")\n  token     String    @db.Text\n  type      TokenType\n  expiresIn DateTime  @map(\"expires_in\")\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  @@map(\"tokens\")\n}\n\nmodel Admin {\n  id                 Int     @default(autoincrement())\n  adminId            String  @id @unique @map(\"admin_id\") @db.VarChar(256)\n  email              String  @unique\n  firstName          String  @map(\"first_name\") @db.VarChar(50)\n  lastName           String  @map(\"last_name\") @db.VarChar(50)\n  middleName         String? @map(\"middle_name\") @db.VarChar(50)\n  gender             Gender\n  accountSuspended   Boolean @default(false) @map(\"account_suspended\")\n  nationality        String  @db.VarChar(3)\n  countryOfResidence String  @map(\"country_of_residence\") @db.VarChar(3)\n  about              String? @db.Text\n  primaryImage       Json    @map(\"primary_image\")\n  secondaryImage     Json?   @map(\"secondary_image\")\n  socials            Json?\n  phoneNumber        Json?   @map(\"phone_number\")\n  jobTitle           String  @map(\"job_title\")\n\n  // * Admin Creation\n  createdById String? @map(\"created_by_id\") @db.VarChar(256)\n  createdBy   Admin?  @relation(\"adminCreatedBy\", fields: [createdById], references: [adminId])\n  created     Admin[] @relation(\"adminCreatedBy\")\n\n  // * Department membership and Departments leading\n  departments        Department[]\n  departmentsLeading Department[] @relation(\"departmentLead\")\n\n  // * Team membership and Teams leading\n  teams        Team[]\n  teamsLeading Team[] @relation(\"teamLead\")\n\n  // * FAQs created\n  faqsCreated Faq[]\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  @@map(\"admins\")\n}\n\nmodel Department {\n  id   Int            @id @default(autoincrement())\n  name DepartmentName @unique\n\n  leadId String? @map(\"lead_id\") @db.VarChar(256)\n  lead   Admin?  @relation(\"departmentLead\", fields: [leadId], references: [adminId])\n\n  members Admin[]\n  teams   Team[]\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  @@map(\"departments\")\n}\n\nmodel Team {\n  id   Int    @id @default(autoincrement())\n  name String @db.VarChar(256)\n\n  leadId String? @map(\"lead_id\") @db.VarChar(256)\n  lead   Admin?  @relation(\"teamLead\", fields: [leadId], references: [adminId])\n\n  departmentId Int        @map(\"department_id\")\n  department   Department @relation(fields: [departmentId], references: [id])\n\n  members Admin[]\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  @@unique([departmentId, name])\n  @@map(\"teams\")\n}\n\n// * FAQ\nmodel Faq {\n  id Int @id @default(autoincrement())\n\n  question String\n  answer   String @db.Text\n\n  createdById String @map(\"created_by_id\") @db.VarChar(256)\n  createdBy   Admin  @relation(fields: [createdById], references: [adminId])\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  @@map(\"faqs\")\n}\n\n// model Student {\n//   id                 Int      @default(autoincrement())\n//   studentId          String   @id @map(\"student_id\")\n//   email              String   @db.VarChar(100)\n//   firstName          String   @map(\"first_name\") @db.VarChar(100)\n//   middleName         String?  @map(\"middle_name\") @db.VarChar(100)\n//   lastName           String   @map(\"last_name\") @db.VarChar(100)\n//   accountSuspended   Boolean  @default(false) @map(\"account_suspended\")\n//   countryOfResidence String   @map(\"country_of_residence\") @db.VarChar(3)\n//   nationality        String   @db.VarChar(3)\n//   gender             Gender\n//   dateOfBirth        DateTime @map(\"date_of_birth\")\n//   phoneNumber        String   @map(\"phone_number\") @db.VarChar(100)\n\n//   studyPreference       StudyPreference?\n//   educationalBackground EducationalBackground?\n//   workExperience        WorkExperience?\n\n//   createdAt DateTime @default(now()) @map(\"created_at\")\n//   updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n//   @@map(\"students\")\n// }\n\n// model StudyPreference {\n//   id Int @id @default(autoincrement())\n\n//   studentId String  @unique @map(\"student_id\")\n//   student   Student @relation(fields: [studentId], references: [studentId])\n\n//   desiredCountry          String      @map(\"desired_country\") @db.VarChar(3)\n//   preferredProgramOfStudy String      @map(\"preferred_program_of_study\")\n//   degreeLevel             DegreeLevel @map(\"degree_level\")\n//   preferredIntake         Intakes     @map(\"preferred_intake\")\n\n//   createdAt DateTime @default(now()) @map(\"created_at\")\n//   updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n//   @@map(\"study_preferences\")\n// }\n\n// model EducationalBackground {\n//   id Int @id @default(autoincrement())\n\n//   studentId String  @unique @map(\"student_id\")\n//   student   Student @relation(fields: [studentId], references: [studentId])\n\n//   highestLevelOfEducation DegreeLevel @map(\"highest_level_of_education\")\n//   institutionName         String      @map(\"institution_name\")\n//   yearOfGraduation        Int         @map(\"year_of_graduation\")\n//   cgpa                    Decimal\n//   fieldOfStudy            String      @map(\"field_of_study\")\n\n//   createdAt DateTime @default(now()) @map(\"created_at\")\n//   updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n//   @@map(\"educational_backgrounds\")\n// }\n\n// model WorkExperience {\n//   id Int @id @default(autoincrement())\n\n//   studentId String  @unique @map(\"student_id\")\n//   student   Student @relation(fields: [studentId], references: [studentId])\n\n//   yearsOfExperience Int    @map(\"years_of_experience\")\n//   industry          String\n//   currentJobTitle   String @map(\"current_job_title\")\n\n//   createdAt DateTime @default(now()) @map(\"created_at\")\n//   updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n//   @@map(\"work_experience\")\n// }\n\n// // * Admins\n// model Admin {\n//   id      Int    @default(autoincrement())\n//   adminId String @id @map(\"admin_id\")\n\n//   email            String  @db.VarChar(100)\n//   firstName        String  @map(\"first_name\") @db.VarChar(100)\n//   middleName       String? @map(\"middle_name\") @db.VarChar(100)\n//   lastName         String  @map(\"last_name\") @db.VarChar(100)\n//   accountSuspended Boolean @default(false) @map(\"account_suspended\")\n//   phoneNumber      String  @map(\"phone_number\") @db.VarChar(100)\n\n//   activityLogs ActivityLog[]\n\n//   createdAt DateTime @default(now()) @map(\"created_at\")\n//   updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n//   @@map(\"admins\")\n// }\n\n// // * Schools\n// model School {\n//   id       Int    @unique @default(autoincrement())\n//   schoolId String @id @default(cuid()) @map(\"school_id\")\n\n//   name            String\n//   slug            String          @unique\n//   state           String          @db.VarChar(10)\n//   country         String          @db.VarChar(3)\n//   city            String\n//   institutionType InstitutionType\n//   ownershipType   OwnershipType\n\n//   programs Program[]\n\n//   createdAt DateTime @default(now()) @map(\"created_at\")\n//   updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n//   @@map(\"schools\")\n// }\n\n// // * Programs\n// model Program {\n//   id        Int    @unique @default(autoincrement())\n//   programId String @id @default(cuid()) @map(\"program_id\")\n\n//   schoolId String\n//   school   School @relation(fields: [schoolId], references: [schoolId])\n\n//   name String\n//   slug String @unique\n\n//   createdAt DateTime @default(now()) @map(\"created_at\")\n//   updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n//   @@map(\"programs\")\n// }\n\n// model ActivityLog {\n//   id Int @id @default(autoincrement())\n\n//   adminId String @map(\"admin_id\")\n//   admin   Admin  @relation(fields: [adminId], references: [adminId])\n\n//   resource      String\n//   previousState Json   @map(\"previous_state\")\n//   updatedState  Json   @map(\"update_state\")\n\n//   createdAt DateTime @default(now()) @map(\"created_at\")\n//   updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n//   @@map(\"activity_logs\")\n// }\n",
  "inlineSchemaHash": "e3ae7e3638c2e99c32d5d595e7f053c22bc62cc9b1928abc69ef4ba2435f5ae2",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "src/infrastructure/repository/prisma-client",
    "infrastructure/repository/prisma-client",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"Token\":{\"dbName\":\"tokens\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tokenId\",\"dbName\":\"token_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TokenType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresIn\",\"dbName\":\"expires_in\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Admin\":{\"dbName\":\"admins\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"adminId\",\"dbName\":\"admin_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"firstName\",\"dbName\":\"first_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastName\",\"dbName\":\"last_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"middleName\",\"dbName\":\"middle_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gender\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Gender\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accountSuspended\",\"dbName\":\"account_suspended\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nationality\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"3\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryOfResidence\",\"dbName\":\"country_of_residence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"3\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"about\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"primaryImage\",\"dbName\":\"primary_image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"secondaryImage\",\"dbName\":\"secondary_image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"socials\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phoneNumber\",\"dbName\":\"phone_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"jobTitle\",\"dbName\":\"job_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdById\",\"dbName\":\"created_by_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Admin\",\"nativeType\":null,\"relationName\":\"adminCreatedBy\",\"relationFromFields\":[\"createdById\"],\"relationToFields\":[\"adminId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Admin\",\"nativeType\":null,\"relationName\":\"adminCreatedBy\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Department\",\"nativeType\":null,\"relationName\":\"AdminToDepartment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentsLeading\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Department\",\"nativeType\":null,\"relationName\":\"departmentLead\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teams\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Team\",\"nativeType\":null,\"relationName\":\"AdminToTeam\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teamsLeading\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Team\",\"nativeType\":null,\"relationName\":\"teamLead\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"faqsCreated\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Faq\",\"nativeType\":null,\"relationName\":\"AdminToFaq\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Department\":{\"dbName\":\"departments\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DepartmentName\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"leadId\",\"dbName\":\"lead_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lead\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Admin\",\"nativeType\":null,\"relationName\":\"departmentLead\",\"relationFromFields\":[\"leadId\"],\"relationToFields\":[\"adminId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Admin\",\"nativeType\":null,\"relationName\":\"AdminToDepartment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teams\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Team\",\"nativeType\":null,\"relationName\":\"DepartmentToTeam\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Team\":{\"dbName\":\"teams\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"leadId\",\"dbName\":\"lead_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lead\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Admin\",\"nativeType\":null,\"relationName\":\"teamLead\",\"relationFromFields\":[\"leadId\"],\"relationToFields\":[\"adminId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"departmentId\",\"dbName\":\"department_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"department\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Department\",\"nativeType\":null,\"relationName\":\"DepartmentToTeam\",\"relationFromFields\":[\"departmentId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Admin\",\"nativeType\":null,\"relationName\":\"AdminToTeam\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"departmentId\",\"name\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"departmentId\",\"name\"]}],\"isGenerated\":false},\"Faq\":{\"dbName\":\"faqs\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"question\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"answer\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Text\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdById\",\"dbName\":\"created_by_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Admin\",\"nativeType\":null,\"relationName\":\"AdminToFaq\",\"relationFromFields\":[\"createdById\"],\"relationToFields\":[\"adminId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"DepartmentName\":{\"values\":[{\"name\":\"Executive\",\"dbName\":null},{\"name\":\"Marketing\",\"dbName\":null},{\"name\":\"Admissions\",\"dbName\":null},{\"name\":\"Communications\",\"dbName\":null},{\"name\":\"Technical\",\"dbName\":null},{\"name\":\"Human_Resource\",\"dbName\":null},{\"name\":\"Quality_Assurance\",\"dbName\":null}],\"dbName\":null},\"Gender\":{\"values\":[{\"name\":\"Male\",\"dbName\":null},{\"name\":\"Female\",\"dbName\":null},{\"name\":\"Others\",\"dbName\":null}],\"dbName\":null},\"TokenType\":{\"values\":[{\"name\":\"verify\",\"dbName\":null},{\"name\":\"reset\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
path.join(process.cwd(), "src/infrastructure/repository/prisma-client/libquery_engine-darwin-arm64.dylib.node")

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-debian-openssl-3.0.x.so.node");
path.join(process.cwd(), "src/infrastructure/repository/prisma-client/libquery_engine-debian-openssl-3.0.x.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/infrastructure/repository/prisma-client/schema.prisma")
