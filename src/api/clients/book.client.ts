import { BaseClient } from "./base.client";
import { BookRequestDTO, BookResponseDTO } from "../models/book.types";
import { APIResponse, test } from "@playwright/test";

export class BookCLient extends BaseClient {
  async getBookById(bookId: number) {
    return test.step(`GET book ID=${bookId}`, async () => {
    return this.get(`/api/library/book/${bookId}`);
    })
  }

  async createBook(bookData: BookRequestDTO, authorId: number, genreId: number) {
    return test.step("POST create new book", async () => {
    return this.post('/api/library/book', bookData, { params: { authorId, genreId } });
    })
  }

  async updateBook(bookId: number, bookData: BookRequestDTO) {
    return test.step(`PUT update book ID=${bookId}`, async () => {
    return this.put(`/api/library/book/${bookId}`, bookData);
    })
  }

  async deleteBook(bookId: number) {
    return test.step(`DELETE book ID=${bookId}`, async () => {
    return this.delete(`/api/library/book/${bookId}`);
    })
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