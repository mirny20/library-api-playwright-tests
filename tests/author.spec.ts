import { test } from '../src/fixtures/api.fixture';
import { AuthorClient } from '../src/api/clients/author.client';
import { generateNewAuthor } from '../src/utils/author-generator';
import { BookCLient } from '../src/api/clients/book.client';

let authorCLient: AuthorClient;

test.beforeEach(async ({ request }) => {
  authorCLient = new AuthorClient(request);
})

test('Add new author and fetch it', async () => {
  const generatedAuthorData = generateNewAuthor();

  const createAuthorRes = await authorCLient.createAuthor(generatedAuthorData);

  await authorCLient.assertSuccess201ResponseCode(createAuthorRes);

  const createdAuthorId = await authorCLient.getAuthorIdFromResponse(createAuthorRes);
  const getAuthorRes = await authorCLient.getAuthorById(createdAuthorId);
  const createdAuthorData = await authorCLient.parseBody(getAuthorRes);

  await authorCLient.assertSuccess200ResponseCode(getAuthorRes);
  await authorCLient.assertAuthorDataMatch(createdAuthorData, generatedAuthorData);
});

test('Update author', async ({ author }) => {
  const updatedAuthorData = generateNewAuthor();

  const updateAuthorRes = await authorCLient.updateAuthor(author.authorId, updatedAuthorData);
  await authorCLient.assertSuccess200ResponseCode(updateAuthorRes);

  const getUpdatedAuthorRes = await authorCLient.getAuthorById(author.authorId);
  const actualAuthorData = await authorCLient.parseBody(getUpdatedAuthorRes);
  
  await authorCLient.assertAuthorDataMatch(actualAuthorData, updatedAuthorData);
});

test('Delete author and his book forcibly', async ({ bookContext, request }) => {
  const bookClient = new BookCLient(request);

  const deleteAuthorRes = await authorCLient.deleteAuthorWithBooksForcibly(bookContext.author.authorId);
  await authorCLient.assertSuccess204ResponseCode(deleteAuthorRes);

  const getDeletedAuthorRes = await authorCLient.getAuthorById(bookContext.author.authorId);
  await authorCLient.assertError404ResponseCode(getDeletedAuthorRes);

  const getDeletedBookRes = await bookClient.getBookById(bookContext.book.bookId);
  await bookClient.assertError404ResponseCode(getDeletedBookRes);
});