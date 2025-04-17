import { AdminSeed } from "./admin";
import { DepartmentSeed } from "./department";

const departmentSeed = new DepartmentSeed();
const adminSeed = new AdminSeed();
async function seed() {
  try {
    console.log("Seeding Departments");
    await departmentSeed.populateDepartments();
    console.log("Seeding SA");
    await adminSeed.createSAAdminAndConnectToDepartment();
  } catch (error) {
    console.error(error);
  }
}

seed();
