"use client";

import {
  getAllLabOfficePreferredTechnicians,
  getAllOfficeLab,
  getOneLabOffices,
  getOneTechnicianDetails,
} from "@/services/api-sdk/models/labs/requests";
import { useQuery } from "@tanstack/react-query";

/**
 * Tag for the query to fetch all functions.
 */
const ALL_LAB_OFFICES_PREFERRED_TECHNICIANS_QUERY_KEY = [
  "all-lab-offices-preferred-technicians",
];

const ALL_OFFICES_LAB_QUERY_KEY = ["all-offices-lab"];

const LAB_TECHNICIAN_DETAILS_QUERY_KEY = ["lab-technician-details"];

const ONE_LAB_OFFICES_QUERY_KEY = (id: string) => ["one-offices-lab", id];

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useAlllOfficePreferredTechnicians = (id: string) =>
  useQuery({
    queryKey: ALL_LAB_OFFICES_PREFERRED_TECHNICIANS_QUERY_KEY,
    queryFn: () => getAllLabOfficePreferredTechnicians(id),
  });

export const useAllOfficeLab = (id: string) =>
  useQuery({
    queryKey: ALL_OFFICES_LAB_QUERY_KEY,
    queryFn: () => getAllOfficeLab(id),
  });

export const useLabTechnicianDetails = (id: string) =>
  useQuery({
    queryKey: LAB_TECHNICIAN_DETAILS_QUERY_KEY,
    queryFn: () => getOneTechnicianDetails(id),
  });

export const useOneOfficeLab = (id: string) =>
  useQuery({
    queryKey: ONE_LAB_OFFICES_QUERY_KEY(id),
    queryFn: () => getOneLabOffices(id),
  });
