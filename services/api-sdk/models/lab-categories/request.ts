"use server";

import { getToken } from "@/utils/user-token";
import { FetchService } from "../../lib/utils/fetch";

import {
  AddDefaultCategoryQueryResponse, CreateCategoryQueryResponse, UpdateCategoryQueryResponse
} from "./contracts";
import { ApiError } from "../../errors";

/**
 * Fetch service instance
 * @type {FetchService}
 */
const fetchService: FetchService = new FetchService({
  requestInterceptor: async (config) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${await getToken()}`
    }
  })
});

/**
 * create category on the server.
 * @param args - The category data to create.
 * @returns A promise that resolves to the updated user.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const createCategory = async (args: CreateCategoryQueryResponse) => {
  const response = await fetchService.post(
    `/categories`,
    JSON.stringify(args),
    { headers: { "Content-Type": "application/json" } }
  );

  if (response.ok) {
    return response.json();
  }

  throw new ApiError("Failed to create category");
};

/**
 * create category on the server.
 * @param args - The category data to create.
 * @param id - The category id
 * @returns A promise that resolves to the updated user.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const updateCategory = async (
  id: string,
  args: UpdateCategoryQueryResponse
) => {
  const response = await fetchService.patch(
    `/categories/${id}`,
    JSON.stringify(args),
    { headers: { "Content-Type": "application/json" } }
  );

  if (!response.ok) {
    throw new ApiError("Failed to update category");
  }
};

/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */

export const getCategoryByOfficeId = async (id: string) => {
  const response = await fetchService.get(`/categories/${id}`);
  if (response.ok) {
    const { data } = await response.json();
    return data;
  }

  throw new ApiError("Failed to fetch category  of office connected");
};

/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */

export const getAllDefaultCategories = async () => {
  const response = await fetchService.get(
    `/categories/default-categories`
  );
  if (response.ok) {
    const { data } = await response.json();
    return data;
  }

  throw new ApiError("Failed to fetch all default categories");
};

/**
 * create office on the server.
 * @param args - The office data to create.
 * @returns A promise that resolves to the updated user.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const addDefaultCategory = async (
  args: AddDefaultCategoryQueryResponse
) => {
  const response = await fetchService.patch(
    `/categories/add-from-default-category`,
    JSON.stringify(args),
    { headers: { "Content-Type": "application/json" } }
  );

  if (!response.ok) {
    throw new ApiError("Failed to add default category");
  }
};

/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */
// @ts-ignore
export const removeCategory = async (id: string) => {
  const response = await fetchService.delete(`/categories/${id}`);
  if (response.ok) {
    return response.json();
  }
  if (!response.ok) {
    throw new ApiError("Failed to delete category");
  }
};
