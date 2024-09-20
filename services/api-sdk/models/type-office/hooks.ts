"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getOneEvent } from "@/services/api-sdk/models/events/requests";
import { getAllTypeOffice } from "./requests";

/**
 * Tag for the query to fetch all events.
 */
const ALL_TYPEOFFICE_QUERY_KEY = ["TYPEOFFICE", "ALL_TYPEOFFICES"];

/**
 * Tag for the query to fetch a single event.
 * @param id - The id of the event to fetch.
 * @returns The query tag.
 */
const getOneTypeOfficeQueryKey = (id: string) => [
  "TYPEOFFICE",
  "ONE_TYPEOFFICE",
  id,
];

/**
 * Tag for the mutation to delet an event.
 * @param id - The id of the event to delet.
 * @returns The mutation tag.
 */
export const getDeleteTypeOfficeMutationKey = (id: string) => [
  "TYPEOFFICE",
  "DELETE_TYPEOFFICE",
  id,
];

/**
 * Hook to fetch all events.
 * @returns The query state and the query function
 */

export const useAllTypeOffices = () =>
  useQuery({
    queryKey: ALL_TYPEOFFICE_QUERY_KEY,
    queryFn: () => getAllTypeOffice(),
  });
/**
 * Hook to invalidate the all events query.
 * @returns The invalidation function
 */
export const useAllTypeOfficesInvalidate = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: ALL_TYPEOFFICE_QUERY_KEY });
};

/**
 * Hook to invalidate a single event query.
 * @param id - The id of the event to invalidate.
 * @returns The invalidation function
 */
export const useOneTypeOfficeInvalidate = () => {
  const queryClient = useQueryClient();
  return (id: string) =>
    queryClient.invalidateQueries({ queryKey: getOneTypeOfficeQueryKey(id) });
};

export const useRemoveOneTypeOfficesQuery = () => {
  const queryClient = useQueryClient();
  return (id: string) =>
    queryClient.removeQueries({
      queryKey: getOneTypeOfficeQueryKey(id),
    });
};

// /**
//  * Hook to fetch a single event.
//  * @param id - The id of the event to fetch.
//  * @returns The query state and the query function
//  */
// export const useOneTypeOffices = (id?: string) =>
//   useQuery({
//     queryKey: id ? getOneTypeOfficeQueryKey(id) : [],
//     queryFn: id ? () => getOneEvent(id) : undefined,
//     enabled: !!id,
//   });
