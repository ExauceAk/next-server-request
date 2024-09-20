"use server";

import { ApiError } from "@/services/api-sdk/errors";
import { FetchService } from "@/services/api-sdk/lib/utils/fetch";
import { DATA_BODY_KEY } from "@/services/api-sdk/models/speciality/contracts";
import { getToken } from "@/utils/user-token";
import {
  ReferringOfficeDoctorsDetails,
  ReferringOffices,
  ReferringOfficesPreferredDoctors,
} from "@/services/api-sdk/types/referring-offices";
import {
  AllReferringOfficePreferredDoctorsQueryResponse,
  ReferringOfficeDetailsQueryResponse,
  AllReferringOfficeQueryResponse,
} from "./contracts";

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

export const getAllReferringOffices = async (
  id: string,
): Promise<ReferringOffices[]> => {
  const response = await fetchService.get(
    `/referral/referred-offices/${id}?types=General%20Dentist&types=Specialist`,
  );

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllReferringOfficeQueryResponse =
      await response.json();

    return data.map((item) => {
      try {
        return {
          id: item.office.id,
          officeName: item.office.name,
          officeImage: item.office.name,
          patient: JSON.stringify(item.totalPatients),
          completedCase: item.completedPercentage + "%",
          speciality: item.office.speciality || "General Dentiste",
          status: item.office.status || "Registered",
        } satisfies ReferringOffices;
      } catch (e) {
        throw new ApiError("Failed to fetch office cases");
      }
    });
  }

  throw new ApiError("Failed to fetch Specialist");
};

export const getAllReferringOfficePreferredDoctors = async (
  id: string,
): Promise<ReferringOfficesPreferredDoctors[]> => {
  const response = await fetchService.get(
    `/referral/preferred-doctors/${id}?type=General-Dentist`,
  );

  if (response.ok) {
    const {
      [DATA_BODY_KEY]: data,
    }: AllReferringOfficePreferredDoctorsQueryResponse = await response.json();
    return data.map((item) => {
      try {
        return {
          id: item.doctor.id,
          fullName: `${item.doctor.user.lastName} ${item.doctor.user.firstName}`,
          officeName: item.doctor.office.name,
          totalCases: item.totalCases,
          speciality: item.doctor.speciality ? item.doctor.speciality.title : "General Dentist",
          completedPercentage: item.completedPercentage,
        } satisfies ReferringOfficesPreferredDoctors;
      } catch (e) {
        throw new ApiError(
          "Failed to fetch Specialist office preferred doctors",
        );
      }
    });
  }

  throw new ApiError("Failed to fetch Specialist office preferred doctors");
};

/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */

export const getOneReferringOfficeDoctorDetails = async (
  id: string,
): Promise<ReferringOfficeDoctorsDetails> => {
  const response = await fetchService.get(`/referral/preferred-doctors/details/${id}`);
  if (response.ok) {
    const { data }: ReferringOfficeDetailsQueryResponse = await response.json();
    try {
      return {
        id: data.doctor.id,
        fullName: `${data.doctor.user.lastName} ${data.doctor.user.firstName}`,
        phoneNumber: data.doctor.user.phoneNumber || "Phone number no found",
        email: data.doctor.user.email,
        picture: data.doctor.user.profilePicture
          ? data.doctor.user.profilePicture.path
          : "",
        officeName: data.doctor.office.name,
        officeLogo: data.doctor.office.logo ? data.doctor.office.logo.path : "",
        caseCount: data.caseCount.toString(),
        inQueue: data.inQueue.toString(),
        referredBack: data.referredBack.toString(),
        scheduled: data.scheduled.toString(),
        completed: data.completed.toString(),
        lost: data.lost.toString(),
        referredCase: data.referredCase.map((item) => {
          return {
            id: item.id,
            status: item.case.status,
            patientFullName: `${item.case.patient.lastName} ${item.case.patient.firstName}`,
            referringFromId: item.referringFrom.id,
            referredToId: item.referredTo.id,
            startDate: item.case.createdAt,
          };
        }),
      } satisfies ReferringOfficeDoctorsDetails;
    } catch (e) {
      throw new ApiError(
        "Failed to fetch get one lab technician details format",
      );
    }
  }

  throw new ApiError("Failed to fetch get one lab technician details");
};
