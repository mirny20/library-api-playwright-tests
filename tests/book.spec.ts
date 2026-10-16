import { test, expect } from '@playwright/test';
import { BookCLient } from '../src/api/clients/book.client';
import { generateNewBook } from '../src/utils/book-genarator';
import { BookRequestDTO, BookResponseDTO } from '../src/api/models/book.types';

let bookClient: BookCLient;

test.beforeEach(async ({ request }) => {
  bookClient = new BookCLient(request);
})

//TODO: add new author and genre
test('Add new book and fetch it', async () => {
  const newBook: BookRequestDTO = generateNewBook();

  const createBookRes = await bookClient.createBook(newBook, 4, 4);
  expect(createBookRes.status()).toBe(201);
  const createdBook: BookResponseDTO = await createBookRes.json();

  const getBookRes = await bookClient.getBookById(createdBook.bookId);
  expect(getBookRes.status()).toBe(200);
  expect(await getBookRes.json()).toMatchObject(newBook);
});

test('Update book', async () => {
  const newBookData = generateNewBook();
  const updateBookData = generateNewBook();

  const createBookRes = await bookClient.createBook(newBookData, 4, 4);
  expect(createBookRes.status()).toBe(201);
  const createdBook: BookResponseDTO = await createBookRes.json();

  const updatedBookRes = await bookClient.updateBook(createdBook.bookId, updateBookData);
  expect(updatedBookRes.status()).toBe(200);

  const getUpdatedBookResBody = await (await bookClient.getBookById(createdBook.bookId)).json();
  expect(getUpdatedBookResBody).toMatchObject(updateBookData);
});

test('Delete book', async () => {
  const newBookData = generateNewBook();

  const createBookRes = await bookClient.createBook(newBookData, 4, 4);
  expect(createBookRes.status()).toBe(201);

  const createdBook: BookResponseDTO = await createBookRes.json();

  const deleteBookRes = await bookClient.deleteBook(createdBook.bookId);
  expect(deleteBookRes.status()).toBe(204);
  
  const getDeletedBookRes = await bookClient.getBookById(createdBook.bookId);
  expect(getDeletedBookRes.status()).toBe(404);
});