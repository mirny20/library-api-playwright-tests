import { APIRequestContext, APIResponse } from "@playwright/test";
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
}