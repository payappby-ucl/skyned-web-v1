/* eslint-disable max-len */
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
}
