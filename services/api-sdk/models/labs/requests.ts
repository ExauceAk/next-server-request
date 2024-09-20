"use server";

import { ApiError } from "@/services/api-sdk/errors";
import { FetchService } from "@/services/api-sdk/lib/utils/fetch";
import {
  AllOfficeLabPreferredTechniciansQueryResponse,
  AllOfficeLabQueryResponse,
  DATA_BODY_KEY,
  LabOfficeDetailQueryResponse,
  TechniciansDetailsQueryResponse,
} from "@/services/api-sdk/models/labs/contracts";
import {
  LabPreferredTechnicians,
  OfficeLab,
  OneLabOffices,
  TechniciansDetails,
} from "@/services/api-sdk/types/labs";
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

export const getAllLabOfficePreferredTechnicians = async (
  id: string,
): Promise<LabPreferredTechnicians[]> => {
  const response = await fetchService.get(
    `/referral/preferred-doctors/${id}?type=Lab`,
  );

  if (response.ok) {
    const {
      [DATA_BODY_KEY]: data,
    }: AllOfficeLabPreferredTechniciansQueryResponse = await response.json();
    return data.map((item) => {
      try {
        return {
          id: item.doctor.id,
          fullName: `${item.doctor.user.lastName} ${item.doctor.user.firstName}`,
          officeName: item.doctor.office.name,
          totalCases: item.totalCases,
          completedPercentage: item.completedPercentage,
        } satisfies LabPreferredTechnicians;
      } catch (e) {
        throw new ApiError("Failed to fetch office preferred technicians");
      }
    });
  }

  throw new ApiError("Failed to fetch office preferred technicians");
};

export const getAllOfficeLab = async (id: string): Promise<OfficeLab[]> => {
  const response = await fetchService.get(`/referral/labs/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllOfficeLabQueryResponse =
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
        } satisfies OfficeLab;
      } catch (e) {
        throw new ApiError("Failed to fetch office cases");
      }
    });
  }

  throw new ApiError("Failed to fetch Specialist");
};

/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */

export const getOneTechnicianDetails = async (
  id: string,
): Promise<TechniciansDetails> => {
  const response = await fetchService.get(
    `/referral/preferred-doctors/details/${id}`,
  );

  if (response.ok) {
    const { data }: TechniciansDetailsQueryResponse = await response.json();
    try {
      return {
        id: data.doctor.id,
        fullName: `${data.doctor.user.firstName} ${data.doctor.user.lastName}`,
        phoneNumber: data.doctor.user.phoneNumber,
        email: data.doctor.user.email,
        picture: data.doctor.user.profilePicture ? data.doctor.user.profilePicture.path : "",
        officeName: data.doctor.office.name,
        officeLogo: data.doctor.office.logo.path,
        caseCount: data.caseCount,
        onGoing: data.approved,
        overdue: data.overdue,
        completed: data.completed,
        referredCase: data.referredCase.map((item) => {
          return {
            id: item.id,
            status: item.case.referringOfficeStatus,
            rejectedReason: item.case.rejectedReason,
            patientFullName: `${item.case.patient.lastName} ${item.case.patient.firstName}`,
            startDate: item.case.createdAt,
            dueDate: item.dueDate,
          };
        }),
      } satisfies TechniciansDetails;
    } catch (e) {
      throw new ApiError(
        "Failed to fetch get one lab technician details format",
      );
    }
  }

  throw new ApiError("Failed to fetch get one lab technician details");
};

export const getOneLabOffices = async (id: string): Promise<OneLabOffices> => {
  const response = await fetchService.get(`/referral/referred-office/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: item }: LabOfficeDetailQueryResponse =
      await response.json();

    return {
      id: item.office.id,
      name: item.office.name,
      email: item.office.email,
      phoneNumber: item.office.phoneNumber,
      address: item.office.location,
      image: item.office.logo?.path,
      speciality: item.office.speciality?.title,
      statistics: {
        caseCount: JSON.stringify(item.caseCount),
        inQueue: JSON.stringify(item.inQueue),
        approved: JSON.stringify(item.approved),
        scheduled: JSON.stringify(item.scheduled),
        completed: JSON.stringify(item.completed),
        lost: JSON.stringify(item.lost),
        overdue: JSON.stringify(item.overdue),
      },

      referredCase: item?.referredCase.flatMap((cas) =>
        cas.id
          ? [
              {
                id: cas.id,
                consultation: cas.createdAt,
                dueDate: cas.dueDate || "",
                patientName: `${cas.case.patient.firstName} ${cas.case.patient.lastName}`,
                specialistName: `${cas.referralDoctor.user.firstName} ${cas.referralDoctor.user.lastName}`,
                technicianName: `${cas.preferredDoctor.user.firstName} ${cas.preferredDoctor.user.lastName}`,
                status: cas.case.referringOfficeStatus,
                rejectedReason: cas.case.rejectedReason || "",
              },
            ]
          : [],
      ),
      referredOfficeStaff: item.referredOfficeStaff.admin
        .concat(
          item.referredOfficeStaff.doctor,
          item.referredOfficeStaff.manager,
          item.referredOfficeStaff.receptionist,
          item.referredOfficeStaff.technician,
        )
        .flatMap((membre) =>
          membre.id
            ? [
                {
                  id: membre.id,
                  firstName: membre.user.firstName,
                  lastName: membre.user.lastName,
                  position: membre.role,
                  speciality: membre.speciality || "...",
                },
              ]
            : [],
        ),
    } satisfies OneLabOffices;
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

  throw new ApiError("Failed to fetch Specialist Offices");
};
