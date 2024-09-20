import {
  getAllSpecialities,
  getOneSpecialistOffices,
} from "@/services/api-sdk/models/speciality/requests";
import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Tag for the query to fetch all functions.
 */
const ALL_SPECIALITY_QUERY_KEY = ["all-speciality"];

const ONE_SPECIALITY_OFFICES_QUERY_KEY = (id: string) => [
  "one-offices-Specialist",
  id,
];
/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useAllSpecialities = () =>
  useQuery({
    queryKey: ALL_SPECIALITY_QUERY_KEY,
    queryFn: () => getAllSpecialities(),
  });

export const useOneOfficeSpecialist = (id: string) =>
  useQuery({
    queryKey: ONE_SPECIALITY_OFFICES_QUERY_KEY(id),
    queryFn: () => getOneSpecialistOffices(id),
  });

export const useOneOfficeSpecialistInvalidate = () => {
  const queryClient = useQueryClient();
  return (id: string) =>
    queryClient.invalidateQueries({
      queryKey: ONE_SPECIALITY_OFFICES_QUERY_KEY(id),
    });
};
