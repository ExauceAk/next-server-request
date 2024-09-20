"use server";

import { getToken } from "@/utils/user-token";
import { FetchService } from "../../lib/utils/fetch";

import {
  AddDefaultProcedureQueryResponse,
  CreateProcedureQueryResponse,
  UpdateProcedureQueryResponse,
} from "./contracts";
import { ApiError } from "../../errors";
import { getApiErrorMessage } from "@/utils/get-api-error-message";

/**
 * Fetch service instance
 * @type {FetchService}
 */
const fetchService: FetchService = new FetchService({
  requestInterceptor: async (config) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${await getToken()}`,
    },
  }),
});

/**
 * create procedure on the server.
 * @param args - The procedure data to create.
 * @returns A promise that resolves to the updated user.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const createProcedure = async (args: CreateProcedureQueryResponse) => {
  const response = await fetchService.post(
    `/procedures`,
    JSON.stringify(args),
    { headers: { "Content-Type": "application/json" } },
  );

  if (response.ok) {
    return response.json();
  } else {
    const error = await getApiErrorMessage(response);
    throw new ApiError(error);
  }
};

/**
 * create procedure on the server.
 * @param args - The procedure data to create.
 * @returns A promise that resolves to the updated user.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const updateProcedure = async (
  id: string,
  args: UpdateProcedureQueryResponse,
) => {
  const response = await fetchService.put(
    `/procedures/${id}`,
    JSON.stringify(args),
    { headers: { "Content-Type": "application/json" } },
  );

  if (!response.ok) {
    const error = await getApiErrorMessage(response);
    throw new ApiError(error);
  }
};

/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */

export const getProcedureByOfficeId = async (id: string) => {
  const response = await fetchService.get(`/procedures/${id}`);
  if (response.ok) {
    const { data } = await response.json();
    return data;
  }

  throw new ApiError("Failed to fetch procedure  create by office connected");
};


/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */

export const getCategoriesByOfficeId = async (id: string) => {
  const response = await fetchService.get(`/categories/${id}`);
  if (response.ok) {
    const { data } = await response.json();
    return data;
  }

  throw new ApiError("Failed to fetch categories create by office connected");
};

/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */

export const getAllGeneralProcedure = async () => {
  const response = await fetchService.get(
    `/global-procedure/general-global-procedures`,
  );
  if (response.ok) {
    const { data } = await response.json();
    return data;
  }

  throw new ApiError("Failed to fetch all procedures");
};

/**
 * Fetches all procedures from the server.
 * @param speciality - The speciality of the procedure.
 * @throws {ApiError} if the request fails.
 */

export const getAllSpecialProcedure = async (speciality: string) => {
  const response = await fetchService.get(
    `/global-procedure/specialist-global-procedures?speciality=${speciality}`,
  );
  if (response.ok) {
    const { data } = await response.json();
    return data;
  }

  throw new ApiError("Failed to fetch all procedures");
};

/**
 * create office on the server.
 * @param args - The office data to create.
 * @returns A promise that resolves to the updated user.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const addDefaultProcedure = async (
  args: AddDefaultProcedureQueryResponse,
) => {
  const response = await fetchService.patch(
    `/procedures/add-from-global-procedure`,
    JSON.stringify(args),
    { headers: { "Content-Type": "application/json" } },
  );

  if (!response.ok) {
    const error = await getApiErrorMessage(response);
    throw new ApiError(error);
  }
};

/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */
// @ts-ignore
export const removeProcedure = async (id: string) => {
  const response = await fetchService.delete(`/procedures/${id}`);
  if (response.ok) {
    return response.json();
  }
  if (!response.ok) {
    throw new ApiError("Failed to delete procedure");
  }
};
