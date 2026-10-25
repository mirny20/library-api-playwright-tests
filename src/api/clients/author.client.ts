import { BaseClient } from "./base.client";
import { AuthorRequestDTO, AuthorResponseDTO } from "../models/author.types";
import { APIResponse } from "@playwright/test";

export class AuthorClient extends BaseClient {
  async getAuthorById(authorId: number) {
    return this.get(`/api/library/author/${authorId}`);
  }

  async createAuthor(authorData: AuthorRequestDTO) {
    return this.post('/api/library/author/', authorData);
  }

  async updateAuthor(authorId: number, authorData: AuthorRequestDTO) {
    return this.put(`/api/library/author/${authorId}`, authorData);
  }

  async deleteAuthor(authorId: number) {
    return this.delete(`/api/library/author/${authorId}`);
  }

  async getAuthorIdFromResponse(response: APIResponse): Promise<number> {
    const body: AuthorResponseDTO = await this.parseBody(response);
    const authorId =  body.authorId;

    if (!authorId) {
      throw new Error(`Response body does not contain 'authorId'. Body: ${JSON.stringify(body)}`);
    }

    return authorId;
  }
}