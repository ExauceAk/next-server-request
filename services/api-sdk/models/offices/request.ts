"use server";

import { getToken } from "@/utils/user-token";
import { FetchService } from "../../lib/utils/fetch";
import {
  CheckOfficeAddressExistArgs, CheckOfficeAddressExistResponse,
  CreateOfficeArgs,
  CreateOfficeWithoutLogoArgs,
  FirstOfficeForUserConnected,
  OfficesForUserConnected,
  OneOffice,
  UpdateOfficeArgs,
  UpdateOfficeWithoutLogoArgs
} from "../../types/offices";
import {
  AllOfficeForUserConnectedQueryResponse, CheckOfficeAddressExistQueryResponse, CheckOfficeAddressExistRequestBody,
  FirstOfficeForUserConnectedQueryResponse,
  OneOfficeQueryResponse
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
      Authorization: `Bearer ${await getToken()}`,
    },
  }),
});

async function fetchData(response: Response) {
  const reader = response.body?.getReader();
  let data = "";
  // @ts-ignore
  while (true) {
    // @ts-ignore
    const { done, value } = await reader?.read();

    if (done) {
      break;
    }

    data += new TextDecoder("utf-8").decode(value);
  }

  return JSON.parse(data).message;
}

/**
 * create office on the server.
 * @param args - The office data to create.
 * @returns A promise that resolves to the updated user.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const createOffice = async (args: CreateOfficeArgs) => {
  const uploadedFile = args.logo.get("file");
  // if (!(uploadedFile instanceof File)) {
  //   throw new Error("No file provided");
  // }

  const formData = new FormData();
  formData.append("location", args.location);
  formData.append("name", args.name);
  formData.append("email", args.email);
  formData.append("phoneNumber", args.phoneNumber);
  formData.append("phonePrefix", args.phonePrefix);
  formData.append("state", args.state);
  formData.append("city", args.city);
  formData.append("zipCode", args.zipCode);
  args.speciality && formData.append("speciality", args.speciality);
  formData.append("licenceNumber", args.licenceNumber);
  formData.append("timezone", args.timezone);
  formData.append("videoLink", args.videoLink);
  formData.append("website", args.website);
  formData.append("typeOffice", args.typeOffice);
  uploadedFile && formData.append("logo", uploadedFile);
  const response = await fetchService.post(`/office`, formData);

  if (!response.ok) {
    const error = await fetchData(response);
    throw new ApiError(error);
  }
};

/**
 * create office on the server.
 * @param args - The office data to create.
 * @returns A promise that resolves to the updated user.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const createOfficeWithoutLogo = async (
  args: CreateOfficeWithoutLogoArgs,
) => {
  const formData = new FormData();
  formData.append("location", args.location);
  formData.append("name", args.name);
  formData.append("email", args.email);
  formData.append("phoneNumber", args.phoneNumber);
  formData.append("phonePrefix", args.phonePrefix);
  formData.append("state", args.state);
  formData.append("city", args.city);
  formData.append("zipCode", args.zipCode);
  args.speciality && formData.append("speciality", args.speciality);
  formData.append("licenceNumber", args.licenceNumber);
  formData.append("timezone", args.timezone);
  formData.append("videoLink", args.videoLink);
  formData.append("website", args.website);
  formData.append("typeOffice", args.typeOffice);
  const response = await fetchService.post(`/office`, formData);

  if (!response.ok) {
    const error = await fetchData(response);
    throw new ApiError(error);
  }
};

/**
 * create office on the server.
 * @param args - The office data to create.
 * @returns A promise that resolves to the updated user.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const updateOffice = async (id: string, args: UpdateOfficeArgs) => {
  const uploadedFile = args.logo.get("file");
  // if (!(uploadedFile instanceof File)) {
  //   throw new Error("No file provided");
  // }

  const formData = new FormData();
  formData.append("location", args.location);
  formData.append("name", args.name);
  formData.append("email", args.email);
  formData.append("phoneNumber", args.phoneNumber);
  formData.append("phonePrefix", args.phonePrefix);
  formData.append("state", args.state);
  formData.append("city", args.city);
  formData.append("zipCode", args.zipCode);
  args.speciality && formData.append("speciality", args.speciality);
  formData.append("licenceNumber", args.licenceNumber);
  formData.append("timezone", args.timezone);
  formData.append("videoLink", args.videoLink);
  formData.append("website", args.website);
  formData.append("typeOffice", args.typeOffice);
  uploadedFile && formData.append("logo", uploadedFile);
  const response = await fetchService.put(`/office/${id}`, formData);

  if (!response.ok) {
    const error = await fetchData(response);
    throw new ApiError(error);
  }
};

/**
 * create office on the server.
 * @param args - The office data to create.
 * @returns A promise that resolves to the updated user.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const updateOfficeWithoutLogo = async (
  id: string,
  args: UpdateOfficeWithoutLogoArgs,
) => {
  const formData = new FormData();
  formData.append("location", args.location);
  formData.append("name", args.name);
  formData.append("email", args.email);
  formData.append("phoneNumber", args.phoneNumber);
  formData.append("phonePrefix", args.phonePrefix);
  formData.append("state", args.state);
  formData.append("city", args.city);
  formData.append("zipCode", args.zipCode);
  args.speciality && formData.append("speciality", args.speciality);
  formData.append("licenceNumber", args.licenceNumber);
  formData.append("timezone", args.timezone);
  formData.append("videoLink", args.videoLink);
  formData.append("website", args.website);
  formData.append("typeOffice", args.typeOffice);
  const response = await fetchService.put(`/office/${id}`, formData);

  if (!response.ok) {
    const error = await fetchData(response);
    throw new ApiError(error);
  }
};

/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */

