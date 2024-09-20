import { useQuery } from "@tanstack/react-query";
import { getMyAllSpecialities } from "./requests";

/**
 * Tag for the query to fetch all functions.
 */
const ALL_SPECIALITYM_QUERY_KEY = ["all-speciality-my"];

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useMyAllSpecialities = () =>
  useQuery({
    queryKey: ALL_SPECIALITYM_QUERY_KEY,
    queryFn: () => getMyAllSpecialities(),
  });
