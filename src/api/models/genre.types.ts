export interface Genre {
  genreId: number;
  name: string;
  description: string;
}

export type CreateGenreDto = Omit<Genre, 'genreId'>;
export type UpdateGenreDto = Partial<Genre>;