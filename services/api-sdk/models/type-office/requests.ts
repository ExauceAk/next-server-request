"use server";

import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/utils/fetchService";
import { TypeOffice } from "../../types/type-office";
import { AllTypeOfficesQueryResponse } from "./contracts";

// export const fetchService: FetchService = new FetchService();

// const fetchService: FetchService = new FetchService();

/**
 * Fetches all events from the server.
 * @returns A promise that resolves to an array of events.
 * @throws {ApiError} if the request fails.
 */
export const getAllTypeOffice = async (): Promise<TypeOffice[]> => {
  const response = await fetchService.get("/type-office");

  if (response.ok) {
    const data: AllTypeOfficesQueryResponse = await response.json();

    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
            label: item.label,
          } satisfies TypeOffice;
        } catch (e) {
          return null;
        }
      })
      .filter((typeOffice) => typeOffice !== null) as TypeOffice[];
  }

  throw new ApiError("Failed to fetch events");
};

// /**
//  * Fetches a single typeOffice from the server.
//  * @param id - The id of the typeOffice to fetch.
//  * @returns A promise that resolves to a single typeOffice.
//  * @throws {ApiError} if the request fails.
//  * @throws {InvalidResponseError} if the response is invalid.
//  */
// export const getOneEvent = async (id: string): Promise<TypeOffice> => {
//   const response = await fetchService.get(`/typeOffice/${id}`);

//   if (response.ok) {
//     const { [DATA_BODY_KEY]: data }: OneEventQueryResponse =
//       await response.json();
//     try {
//       return {
//         id: data.data.eventsID,
//         title: data.data.title,
//         label: data.data.description,
//       } satisfies TypeOffice;
//     } catch (e) {
//       throw new InvalidResponseError("Failed to parse typeOffice data");
//     }
//   }

//   throw new ApiError("Failed to fetch typeOffice");
// };
