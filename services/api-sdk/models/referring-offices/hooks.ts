import { useQuery } from "@tanstack/react-query";
import {
  getAllReferringOfficePreferredDoctors,
  getAllReferringOffices,
  getOneReferringOfficeDoctorDetails,
} from "./requests";

/**
 * Tag for the query to fetch all functions.
 */
const ALL_REFERRING_OFFICES_QUERY_KEY = (id: string) => [
  "all-referring-offices",
  id,
];

const ALL_REFERRING_OFFICES_DOCTOR_PREFERRED_QUERY_KEY = [
  "all-referring-offices-preferred-doctors",
];

const REFERRING_OFFICES_DOCTOR_DETAILS_QUERY_KEY = (id: string) => [
  "referring-offices-doctor-details",
  id,
];

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useAllReferringOffices = (id: string) =>
  useQuery({
    queryKey: ALL_REFERRING_OFFICES_QUERY_KEY(id),
    queryFn: () => getAllReferringOffices(id),
  });

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useAllReferringOfficePreferredDoctors = (id: string) =>
  useQuery({
    queryKey: ALL_REFERRING_OFFICES_DOCTOR_PREFERRED_QUERY_KEY,
    queryFn: () => getAllReferringOfficePreferredDoctors(id),
  });

export const useReferringOfficeDoctorDetails = (id: string) =>
  useQuery({
    queryKey: REFERRING_OFFICES_DOCTOR_DETAILS_QUERY_KEY(id),
    queryFn: () => getOneReferringOfficeDoctorDetails(id),
  });
