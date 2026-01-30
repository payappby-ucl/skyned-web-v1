import { signInWithEmailAndPassword } from "firebase/auth";
import { ActivityLogRepository, repository } from "..";
import { clientAuth } from "../../../../__tests__/helpers/constants";
import { admin } from "../../../data";

describe("ActivityLogRepository", () => {
  describe("Instance", () => {
    expect(repository.activityLog).toBeInstanceOf(ActivityLogRepository);
  });

  describe("Methods", () => {
    describe("create", () => {
      test("should create an activity log", async () => {
        const { user } = await signInWithEmailAndPassword(
          clientAuth,
          admin.email,
          "12345678",
        );

        const signedInAdmin = await repository.admin.findAdminByAdminId(
          user.uid,
        );

        const log = await repository.activityLog.create({
          resource: "faqs",
          resourceId: 1,
          action: "create",
          adminId: signedInAdmin?.id || 1,
        });

        expect(log).not.toBeNull();
      });
    });
  });
});
