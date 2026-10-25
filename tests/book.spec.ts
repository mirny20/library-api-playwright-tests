import { test } from '../src/fixtures/api.fixture';
import { BookCLient } from '../src/api/clients/book.client';
import { generateNewBook } from '../src/utils/book-genarator';
import { BookRequestDTO } from '../src/api/models/book.types';

let bookClient: BookCLient;

test.beforeEach(async ({ request }) => {
  bookClient = new BookCLient(request);
})

test('Add new book and fetch it', async ({ author, genre }) => {
  const newBook = generateNewBook();

  const createBookRes = await bookClient.createBook(
    newBook,
    author.authorId,
    genre.genreId
  );
  bookClient.assertSuccess201ResponseCode(createBookRes);

  const createdBookId = await bookClient.getBookIdFromResponse(createBookRes);
  const getBookRes = await bookClient.getBookById(createdBookId);

  bookClient.assertSuccess200ResponseCode(getBookRes);
  await bookClient.expectResponseMatchesObject(getBookRes, newBook);
});

test('Update book', async ({ book }) => {
  const updateBookData = generateNewBook();

  const updateBookRes = await bookClient.updateBook(book.bookId, updateBookData);
  bookClient.assertSuccess200ResponseCode(updateBookRes);

  const getUpdatedBookRes = await bookClient.getBookById(book.bookId);
  await bookClient.expectResponseMatchesObject(getUpdatedBookRes, updateBookData);
});

test('Delete book', async ({ book }) => {
  const deleteBookRes = await bookClient.deleteBook(book.bookId);
  bookClient.assertSuccess204ResponseCode(deleteBookRes);

  const getDeletedBookRes = await bookClient.getBookById(book.bookId);
  bookClient.assertError404ResponseCode(getDeletedBookRes);
});