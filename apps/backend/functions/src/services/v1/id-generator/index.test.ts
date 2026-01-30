import { IdGeneratorService, idGeneratorService } from ".";

describe("idGeneratorService", () => {
  describe("Instance", () => {
    test("should be an instance of IgGeneratorService", () => {
      expect(idGeneratorService).toBeInstanceOf(IdGeneratorService);
    });
  });

  describe("Properties", () => {
    describe("uppercaseAlphabets", () => {
      expect(idGeneratorService.uppercaseAlphabets).toHaveLength(26);
      expect(idGeneratorService.uppercaseAlphabets).toEqual(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      );
    });

    describe("lowercaseAlphabets", () => {
      expect(idGeneratorService.lowercaseAlphabets).toHaveLength(26);
      expect(idGeneratorService.lowercaseAlphabets).toEqual(
        "abcdefghijklmnopqrstuvwxyz",
      );
    });

    describe("numbers", () => {
      expect(idGeneratorService.numbers).toHaveLength(10);
      expect(idGeneratorService.numbers).toEqual("0123456789");
    });
  });

  describe("Methods", () => {
    describe("Return value length", () => {
      test("should all return strings with length of 7", () => {
        const customSize = 7;
        const alphabets = idGeneratorService.alphabets(customSize);
        expect(alphabets).toHaveLength(customSize);

        const alphabet = idGeneratorService.alphabets(customSize);
        expect(alphabet).toHaveLength(customSize);

        const alphabetsLower = idGeneratorService.alphabetsLower(customSize);
        expect(alphabetsLower).toHaveLength(customSize);

        const alphabetsUpper = idGeneratorService.alphabetsUpper(customSize);
        expect(alphabetsUpper).toHaveLength(customSize);

        const alphanumeric = idGeneratorService.alphanumeric(customSize);
        expect(alphanumeric).toHaveLength(customSize);

        const numeric = idGeneratorService.numeric(customSize);
        expect(numeric).toHaveLength(customSize);

        const custom = idGeneratorService.custom("Abjrl3455", customSize);
        expect(custom).toHaveLength(customSize);

        const id = idGeneratorService.id(customSize);
        expect(id).toHaveLength(customSize);
      });
    });

    describe("alphabets", () => {
      const random = idGeneratorService.alphabets();

      test("should be truthy", () => {
        expect(random).toBeTruthy();
      });

      test("should be all alphabets", () => {
        expect(random).toMatch(/^([A-Za-z])+$/g);
      });
    });

    describe("alphabetsUpper", () => {
      const random = idGeneratorService.alphabetsUpper();

      test("should be truthy", () => {
        expect(random).toBeTruthy();
      });

      test("should be all uppercase alphabets", () => {
        expect(random).toMatch(/^([A-Z])+$/g);
      });
    });

    describe("alphabetsLower", () => {
      const random = idGeneratorService.alphabetsLower();

      test("should be truthy", () => {
        expect(random).toBeTruthy();
      });

      test("should be all lowercase alphabets", () => {
        expect(random).toMatch(/^([a-z])+$/g);
      });
    });

    describe("numeric", () => {
      const random = idGeneratorService.numeric();

      test("should be truthy", () => {
        expect(random).toBeTruthy();
      });

      test("should be all lowercase alphabets", () => {
        expect(random).toMatch(/^([0-9])+$/g);
      });
    });

    describe("alphanumeric", () => {
      const random = idGeneratorService.alphanumeric();

      test("should be truthy", () => {
        expect(random).toBeTruthy();
      });

      test("should be all alphanumeric", () => {
        expect(random).toMatch(/^([A-Za-z0-9])+$/g);
      });
    });

    describe("custom", () => {
      const random = idGeneratorService.custom("1Acu");

      test("should be truthy", () => {
        expect(random).toBeTruthy();
      });

      test("should be all alphanumeric", () => {
        expect(random).toMatch(/^[1Acu]+$/g);
      });
    });

    describe("id", () => {
      const random = idGeneratorService.id();

      test("should be truthy", () => {
        expect(random).toBeTruthy();
      });
    });
  });
});
