export interface AuthorName {
  first: string;
  last: string;
}

export interface AuthorBirth {
  date: string;    // "YYYY-MM-DD"
  country: string;
  city: string;
}

export interface Author {
  authorId: number;
  name: AuthorName;
  nationality: string;
  birth: AuthorBirth;
  description: string;
}

export type CreateAuthorDto = Omit<Author, 'authorId'>;
export type UpdateAuthorDto = Partial<Author>;