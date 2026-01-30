import { DepartmentRepository, repository } from "..";

describe("DepartmentRepository", () => {
  describe("Instance", () => {
    test("should be an instance of DepartmentRepository", () => {
      expect(repository.department).toBeInstanceOf(DepartmentRepository);
    });
  });

  describe("Methods", () => {
    describe("getDepartments", () => {
      test("should return a list of departments", async () => {
        const departments = await repository.department.getDepartments();

        expect(departments).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
            }),
          ]),
        );
      });
    });
  });
});
