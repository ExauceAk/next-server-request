import {
  getAllOfficePatients,
  getOneOfficePatients,
} from "@/services/api-sdk/models/patients/requests";
import { useQuery } from "@tanstack/react-query";

/**
 * Tag for the query to fetch all functions.
 */
const ALL_OFFICES_PATIENTS_QUERY_KEY = ["all-offices-patients"];

const ONE_OFFICES_PATIENTS_QUERY_KEY = (id: string) => [
  "one-offices-patients",
  id,
];

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useAllOfficePatients = (id: string) =>
  useQuery({
    queryKey: ALL_OFFICES_PATIENTS_QUERY_KEY,
    queryFn: () => getAllOfficePatients(id),
  });

export const useOneOfficePatients = (id: string, officeId: string) =>
  useQuery({
    queryKey: ONE_OFFICES_PATIENTS_QUERY_KEY(id),
    queryFn: () => getOneOfficePatients(id, officeId),
  });
