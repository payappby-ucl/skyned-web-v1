import { Client } from "../infrastructure/repository/prisma";
import { department } from "@workspace/shared";

const departments = Object.values(department);

export class DepartmentSeed extends Client {
  constructor() {
    super();
  }
  async populateDepartments() {
    try {
      const res = await this.db.department.createMany({
        data: departments.map((d) => ({
          name: d,
        })),
        skipDuplicates: true,
      });

      console.log(res.count);
      console.log("Department loaded");
    } catch (error) {
      console.error(error);
    }
  }
}
