import { test } from '../src/fixtures/api.fixture';
import { expect } from '@playwright/test';
import { BookCLient } from '../src/api/clients/book.client';
import { generateNewBook } from '../src/utils/book-genarator';
import { BookRequestDTO, BookResponseDTO } from '../src/api/models/book.types';

let bookClient: BookCLient;

test.beforeEach(async ({ request }) => {
  bookClient = new BookCLient(request);
})

test('Add new book and fetch it', async ({ author, genre }) => {
  const newBook: BookRequestDTO = generateNewBook();

  const createBookRes = await bookClient.createBook(
    newBook,
    author.authorId,
    genre.genreId
  );
  expect(createBookRes.status()).toBe(201);
  const createdBook: BookResponseDTO = await createBookRes.json();

  const getBookRes = await bookClient.getBookById(createdBook.bookId);
  expect(getBookRes.status()).toBe(200);
  expect(await getBookRes.json()).toMatchObject(newBook);
});

test('Update book', async ({ book }) => {
  const updateBookData = generateNewBook();

  const updatedBookRes = await bookClient.updateBook(book.bookId, updateBookData);
  expect(updatedBookRes.status()).toBe(200);

  const getUpdatedBookResBody = await (await bookClient.getBookById(book.bookId)).json();
  expect(getUpdatedBookResBody).toMatchObject(updateBookData);
});

test('Delete book', async ({ book }) => {
  const deleteBookRes = await bookClient.deleteBook(book.bookId);
  expect(deleteBookRes.status()).toBe(204);

  const getDeletedBookRes = await bookClient.getBookById(book.bookId);
  expect(getDeletedBookRes.status()).toBe(404);
});