import { test } from '../src/fixtures/api.fixture';
import { AuthorClient } from '../src/api/clients/author.client';
import { generateNewAuthor } from '../src/utils/author-generator';

let authorCLient: AuthorClient;

test.beforeEach(async ({ request }) => {
  authorCLient = new AuthorClient(request);
})

test('Add new author and fetch it', async () => {
  const newAuthorData = generateNewAuthor();

  const createAuthorRes = await authorCLient.createAuthor(newAuthorData);
  
  await authorCLient.assertSuccess201ResponseCode(createAuthorRes);
  
  const createdAuthorId = await authorCLient.getAuthorIdFromResponse(createAuthorRes);
  const getAuthorRes = await authorCLient.getAuthorById(createdAuthorId);
  
  await authorCLient.assertSuccess200ResponseCode(getAuthorRes);
  await authorCLient.expectResponseMatchesObject(getAuthorRes, newAuthorData);
});