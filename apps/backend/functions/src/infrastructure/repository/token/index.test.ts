import { repository, TokenRepository } from "..";
import { createHash } from "node:crypto";
import { IToken } from "../../../interfaces";
import { StatusCodes } from "http-status-codes";

describe("TokenRepository", () => {
  describe("Instance", () => {
    test("should be an instance of TokenRepository", () => {
      expect(repository.token).toBeInstanceOf(TokenRepository);
    });
  });

  describe("Methods", () => {
    const hash = createHash("sha256");
    hash.update("Token hash");
    const tokenData: Pick<IToken, "token" | "type" | "expiresIn"> = {
      token: hash.digest("hex"),
      type: "verify",
      expiresIn: new Date(Date.now() + 60 * 60 * 1000),
    };

    let tokenId: string;

    describe("create", () => {
      test("should throw error if input is invalid", async () => {
        try {
          await repository.token.create({
            ...tokenData,
            type: "Hello" as any,
          });
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should create a token", async () => {
        const token = await repository.token.create(tokenData);
        tokenId = token.tokenId;
        expect(token.token).toBe(tokenData.token);
        expect(token.type).toBe(tokenData.type);
      });
    });

    describe("findTokenByTokenId", () => {
      test("should throw error if token id is falsy", async () => {
        try {
          await repository.token.findTokenByTokenId("");
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should throw error if token id is not a string", async () => {
        try {
          await repository.token.findTokenByTokenId({} as string);
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should find the token", async () => {
        const token = await repository.token.findTokenByTokenId(tokenId);
        expect(token?.token).toBe(tokenData.token);
        expect(token?.type).toBe(tokenData.type);
      });

      test("should return null if token is not found", async () => {
        const token = await repository.token.findTokenByTokenId("eertt");
        expect(token).toBeNull();
      });
    });

    describe("delete", () => {
      test("should throw error if token id is falsy", async () => {
        try {
          await repository.token.delete("");
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should throw error if token id is not a string", async () => {
        try {
          await repository.token.delete({} as string);
        } catch (error: any) {
          expect(error.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });

      test("should delete the token", async () => {
        const deletedToken = await repository.token.delete(tokenId);
        const token = await repository.token.findTokenByTokenId(tokenId);

        expect(deletedToken.token).toBe(tokenData.token);
        expect(deletedToken.type).toBe(tokenData.type);
        expect(token).toBeNull();
      });
    });
  });
});
