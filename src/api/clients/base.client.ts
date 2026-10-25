import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { Logger } from "../../utils/logger";

export abstract class BaseClient {
  protected request: APIRequestContext;

  protected logger = new Logger();

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  protected async get(endpoint: string): Promise<APIResponse> {
    return this.request.get(endpoint);
  }

  protected async post(
    endpoint: string,
    data: unknown,
    options?: {
      params: Record<string, string | number | boolean>
    }): Promise<APIResponse> {
    return this.request.post(endpoint, { data, ...options });
  }

  protected async put(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.request.put(endpoint, { data });
  }

  protected async delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(endpoint);
  }

  assertSuccess200ResponseCode(response: APIResponse) {
    expect(response.status()).toBe(200);
  }

  assertSuccess201ResponseCode(response: APIResponse) {
    expect(response.status()).toBe(201);
  }

  assertSuccess204ResponseCode(response: APIResponse) {
    expect(response.status()).toBe(204);
  }

  assertError404ResponseCode(response: APIResponse) {
    expect(response.status()).toBe(404);
  }

  async parseBody(response: APIResponse) {
    try {
      return await response.json();
    } catch (error) {
      throw new Error(
        `Failed to parse response body as JSON. Status: ${response.status()}`,
        { cause: error }
      );
    }
  }

  async expectResponseMatchesObject(
    response: APIResponse,
    expected: Record<string, unknown>
  ) {
    expect(await this.parseBody(response)).toMatchObject(expected);
  }
}