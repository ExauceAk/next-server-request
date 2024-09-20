"use server";

import { ApiError } from "@/services/api-sdk/errors";
import { FetchService } from "@/services/api-sdk/lib/utils/fetch";
import { DATA_BODY_KEY } from "@/services/api-sdk/models/speciality/contracts";
import { Speciality } from "@/services/api-sdk/types/specialities";
import { getToken } from "@/utils/user-token";
import { AllMySpecialitiesQueryResponse } from "./contracts";

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

export const getMyAllSpecialities = async (): Promise<Speciality[]> => {
  const response = await fetchService.get(
    `http://localhost:3000/api/officeSpecialists`,
  );


  if (response.ok) {
    const data: AllMySpecialitiesQueryResponse = await response.json();
    return data.map((item) => {
      try {
        return {
          id: item.id,
          title: item.officeName,
        } satisfies Speciality;
      } catch (e) {
        throw new ApiError("Failed to fetch all speciality");
      }
    });
  }

  throw new ApiError("Failed to fetch all speciality");
};
