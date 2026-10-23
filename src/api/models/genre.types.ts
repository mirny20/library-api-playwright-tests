export interface GenreResponseDTO {
  genreId: number;
  name: string;
  description: string;
}

export type GenreRequestDTO = Partial<Omit<GenreResponseDTO, 'genreId'>>;