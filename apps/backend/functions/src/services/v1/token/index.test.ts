import { TokenService, tokenService } from ".";
import { repository } from "../../../infrastructure";
import { IToken } from "../../../interfaces";
import { Exception } from "../../../lib";
import { SkynedUtils } from "../../../utils";

describe("TokenService", () => {
  describe("Instance", () => {
    test("should be an instance of TokenService", () => {
      expect(tokenService).toBeInstanceOf(TokenService);
    });
  });

  describe("Methods", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    const payload = {
      email: "bobslegend795@gmail.com",
    };

    const tokenData: IToken = {
      id: 1,
      tokenId: "12345",
      token: "hhetejjdj122",
      type: "verify",
      expiresIn: new Date(Date.now() + 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    describe("sign", () => {
      test("should throw error if payload is empty", () => {
        expect(() => {
          tokenService.sign({});
        }).toThrow(Exception);
      });

      test("should throw error if payload is falsy", () => {
        expect(() => {
          tokenService.sign(null as any);
        }).toThrow(Exception);
      });

      test("should sign a token", () => {
        const token = tokenService.sign(payload);
        expect(token).toBeTruthy();
      });
    });

    describe("verify", () => {
      test("should return null if token is empty/falsy", () => {
        expect(tokenService.verify("")).toBeNull();
      });

      test("should return null if token is not a string", () => {
        expect(tokenService.verify({} as string)).toBeNull();
      });

      test("should verify and return payload", () => {
        const token = tokenService.sign(payload);
        const decoded = tokenService.verify(token);
        expect(decoded).toEqual(expect.objectContaining(payload));
      });
    });

    describe("createToken", () => {
      test("should create a token", async () => {
        const spy = jest
          .spyOn(repository.token, "create")
          .mockImplementation(async () => tokenData);

        const token = await tokenService.createToken(
          SkynedUtils.pick(tokenData, ["expiresIn", "type", "token"]),
        );

        expect(spy).toHaveBeenCalled();
        expect(token).toEqual(tokenData);
      });
    });

    describe("findTokenByTokenId", () => {
      test("should find the token", async () => {
        const spy = jest
          .spyOn(repository.token, "findTokenByTokenId")
          .mockImplementation(async () => tokenData);

        const token = await tokenService.findTokenByTokenId(tokenData.tokenId);
        expect(spy).toHaveBeenCalled();
        expect(token).toEqual(tokenData);
      });

      test("should return null if token is not found", async () => {
        const spy = jest
          .spyOn(repository.token, "findTokenByTokenId")
          .mockImplementation(async () => null);

        const token = await tokenService.findTokenByTokenId("22jjd");
        expect(spy).toHaveBeenCalled();
        expect(token).toBeNull();
      });
    });

    describe("delete", () => {
      test("should delete the token", async () => {
        const findSpy = jest
          .spyOn(repository.token, "findTokenByTokenId")
          .mockImplementation(async () => tokenData);

        const spy = jest
          .spyOn(repository.token, "delete")
          .mockImplementation(async () => tokenData);

        const deletedToken = await tokenService.delete(tokenData.tokenId);
        expect(findSpy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled();
        expect(deletedToken).toEqual(tokenData);

        const nullSpy = jest
          .spyOn(repository.token, "findTokenByTokenId")
          .mockImplementation(async () => null);

        const token = await tokenService.findTokenByTokenId(tokenData.tokenId);
        expect(nullSpy).toHaveBeenCalled();
        expect(token).toBeNull();
      });
    });
  });
});
