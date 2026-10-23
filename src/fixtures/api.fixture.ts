import { test as base, expect } from "@playwright/test";
import { AuthorResponseDTO } from "../api/models/author.types";
import { GenreResponseDTO } from "../api/models/genre.types";
import { AuthorClient } from "../api/clients/author.client";
import { generateNewAuthor } from "../utils/author-generator";
import { GenreClient } from "../api/clients/genre.client";
import { generateNewGenre } from "../utils/genre-generator";
import { BookResponseDTO } from "../api/models/book.types";
import { BookCLient } from "../api/clients/book.client";
import { generateNewBook } from "../utils/book-genarator";

type ApiFixtures = {
  author: AuthorResponseDTO;
  genre: GenreResponseDTO;
  book: BookResponseDTO;
}

export const test = base.extend<ApiFixtures>({
  author: async ({ request }, use) => {
    const authorClient = new AuthorClient(request);
    const authorData = generateNewAuthor();

    const createAuthorRes = await authorClient.createAuthor(authorData);

    if (createAuthorRes.status() !== 201) {
      const errorBody = await createAuthorRes.json();

      throw new Error(
        `Failed to create author in fixture!\n` +
        `Status: ${createAuthorRes.status()}\n` +
        `ErrorMessage: ${errorBody.errorMessage}\n` +
        `Sent Data: ${JSON.stringify(authorData, null, 2)}`
      );
    }

    use(await createAuthorRes.json());
  },

  genre: async ({ request }, use) => {
    const genreClient = new GenreClient(request);
    const genreData = generateNewGenre();

    const createGenreRes = await genreClient.createGenre(genreData);

    if (createGenreRes.status() !== 201) {
      const errorBody = await createGenreRes.json();

      throw new Error(
        `Failed to create genre in fixture!\n` +
        `Status: ${createGenreRes.status()}\n` +
        `ErrorMessage: ${errorBody.errorMessage}\n` +
        `Sent Data: ${JSON.stringify(genreData, null, 2)}`
      );
    }

    use(await createGenreRes.json());
  },

  book: async ({ request, genre, author }, use) => {
    const bookClient = new BookCLient(request);
    const bookData = generateNewBook();

    const createBookRes = await bookClient.createBook(
      bookData, author.authorId, genre.genreId
    );

    if (createBookRes.status() !== 201) {
      const errorBody = await createBookRes.json();

      throw new Error(
        `Failed to create book in fixture!\n` +
        `Status: ${createBookRes.status()}\n` +
        `ErrorMessage: ${errorBody.errorMessage}\n` +
        `Sent Data: ${JSON.stringify(bookData, null, 2)}`
      );
    }

    use(await createBookRes.json());
  }
})