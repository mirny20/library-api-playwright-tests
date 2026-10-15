import { BaseClient } from "./base.client";
import { BookRequestDTO } from "../models/book.types";

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
}