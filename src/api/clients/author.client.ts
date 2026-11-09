import { BaseClient } from "./base.client";
import { AuthorRequestDTO, AuthorResponseDTO } from "../models/author.types";
import { APIResponse, test } from "@playwright/test";

export class AuthorClient extends BaseClient {
  async getAuthorById(authorId: number) {
    return test.step(`GET author ID=${authorId}`, async () => {
    return this.get(`/api/library/author/${authorId}`);
    });
  }

  async createAuthor(authorData: AuthorRequestDTO) {
    return test.step("POST create new author", async () => {
    return this.post('/api/library/author/', authorData);
    });
  }

  async updateAuthor(authorId: number, authorData: AuthorRequestDTO) {
    return test.step(`PUT update author ID=${authorId}`, async () => {
    return this.put(`/api/library/author/${authorId}`, authorData);
    });
  }

  async deleteAuthor(authorId: number, forcibly: boolean = false) {
    return test.step(`DELETE author ID=${authorId}`, async () => {
    return this.delete(`/api/library/author/${authorId}`, forcibly);
    });
  }

  async deleteAuthorWithBooksForcibly(authorId: number) {
    return test.step(`DELETE author ID=${authorId} and his books forcibly`, async () => {
    return await this.deleteAuthor(authorId, true);
    });
  }

  async getAuthorIdFromResponse(response: APIResponse): Promise<number> {
    const body: AuthorResponseDTO = await this.parseBody(response);
    const authorId = body.authorId;

    if (!authorId) {
      throw new Error(`Response body does not contain 'authorId'. Body: ${JSON.stringify(body)}`);
    }

    return authorId;
  }
}