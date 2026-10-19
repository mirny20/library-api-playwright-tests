import { AuthorRequestDTO } from "../api/models/author.types";
import { faker } from "@faker-js/faker";
import { Logger } from "./logger";

const logger = new Logger();

export function generateNewAuthor(): AuthorRequestDTO {
  const authorData = {
    name: generateAuthorName(),
    nationality: faker.location.language().name,
    birth: generateAuthorBirth(),
    description: faker.lorem.words({ min: 4, max: 8 }),
  }

  logger.debug("New author generated:", authorData);

  return authorData;
}

function generateAuthorName() {
  return {
    first: faker.person.firstName(),
    last: faker.person.lastName(),
  }
}

function generateAuthorBirth() {
  return {
    date: faker.date.birthdate().toISOString().split('T')[0],
    country: faker.location.country(),
    city: faker.location.city(),
  }
}