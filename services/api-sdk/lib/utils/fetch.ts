import "server-only";

import path from "path";
// @ts-ignore
import _ from "lodash";

type RequestInterceptorType = (
  config: RequestInit,
) => RequestInit | Promise<RequestInit>;

type ResponseInterceptorType = (
  response: Response,
) => Response | Promise<Response>;

interface FetchServiceOptions {
  requestInterceptor?: RequestInterceptorType;
  responseInterceptor?: ResponseInterceptorType;
  baseUrl?: string;
}

/**
 * A service for making requests to the server.
 *
 * @param options - The options for the service.
 */
export class FetchService {
  /**
   * @public
   * The request interceptor for the service.
   *
   * @param config - The request configuration.
   *
   * @returns The modified request configuration.
   *
   * @remarks
   * This function is called before the request is made to the server.
   */
  public requestInterceptor?: RequestInterceptorType;

  /**
   * @public
   * The response interceptor for the service.
   *
   * @param response - The response from the server.
   *
   * @returns The modified response from the server.
   *
   * @remarks
   * This function is called after the response is received from the server.
   */
  public responseInterceptor?: ResponseInterceptorType;

  /**
   * @public
   * The base URL for the service.
   *
   * @default process.env.API_URL
   */
  public baseUrl?: string;

  constructor(options?: FetchServiceOptions) {
    this.requestInterceptor = options?.requestInterceptor;
    this.responseInterceptor = options?.responseInterceptor;
    this.baseUrl = options?.baseUrl ?? process.env.API_URL;
  }

  /**
   * @public
   * Fetches data from the server.
   *
   * @param url - The URL to fetch data from.
   * @param options - The options for the request.
   *
   * @returns The response from the server.
   */
  public async fetch(url: string, options?: RequestInit) {
    let newOptions: RequestInit = {
      cache: "no-store",
    };

    if (this.requestInterceptor) {
      newOptions = await this.requestInterceptor(newOptions);
    }

    if (options) {
      newOptions = _.merge(newOptions, options);
    }

    const formattedUrl =
      this.baseUrl && url.startsWith("/")
        ? path.join(new URL(this.baseUrl).pathname, url)
        : url;

    const response = await fetch(
      new URL(formattedUrl, this.baseUrl),
      newOptions,
    );

    return this.responseInterceptor?.(response) ?? response;
  }

  /**
   * @public
   * Makes a GET request to the server.
   *
   * @param url - The URL to make the request to.
   * @param options - The options for the request.
   */
  public async get(url: string, options?: Omit<RequestInit, "method">) {
    return this.fetch(url, { ...options, method: "GET" });
  }

  /**
   * @public
   * Makes a POST request to the server.
   *
   * @param url - The URL to make the request to.
   * @param body - The body of the request.
   * @param options - The options for the request.
   */
  public async post(
    url: string,
    body?: RequestInit["body"],
    options?: Omit<RequestInit, "method" | "body">,
    // p0?: {
    //   username: string;
    //   email: string | undefined;
    //   firstName: string;
    //   lastName: string;
    //   password: string;
    //   role: string;
    // },
  ) {
    return this.fetch(url, {
      ...options,
      method: "POST",
      body,
    });
  }

  /**
   * @public
   * Makes a PUT request to the server.
   *
   * @param url - The URL to make the request to.
   * @param body - The body of the request.
   * @param options - The options for the request.
   */
  public async put(
    url: string,
    body?: RequestInit["body"],
    options?: Omit<RequestInit, "method" | "body">,
  ) {
    return this.fetch(url, {
      ...options,
      method: "PUT",
      body,
    });
  }

  /**
   * @public
   * Makes a PATCH request to the server.
   *
   * @param url - The URL to make the request to.
   * @param body - The body of the request.
   * @param options - The options for the request.
   */
  public async patch(
    url: string,
    body?: RequestInit["body"],
    options?: Omit<RequestInit, "method" | "body">,
  ) {
    return this.fetch(url, {
      ...options,
      method: "PATCH",
      body,
    });
  }

  /**
   * @public
   * Makes a DELETE request to the server.
   *
   * @param url - The URL to make the request to.
   * @param options - The options for the request.
   */
  public async delete(url: string, options?: Omit<RequestInit, "method">) {
    return this.fetch(url, {
      ...options,
      method: "DELETE",
    });
  }

  /**
   * @public
   * Makes a PUT request to the server.
   *
   * @param url - The URL to make the request to.
   * @param body - The body of the request.
   * @param options - The options for the request.
   */
  public async deletMultiple(
    url: string,
    body?: RequestInit["body"],
    options?: Omit<RequestInit, "method" | "body">,
  ) {
    return this.fetch(url, {
      ...options,
      method: "DELETE",
      body,
    });
  }
}