export const getUserConnectedFirstOffice =
  async (): Promise<FirstOfficeForUserConnected> => {
    const response = await fetchService.get("/office/get-office-by-user");
    if (response.ok) {
      const { data }: FirstOfficeForUserConnectedQueryResponse =
        await response.json();
      try {
        return {
          id: data.id,
          location: data.location,
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          specialityId: data.speciality?.id,
          specialityName: data.speciality?.title,
          licenceNumber: data.licenceNumber,
          phonePrefix: data.phonePrefix,
          timezone: data.timezone,
          videoLink: data.videoLink,
          state: data.state,
          city: data.city,
          zipCode: data.zipCode,
          website: data.website,
          typeOffice: data.typeOffice,
          logo: data.logo ? data.logo.path : "",
        } satisfies FirstOfficeForUserConnected;
      } catch (e) {
        throw new ApiError(
          "Failed to fetch first office create by user connected",
        );
      }
    }

    throw new ApiError("Failed to fetch first office create by user connected");
  };

/**
 * Fetches all offices from the server.
 * @returns A promise that resolves to an array of offices.
 * @throws {ApiError} if the request fails.
 */

export const getUserConnectedAllOffice = async (): Promise<
  OfficesForUserConnected[]
> => {
  const response = await fetchService.get("/office/get-all-office-by-user");

  if (response.ok) {
    const { data }: AllOfficeForUserConnectedQueryResponse =
      await response.json();

    return data.map((item) => {
      try {
        return {
          id: item.office.id,
          name: item.office.name,
          address: item.office.location || "",
          image: item.office.logo?.path,
          typeOffice: item.office.typeOffice.title,
          speciality: item.office.speciality || "",
          manager:
            item.manager.length > 0
              ? item.manager[0].user.firstName +
                " " +
                item.manager[0].user.lastName
              : "No manager",
          doctorsNumber: JSON.stringify(item.doctorsNumber),
          receptionistsNumber: JSON.stringify(item.receptionistsNumber),
        } satisfies OfficesForUserConnected;
      } catch (e) {
        throw new ApiError("Failed to fetch office");
      }
    });
  }

  throw new ApiError("Failed to all office create by user connected");
};

/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */

export const getOneOffice = async (id: string): Promise<OneOffice> => {
  const response = await fetchService.get(`/office/${id}`);
  if (response.ok) {
    const { data }: OneOfficeQueryResponse = await response.json();
    try {
      return {
        id: data.id,
        location: data.location,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        specialityId: data.speciality?.id,
        specialityName: data.speciality?.title,
        licenceNumber: data.licenceNumber,
        phonePrefix: data.phonePrefix,
        timezone: data.timezone,
        videoLink: data.videoLink,
        website: data.website,
        typeOffice: data.typeOffice,
        logo: data.logo ? data.logo.path : "",
        zipCode: data.zipCode,
        city: data.city,
        state: data.state,
      } satisfies OneOffice;
    } catch (e) {
      throw new ApiError("Failed to fetch one office");
    }
  }

  throw new ApiError("Failed to fetch one office");
};

export const checkOfficeLocation = async (args: CheckOfficeAddressExistArgs): Promise<CheckOfficeAddressExistResponse> => {

  const url = args.id
    ? `/office/find/byLocation/${args.location}?idOffice=${args.id}`
    : `/office/find/byLocation/${args.location}`;
  const response = await fetchService.get(url);

  if (response.ok) {
    const rep: CheckOfficeAddressExistQueryResponse = await response.json();
    try {
      return {
        exist: rep.data.exist,
        message: rep.data.message,
      } satisfies CheckOfficeAddressExistResponse;
    } catch (e) {
      throw new ApiError("Failed to parse username data");
    }
  }
  throw new ApiError("Failed to parse username");
};
