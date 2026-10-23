import { faker } from "@faker-js/faker";
import { GenreRequestDTO } from "../api/models/genre.types";
import { Logger } from "./logger";

const logger = new Logger();

export function generateNewGenre(): GenreRequestDTO {
  const genreData = {
    name: faker.lorem.words({ min: 2, max: 4 }),
    description: faker.lorem.words({ min: 4, max: 8 }),
  }

  logger.debug("New genre generated:", genreData);

  return genreData;
}