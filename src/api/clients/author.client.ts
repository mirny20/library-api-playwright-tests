import { BaseClient } from "./base.client";
import { AuthorRequestDTO } from "../models/author.types";

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
}