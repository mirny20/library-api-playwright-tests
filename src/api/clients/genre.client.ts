import { GenreRequestDTO } from "../models/genre.types";
import { BaseClient } from "./base.client";

export class GenreClient extends BaseClient {
  async getGenreById(genreId: number) {
    return this.get(`/api/library/genre/${genreId}`);
  }

  async createGenre(genreData: GenreRequestDTO) {
    return this.post('/api/library/genre', genreData);
  }
}