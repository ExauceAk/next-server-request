import { useQuery } from "@tanstack/react-query";
import {
  getAllOfficesRankings,
  getAllTopReferBack,
  getPatientReferralStatisticsByOffice,
  getReferredInIncome,
  getReferredInPatients,
  getReferredInPatientsStatus,
  getScheduledCases,
} from "@/services/api-sdk/models/statistics/requests";

/**
 * Tag for the query to fetch all functions.
 */
const ALL_OFFICE_RANKING_QUERY_KEY = ["all-offices-ranking"];

const ALL_TOP_REFER_BACK_QUERY_KEY = ["all-top-refer-back"];

const ALL_PATIENT_REFERRAL_STATISTICS_QUERY_KEY = (id: string) => [
  "ALL_PATIENT_REFERRAL_STATISTICS",
  id,
];

const REFERRED_IN_INCOME_QUERY_KEY = (id: string) => ["REFERRED_IN_INCOME", id];

const REFERRED_IN_PATIENTS_QUERY_KEY = (id: string) => [
  "REFERRED_IN_PATIENTS",
  id,
];

const REFERRED_IN_PATIENTS_STATUS_QUERY_KEY = (id: string) => [
  "REFERRED_IN_PATIENTS_STATUS",
  id,
];

const SCHEDULED_CASES_QUERY_KEY = (id: string) => ["SCHEDULED_CASES", id];

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useAllOfficesRankings = () =>
  useQuery({
    queryKey: ALL_OFFICE_RANKING_QUERY_KEY,
    queryFn: () => getAllOfficesRankings(),
  });

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useAllTopReferBack = () =>
  useQuery({
    queryKey: ALL_TOP_REFER_BACK_QUERY_KEY,
    queryFn: () => getAllTopReferBack(),
  });

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const usePatientReferralStatisticsByOffice = (id: string) =>
  useQuery({
    queryKey: ALL_PATIENT_REFERRAL_STATISTICS_QUERY_KEY(id),
    queryFn: () => getPatientReferralStatisticsByOffice(id),
  });

/**
 * Hook to fetch all referred in income.
 * @returns The query state.
 */
export const useGetReferredInIncome = (id: string) =>
  useQuery({
    queryKey: REFERRED_IN_INCOME_QUERY_KEY(id),
    queryFn: () => getReferredInIncome(id),
  });

/**
 * Hook to fetch all referred in patients.
 * @returns The query state.
 */
export const useGetReferredInPatients = (id: string) =>
  useQuery({
    queryKey: REFERRED_IN_PATIENTS_QUERY_KEY(id),
    queryFn: () => getReferredInPatients(id),
  });

/**
 * Hook to fetch all referred in patients status.
 * @returns The query state.
 */
export const useGetReferredInPatientsStatus = (id: string) =>
  useQuery({
    queryKey: REFERRED_IN_PATIENTS_STATUS_QUERY_KEY(id),
    queryFn: () => getReferredInPatientsStatus(id),
  });

/**
 * Hook to fetch all Scheduled Cases.
 * @returns The query state.
 */
export const useGetScheduledCases = (id: string) =>
  useQuery({
    queryKey: SCHEDULED_CASES_QUERY_KEY(id),
    queryFn: () => getScheduledCases(id),
  });
