import { test, expect } from '@playwright/test';
import { AuthorClient } from '../src/api/clients/author.client';
import { generateNewAuthor } from '../src/utils/author-generator';
import { AuthorResponseDTO } from '../src/api/models/author.types';

let authorCLient: AuthorClient;

test.beforeEach(async ({ request }) => {
  authorCLient = new AuthorClient(request);
})

test('Add new author', async () => {
  const newAuthorData = generateNewAuthor();

  const createAuthorRes = await authorCLient.createAuthor(newAuthorData);
  expect(createAuthorRes.status()).toBe(201);
  const createdAuthor: AuthorResponseDTO = await createAuthorRes.json();

  const getAuthorRes = await authorCLient.getAuthorById(createdAuthor.authorId);
  expect(getAuthorRes.status()).toBe(200);
  expect(await getAuthorRes.json()).toMatchObject(newAuthorData);
});