import { SkynedUtils } from "../utils";
import { AdminSeed } from "./admin";
import { DepartmentSeed } from "./department";
import { TestSeed } from "./test-seed";

const departmentSeed = new DepartmentSeed();
const adminSeed = new AdminSeed();
const testSeed = new TestSeed();
async function seed() {
  try {
    console.log("Seeding Departments");
    await departmentSeed.populateDepartments();
    console.log("Seeding SA");
    await adminSeed.createSAAdminAndConnectToDepartment();

    if (SkynedUtils.isEnvironment(["test"])) {
      console.log("Seeding Test Data...");
      await testSeed.createContactUsItems();
      await testSeed.createSchool();
    }
  } catch (error) {
    console.log(error);
    console.error(error);
  }
}

seed();
