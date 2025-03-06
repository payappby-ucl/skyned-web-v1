import { EmailService, emailService } from ".";
import { email } from "../../../infrastructure";
import { Exception } from "../../../lib";

describe("EmailService", () => {
  describe("EmailService instance", () => {
    test("should be an instance of EmailService", () => {
      expect(emailService).toBeInstanceOf(EmailService);
    });
  });

  describe("Send Mail", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test("should throw an error if an invalid template is passed", async () => {
      const emailData: Parameters<(typeof emailService)["send"]>["0"] = {
        template: {
          type: "none" as any,
          data: {
            tokenId: "23344",
          },
        },
        to: ["bobslegend795@gmail.com"],
        subject: "Test Email",
      };
      expect(await emailService.send(emailData)).toThrow(Exception);
    });

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
