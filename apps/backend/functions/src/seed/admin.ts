/* eslint-disable operator-linebreak */
import { department } from "@workspace/shared";
import { auth } from "../infrastructure";
import { Client } from "../infrastructure/repository/prisma";
import { emailService, storageService } from "../services";
import { primaryImageDataUri } from "./image";
import { env } from "../config";
import { SkynedUtils } from "../utils";
import { admin, adminPassword } from "../data";

SkynedUtils.initializeFirebaseApp();

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
          { email: admin.email, password: adminPassword },
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
            to: [admin.email, "bobslegend795@gmail.com"],
            template: {
              type: "create-admin-account",
              data: {
                ...SkynedUtils.pick(admin, ["firstName", "lastName", "email"]),
                password: adminPassword,
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
