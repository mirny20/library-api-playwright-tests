import { BookAdditional, BookRequestDTO, BookSize } from "../api/models/book.types";
import { faker } from "@faker-js/faker";
import { Logger } from "./logger";

const logger = new Logger(); 

export function generateNewBook(): BookRequestDTO {
  const bookData = {
    bookName: faker.lorem.words({min: 4, max: 8}),
    bookDescription: faker.lorem.word(),
    bookLanguage: faker.location.language().name,
    additional: generateBookAdditionalInfo(),
    publicationYear: faker.number.int({ min: 1500, max: 2026 }),
  }

  logger.debug("New book generated:", bookData)
  
  return bookData;
}

function generateBookAdditionalInfo(): BookAdditional {
  return {
    pagesCount: faker.number.int({ min: 10, max: 1000 }),
    size: generateBookSize(),
  }
}

function generateBookSize(): BookSize {
  return {
    height: faker.number.int({ min: 10, max: 1000 }),
    width: faker.number.int({ min: 10, max: 1000 }),
    length: faker.number.int({ min: 10, max: 1000 }),
  }
}