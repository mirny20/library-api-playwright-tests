export interface AuthorName {
  first: string;
  last: string;
}

export interface AuthorBirth {
  date: string;    // "YYYY-MM-DD"
  country: string;
  city: string;
}

export interface AuthorResponseDTO {
  authorId: number;
  name: AuthorName;
  nationality: string;
  birth: AuthorBirth;
  description: string;
}

export type AuthorRequestDTO = Partial<Omit<AuthorResponseDTO, 'authorId'>>;