import { APIRequestContext, APIResponse, expect, test } from "@playwright/test";
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

  protected async delete(endpoint: string, forcibly: boolean = false): Promise<APIResponse> {
    return this.request.delete(endpoint, { params: { forcibly } });
  }

  async assertSuccess200ResponseCode(response: APIResponse) {
    await test.step("Assert status code 200 is returned", async () => {
      if (response.status() !== 200) {
        const responseBody = await response.text();
        throw new Error(
          `Expected status 200, but got ${response.status()}.\nURL: ${response.url()}\nBody: ${responseBody}`
        );
      }
    });
  }

  async assertSuccess201ResponseCode(response: APIResponse) {
    await test.step("Assert status code 201 is returned", async () => {
      if (response.status() !== 201) {
        const responseBody = await response.text();
        throw new Error(
          `Expected status 201, but got ${response.status()}.\nURL: ${response.url()}\nBody: ${responseBody}`
        );
      }
    });
  }

  async assertSuccess204ResponseCode(response: APIResponse) {
    await test.step("Assert status code 204 is returned", async () => {
      if (response.status() !== 204) {
        const responseBody = await response.text();
        throw new Error(
          `Expected status 204, but got ${response.status()}.\nURL: ${response.url()}\nBody: ${responseBody}`
        );
      }
    });
  }

  async assertError404ResponseCode(response: APIResponse) {
    await test.step("Assert status code 404 is returned", async () => {
      if (response.status() !== 404) {
        const responseBody = await response.text();
        throw new Error(
          `Expected status 404, but got ${response.status()}.\nURL: ${response.url()}\nBody: ${responseBody}`
        );
      }
    });
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

  async compareTwoObjects(
    actual: Record<string, unknown>,
    expected: Record<string, unknown>
  ) {
    await test.step("Compare actual object with expected", async () => {
      expect(actual).toMatchObject(expected);
    });
  }
}