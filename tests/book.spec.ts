import { test, expect } from '@playwright/test';
import { BookCLient } from '../src/api/clients/book.client';
import { generateNewBook } from '../src/utils/book-genarator';
import { BookRequestDTO, BookResponseDTO } from '../src/api/models/book.types';

let bookClient: BookCLient;

test.beforeEach(async ({ request }) => {
  bookClient = new BookCLient(request);
})

test('Add new book and fetch it', async () => {
  const newBook: BookRequestDTO = generateNewBook();

  const createRes = await bookClient.createBook(newBook, 4, 4);
  expect(createRes.status()).toBe(201);
  const createdBook: BookResponseDTO = await createRes.json();

  const getBookRes = await bookClient.getBookById(createdBook.bookId);
  expect(getBookRes.status()).toBe(200);
  expect(await getBookRes.json()).toMatchObject(newBook);
});