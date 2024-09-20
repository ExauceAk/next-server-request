"use server";

import { ApiError } from "@/services/api-sdk/errors";
import { FetchService } from "@/services/api-sdk/lib/utils/fetch";
import {
  DATA_BODY_KEY,
  OfficeOnePatientsQueryResponse,
  OfficePatientsQueryResponse,
} from "@/services/api-sdk/models/patients/contracts";
import {
  OfficePatients,
  OneOfficePatients,
} from "@/services/api-sdk/types/patients";
import { getToken } from "@/utils/user-token";

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

export const getAllOfficePatients = async (
  id: string,
): Promise<OfficePatients[]> => {
  const response = await fetchService.get(`/patients/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: OfficePatientsQueryResponse =
      await response.json();
    return data.map((item) => {
      try {
        return {
          id: item.patient.id,
          fullName: `${item.patient.lastName} ${item.patient.firstName}`,
          email: item.patient.parentEmail
            ? item.patient.parentEmail
            : item.patient.email,
          birthDate: item.patient.birthDate,
          phoneNumber: item.patient.phoneNumber ? item.patient.phoneNumber : "",
          parentName: item.patient.parentName,
          totalReferrals: item.caseCount,
        } satisfies OfficePatients;
      } catch (e) {
        throw new ApiError("Failed to fetch office patients");
      }
    });
  }

  throw new ApiError("Failed to fetch patients");
};

export const getOneOfficePatients = async (
  id: string,
  officeId: string,
): Promise<OneOfficePatients> => {
  const response = await fetchService.get(`/patients/${id}/${officeId}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: item }: OfficeOnePatientsQueryResponse =
      await response.json();
    return {
      id: item.patient.id,
      lastName: item.patient.lastName,
      firstName: item.patient.firstName,
      email: item.patient.parentEmail
        ? item.patient.parentEmail
        : item.patient.email,
      phoneNumber: item.patient.phoneNumber
        ? item.patient.phoneNumber
        : item.patient.parentPhoneNumber,
      address: "USA",
      image: item.patient.picture,
      case: item?.patient.cases.flatMap((cas) =>
        cas.id
          ? [
              {
                id: cas.id,
                referralId: cas.referral.id,
                date: cas.createdAt,
                refferedStatus: cas.referral?.status,
                referringFromId: cas.referral?.referringFrom.id,
                referringToId: cas.referral?.referringFrom.id,
                refferingFromName: cas.referral?.referringFrom.name,
                refferingFromType: cas.referral?.referringFrom.name,
                refferedToName: cas.referral?.referredTo.name,
                refferedToType: cas.referral?.referredTo.name,
                chatroomId: cas.chatroom ? cas.chatroom.id : "",
                chatroomName: cas.chatroom ? cas.chatroom.name : "",
                status: cas.referringOfficeStatus,
              },
            ]
          : [],
      ),
    } satisfies OneOfficePatients;
  }

  async function fetchData() {
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
  if (!response.ok) {
    const error = await fetchData();
    throw new ApiError(error);
  }

  throw new ApiError("Failed to fetch patients");
};
