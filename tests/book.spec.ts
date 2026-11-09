import { test } from '../src/fixtures/api.fixture';
import { BookCLient } from '../src/api/clients/book.client';
import { generateNewBook } from '../src/utils/book-genarator';

let bookClient: BookCLient;

test.beforeEach(async ({ request }) => {
  bookClient = new BookCLient(request);
})

test('Add new book and fetch it', async ({ author, genre }) => {
  const generatedBookData = generateNewBook();

  const createBookRes = await bookClient.createBook(
    generatedBookData,
    author.authorId,
    genre.genreId
  );
  await bookClient.assertSuccess201ResponseCode(createBookRes);

  const createdBookId = await bookClient.getBookIdFromResponse(createBookRes);
  const getBookRes = await bookClient.getBookById(createdBookId);
  const createdBookData = await bookClient.parseBody(getBookRes);

  await bookClient.assertSuccess200ResponseCode(getBookRes);
  await bookClient.assertBookDataMatch(createdBookData, generatedBookData);
});

test('Update book', async ({ bookContext }) => {
  const updateBookData = generateNewBook();

  const updateBookRes = await bookClient.updateBook(bookContext.book.bookId, updateBookData);
  await bookClient.assertSuccess200ResponseCode(updateBookRes);

  const getUpdatedBookRes = await bookClient.getBookById(bookContext.book.bookId);
  const actualBookData = await bookClient.parseBody(getUpdatedBookRes);
  await bookClient.assertBookDataMatch(actualBookData, updateBookData);
});

test('Delete book', async ({ bookContext }) => {
  const deleteBookRes = await bookClient.deleteBook(bookContext.book.bookId);
  await bookClient.assertSuccess204ResponseCode(deleteBookRes);

  const getDeletedBookRes = await bookClient.getBookById(bookContext.book.bookId);
  await bookClient.assertError404ResponseCode(getDeletedBookRes);
});