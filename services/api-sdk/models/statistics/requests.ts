"use server";

import { getToken } from "@/utils/user-token";
import { FetchService } from "@/services/api-sdk/lib/utils/fetch";
import {
  AllOfficesRankingsQueryResponse,
  AllPatientReferralStatisticsQueryResponse,
  DATA_BODY_KEY,
  ReferredInIncomeQueryResponse,
  ReferredInPatientsQueryResponse,
  ReferredInPatientsStatusQueryResponse,
  ScheduledCasesQueryResponse,
} from "@/services/api-sdk/models/statistics/contracts";
import {
  OfficesRankings,
  PatientReferralStatistics,
  ReferredInIncome,
  ReferredInPatients,
  ReferredInPatientsStatus,
  ScheduledCases,
  TopReferBack,
} from "@/services/api-sdk/types/statistics";
import { ApiError } from "@/services/api-sdk/errors";

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

export const getAllOfficesRankings = async (): Promise<OfficesRankings[]> => {
  const response = await fetchService.get(
    `/referral/statistics/all-statistics`,
  );

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllOfficesRankingsQueryResponse =
      await response.json();
    return data.OfficesRanking.map((item) => {
      try {
        return {
          id: item.officeId,
          officeName: item.officeName,
          logo: item.logo,
          caseCount: item.caseCount,
          completionPercentage: item.completionPercentage,
        } satisfies OfficesRankings;
      } catch (e) {
        throw new ApiError("Failed to fetch all offices ranking");
      }
    });
  }

  throw new ApiError("Failed to fetch all offices ranking");
};

export const getAllTopReferBack = async (): Promise<TopReferBack[]> => {
  const response = await fetchService.get(
    `/referral/statistics/all-statistics`,
  );

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllOfficesRankingsQueryResponse =
      await response.json();
    return data.TopReferBack.map((item) => {
      try {
        return {
          id: item.office_id,
          officeName: item.office_name,
          logo: item.office_logo,
        } satisfies TopReferBack;
      } catch (e) {
        throw new ApiError("Failed to fetch all top refer back");
      }
    });
  }

  throw new ApiError("Failed to fetch all top refer back");
};

export const getPatientReferralStatisticsByOffice = async (
  id: string,
): Promise<PatientReferralStatistics> => {
  const response = await fetchService.get(`/referral/statistics/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllPatientReferralStatisticsQueryResponse =
      await response.json();
    try {
      return {
        ReceivingOffices: data.ReceivingOffices,
        ReferredInCases: data.ReferredInCases,
        ReferredOutCases: data.ReferredOutCases,
        referredBackCases: data.referredBackCases,
        ReferredInPatients: {
          inQueue: data.ReferredInPatients.inQueue,
          scheduled: data.ReferredInPatients.scheduled,
          completed: data.ReferredInPatients.completed,
          lost: data.ReferredInPatients.lost,
        },
        ReferredOutPatients: {
          inQueue: data.ReferredOutPatients.inQueue,
          scheduled: data.ReferredOutPatients.scheduled,
          completed: data.ReferredOutPatients.completed,
          lost: data.ReferredOutPatients.lost,
        },
        ReferredBackPatients: {
          inQueue: data.ReferredBackPatients.inQueue,
          scheduled: data.ReferredBackPatients.scheduled,
          completed: data.ReferredBackPatients.completed,
          lost: data.ReferredBackPatients.lost,
        },
      } satisfies PatientReferralStatistics;
    } catch (e) {
      throw new ApiError("Failed to fetch all patient referral statistics");
    }
  }

  throw new ApiError("Failed to fetch all patient referral statistics");
};

export const getReferredInIncome = async (
  id: string,
): Promise<ReferredInIncome> => {
  const response = await fetchService.get(
    `/referral/statistics/top-procedures/${id}`,
  );

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: ReferredInIncomeQueryResponse =
      await response.json();

    return {
      stat: data.stat,
      total: data.total,
    } satisfies ReferredInIncome;
  }

  throw new ApiError("Failed to fetch all top refer back");
};

export const getReferredInPatients = async (
  id: string,
): Promise<ReferredInPatients> => {
  const response = await fetchService.get(
    `/referral/statistics/patients-referred/${id}`,
  );

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: ReferredInPatientsQueryResponse =
      await response.json();

    return {
      stat: data.stat,
    } satisfies ReferredInPatients;
  }

  throw new ApiError("Failed to fetch all top refer back");
};

export const getReferredInPatientsStatus = async (
  id: string,
): Promise<ReferredInPatientsStatus> => {
  const response = await fetchService.get(
    `/referral/statistics/patients-by-status/${id}`,
  );

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: ReferredInPatientsStatusQueryResponse =
      await response.json();

    return {
      stat: data.stat,
    } satisfies ReferredInPatientsStatus;
  }

  throw new ApiError("Failed to fetch all top refer back");
};

export const getScheduledCases = async (
  id: string,
): Promise<ScheduledCases> => {
  const response = await fetchService.get(
    `/referral/statistics/completed-lost-cases/${id}`,
  );

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: ScheduledCasesQueryResponse =
      await response.json();

    return {
      stat: data.stat,
    } satisfies ScheduledCases;
  }

  throw new ApiError("Failed to fetch all top refer back");
};
