import { Client } from "../infrastructure/repository/prisma";
import { phoneNumberService } from "../services";

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

      await this.db.inquiry.createMany({
        data: contactUsItems,
      });

      console.log("contact us data seed.");
    } catch (error) {
      console.error(error);
    }
  }
}
