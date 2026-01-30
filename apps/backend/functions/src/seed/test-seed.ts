/* eslint-disable max-len */
import { admin, schoolData } from "../data";
import { auth } from "../infrastructure";
import { Client } from "../infrastructure/repository/prisma";
import {
  adminService,
  phoneNumberService,
  schoolService,
  storageService,
} from "../services";
import { SkynedUtils } from "../utils";

export class TestSeed extends Client {
  constructor() {
    super();
  }
  async createContactUsItems() {
    try {
      console.log("Seeding contact us data...");
      const testData = {
        name: "Alabi Emmanuel",
        email: "bobslegend795@gmail.com",
        phoneNumber: phoneNumberService.formatPhoneNumber("+2348136239706"),
        subject: "Test Subject",
        message: "Test Message",
      };

      const contactUsItems = Array(20).fill(testData);
      contactUsItems.unshift({
        name: "Floyd Vega",
        email: "dirair@konohi.cm",
        phoneNumber: phoneNumberService.formatPhoneNumber("+12344556667"),
        subject: "Twenty",
        message:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam exercitationem vitae velit cupiditate voluptates sapiente. Eligendi, aliquam culpa! Voluptatum quam nobis sapiente dolorem, labore nesciunt asperiores rem iure aperiam cumque accusamus. Unde quae fuga quisquam atque, porro quas nulla? Iusto ipsa dignissimos aut suscipit quo nesciunt totam itaque impedit perspiciatis ut, molestias amet iure voluptate, eum expedita sed labore cumque placeat eius! Fugit aut cumque distinctio at dolore expedita eaque minima nemo esse odio. Molestiae commodi consectetur mollitia molestias alias quaerat eos libero quis minus! Deserunt nesciunt qui debitis soluta laudantium suscipit odit iure, ex veniam ea vero beatae cupiditate quidem in enim quos expedita dignissimos quae magnam facilis repellendus officia, omnis illum? Perspiciatis sunt quis, sed asperiores, dolorem a aperiam expedita soluta doloremque quam ipsam consequuntur dolorum voluptatem voluptate ex est. Sit voluptatum, a dolorum molestias ut ad ullam porro esse, natus debitis, voluptatibus pariatur tempora. Fugit, odit earum! Repellat adipisci sunt nostrum similique ex, voluptatum officia sint dicta recusandae atque consectetur quo ducimus quis eos aperiam, molestias maiores quaerat ullam beatae, tenetur earum. Veniam blanditiis magni, voluptates quisquam assumenda est odio laudantium amet in earum hic totam, ullam similique praesentium quia aliquid molestiae atque tempore, eius ab id.",
      });

      await this.db.inquiry.createMany({
        data: contactUsItems,
      });

      console.log("contact us data seed.");
    } catch (error) {
      console.error(error);
    }
  }

  async createSchool() {
    console.log("Seeding School...");
    const user = await auth.findUserByEmail(admin.email);
    if (user) {
      const adminuser = await adminService.findAdminByAdminId(user.id);
      if (adminuser) {
        const logo = await storageService.saveObject(
          schoolData.logo,
          SkynedUtils.resolveStoragePath({
            type: "logo",
            data: {
              schoolId: "local-school",
            },
          }),
        );

        const schoolImage = await storageService.saveObject(
          schoolData.schoolImage,
          SkynedUtils.resolveStoragePath({
            type: "schoolImage",
            data: {
              schoolId: "local-school",
            },
          }),
        );

        await schoolService.createSchool(adminuser, {
          ...schoolData,
          schoolId: "local-school",
          logo,
          schoolImage,
        });

        console.log("School seeded.");
      }
    }
  }
}
