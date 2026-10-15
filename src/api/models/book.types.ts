export interface BookSize {
  height: number;
  width: number;
  length: number;
}

export interface BookAdditional {
  pagesCount: number;
  size: BookSize;
}

export interface BookResponseDTO {
  bookId: number;
  bookName: string;
  bookDescription: string;
  bookLanguage: string;
  additional: BookAdditional;
  publicationYear: number;
}

export type BookRequestDTO = Partial<Omit<BookResponseDTO, 'bookId'>>;
