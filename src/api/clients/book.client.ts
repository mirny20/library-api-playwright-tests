import { BaseClient } from "./base.client";
import { BookRequestDTO, BookResponseDTO } from "../models/book.types";
import { APIResponse } from "@playwright/test";

export class BookCLient extends BaseClient {
  async getBookById(bookId: number) {
    return this.get(`/api/library/book/${bookId}`);
  }

  async createBook(bookData: BookRequestDTO, authorId: number, genreId: number) {
    return this.post('/api/library/book', bookData, { params: { authorId, genreId } });
  }

  async updateBook(bookId: number, bookData: BookRequestDTO) {
    return this.put(`/api/library/book/${bookId}`, bookData);
  }

  async deleteBook(bookId: number) {
    return this.delete(`/api/library/book/${bookId}`);
  }

  async getBookIdFromResponse(response: APIResponse): Promise<number> {
    const body: BookResponseDTO = await this.parseBody(response);
    const bookId = body.bookId;

    if (!bookId) {
      throw new Error(`Response body does not contain 'bookId'. Body: ${JSON.stringify(body)}`);
    }

    return bookId;
  }
}