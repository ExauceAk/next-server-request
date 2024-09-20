"use server";

import { getToken } from "@/utils/user-token";
import { FetchService } from "../../lib/utils/fetch";
import { AllTimezonesQueryResponse, CallingCodeQueryResponse, DATA_BODY_KEY } from "./contracts";
import { CallingCode, Timezone } from "../../types/timezones";
import { ApiError } from "../../errors";

const fetchService: FetchService = new FetchService({
  requestInterceptor: async (config) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${await getToken()}`,
    },
  }),
});

// const fetchService: FetchService = new FetchService();

/**
 * Fetches all events from the server.
 * @returns A promise that resolves to an array of events.
 * @throws {ApiError} if the request fails.
 */
export const getAllTimezoneByCountry = async (
  id: string,
): Promise<Timezone[]> => {
  const response = await fetchService.get(`/timezones/country/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllTimezonesQueryResponse =
      await response.json();
    return data.map((item) => {
      try {
        return {
          name: item.name,
          utc: item.utcOffsetStr,
        } satisfies Timezone;
      } catch (e) {
        throw new ApiError("Failed to fetch views timezone");
      }
    });
  }

  throw new ApiError("Failed to fetch views timezone");
};

/**
 * Fetches all events from the server.
 * @returns A promise that resolves to an array of events.
 * @throws {ApiError} if the request fails.
 */
export const getCallingCodeByCountry = async (
  id: string,
): Promise<CallingCode> => {
  const response = await fetchService.get(`/countries-api-external/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: CallingCodeQueryResponse =
      await response.json()
      try {
        return {
          callingCode: `+${data.callingCodes[0]}`,
        } satisfies CallingCode;
      } catch (e) {
        throw new ApiError("Failed to fetch views calling code by country");
      }
  }

  throw new ApiError("Failed to fetch views calling code by country");
};
