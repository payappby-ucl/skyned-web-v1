import { department, gender } from "@workspace/shared";
import { auth } from "../infrastructure";
import { Client } from "../infrastructure/repository/prisma";
import { emailService, idGeneratorService, storageService } from "../services";
import { primaryImageDataUri } from "./image";
import { env } from "../config";
import { SkynedUtils } from "../utils";

SkynedUtils.initializeFirebaseApp();

const password = idGeneratorService.id(10);
const admin = {
  email: "admin@skynedconsults.com",
  firstName: "Chinedu",
  lastName: "Okoronkwo",
  gender: gender.Male,
  nationality: "NG",
  countryOfResidence: "CA",
  jobTitle: "CEO/CO-founder",
};

export class AdminSeed extends Client {
  constructor() {
    super();
  }
  async createSAAdminAndConnectToDepartment() {
    try {
      console.log("Checking if admin exist...");
      const adminExist = await auth.exists(admin.email);

      if (!adminExist) {
        console.log("Admin does not exist...");
        console.log("Creating Admin Auth on firebase...");
        const adminId = await auth.createAuth(
          { email: admin.email, password },
          "admin",
        );
        console.log("Admin Auth created");

        console.log("Uploading primary image...");
        const primaryImage = await storageService.saveObject(
          primaryImageDataUri,
          `users/${adminId}/profile/primaryImage`,
        );
        console.log("Image uploaded");
        console.log(primaryImage);

        const dps = await this.db.department.findUnique({
          where: {
            name: department.Executive,
          },
        });

        console.log(dps);

        console.log("Saving admin info on database...");
        const createdAdmin = await this.db.admin.create({
          data: {
            ...admin,
            primaryImage: primaryImage,
            adminId,

            departments: {
              connect: {
                name: department.Executive,
              },
            },
          },
        });
        console.log("Admin Info Saved");

        console.log(`Updating ${department.Executive} Department lead`);
        await this.db.department.update({
          where: {
            name: department.Executive,
          },
          data: {
            leadId: createdAdmin.adminId,
          },
        });
        console.log(`${department.Executive} lead updated.`);

        const adm = await this.db.admin.findUnique({
          where: {
            adminId: createdAdmin.adminId,
          },
          include: {
            departments: {
              select: {
                _count: true,
              },
            },
            departmentsLeading: {
              select: {
                _count: true,
              },
            },
          },
        });

        console.log(adm?.departments);
        console.log(adm?.departmentsLeading);

        if (
          [
            "https://www.syknedconsults.com",
            "https://skyned-frontend--skyned-test-31a2e.us-central1.hosted.app",
          ].includes(env.domains.frontendDomain)
        ) {
          console.log("Sending account creation mail...");
          await emailService.send({
            from: {
              email: env.emails.info,
              name: "Admin",
            },
            subject: "Account Creation",
            to: [admin.email],
            template: {
              type: "create-admin-account",
              data: {
                ...SkynedUtils.pick(admin, ["firstName", "lastName", "email"]),
                password,
                image: primaryImage,
              },
            },
          });
          console.log("Mail sent.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
