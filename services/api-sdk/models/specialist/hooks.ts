import { useQuery } from "@tanstack/react-query";
import {
  getAllOfficeSpecialist,
  getAllOfficeSpecialistPreferredDoctors,
  getOneSpecialistDetails,
} from "./requests";

/**
 * Tag for the query to fetch all functions.
 */
const ALL_OFFICES_SPECIALIST_QUERY_KEY = ["all-offices-specialists"];

const ALL_SPECIALIST_DOCTOR_OFFICES_PREFERRED_TECHNICIANS_QUERY_KEY = [
  "all-specialists-offices-preferred-doctors",
];

const SPECIALIST_DOCTOR_DETAILS_QUERY_KEY = ["specialist-doctor-details"];

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useAllOfficeSpecialist = (id: string) =>
  useQuery({
    queryKey: ALL_OFFICES_SPECIALIST_QUERY_KEY,
    queryFn: () => getAllOfficeSpecialist(id),
  });

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useAllSpecialistsOfficePreferredDoctors = (id: string) =>
  useQuery({
    queryKey: ALL_SPECIALIST_DOCTOR_OFFICES_PREFERRED_TECHNICIANS_QUERY_KEY,
    queryFn: () => getAllOfficeSpecialistPreferredDoctors(id),
  });

export const useSpecialistDoctorDetails = (id: string) =>
  useQuery({
    queryKey: SPECIALIST_DOCTOR_DETAILS_QUERY_KEY,
    queryFn: () => getOneSpecialistDetails(id),
  });
