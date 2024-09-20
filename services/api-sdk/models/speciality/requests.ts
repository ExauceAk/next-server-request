"use server";

import { ApiError } from "@/services/api-sdk/errors";
import { FetchService } from "@/services/api-sdk/lib/utils/fetch";
import {
  AllSpecialitiesQueryResponse,
  DATA_BODY_KEY,
  SpecialitieOfficeDetailQueryResponse,
} from "@/services/api-sdk/models/speciality/contracts";
import { Speciality } from "@/services/api-sdk/types/specialities";
import { getToken } from "@/utils/user-token";
import { OneSpecialistOffices } from "../../types/specialist";

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

export const getAllSpecialities = async (): Promise<Speciality[]> => {
  const response = await fetchService.get(`/speciality`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllSpecialitiesQueryResponse =
      await response.json();
    return data.map((item) => {
      try {
        return {
          id: item.id,
          title: item.title,
        } satisfies Speciality;
      } catch (e) {
        throw new ApiError("Failed to fetch all speciality");
      }
    });
  }

  throw new ApiError("Failed to fetch all speciality");
};

export const getOneSpecialistOffices = async (
  id: string,
): Promise<OneSpecialistOffices> => {
  const response = await fetchService.get(`/referral/referred-office/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: item }: SpecialitieOfficeDetailQueryResponse =
      await response.json();
    return {
      id: item.office.id,
      name: item.office.name,
      email: item.office.email,
      phoneNumber: item.office.phoneNumber,
      address: item.office.location,
      image: item.office.logo?.path,
      speciality: item.office.speciality?.title,
      website: item.office.website || "",
      timezone: item.office.timezone || "",
      typeOffice: item.office.typeOffice.label || "",
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
                patientName: `${cas.case.patient.firstName} ${cas.case.patient.lastName}`,

                specialistName:
                  `${cas.referralDoctor.user.firstName} ${cas.referralDoctor.user.lastName}`,
                referringFromId: cas.referringFrom.id,
                referredToId: cas.referredTo.id,
                status: cas.case.referringOfficeStatus,
              },
            ]
          : [],
      ),
      referredOfficeStaff: item.referredOfficeStaff.admin
        .concat(
          // @ts-ignore
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
                  speciality: membre.speciality? membre.speciality.title : "...",
                },
              ]
            : [],
        ),
    } satisfies OneSpecialistOffices;
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
