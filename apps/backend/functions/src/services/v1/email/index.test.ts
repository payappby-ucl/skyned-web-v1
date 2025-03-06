import { EmailService, emailService } from ".";
import { email } from "../../../infrastructure";

describe("EmailService", () => {
  describe("EmailService instance", () => {
    test("should be an instance of EmailService", () => {
      expect(emailService).toBeInstanceOf(EmailService);
    });
  });

  describe("Send Mail", () => {
    test("should send a mail", async () => {
      const emailData: Parameters<(typeof emailService)["send"]>["0"] = {
        template: {
          type: "verify",
          data: {
            tokenId: "23344",
          },
        },
        to: ["bobslegend795@gmail.com"],
        subject: "Test Email",
      };
      const spy = jest.spyOn(email, "send").mockImplementation();
      await emailService.send(emailData);
      expect(spy).toHaveBeenCalled();
    });
  });
});
