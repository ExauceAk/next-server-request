import { useQuery } from "@tanstack/react-query";
import { getAllTimezoneByCountry, getCallingCodeByCountry } from "./requests";

/**
 * Tag for the query to fetch all timezone by country.
 */
const ALL_TIMEZONE_BY_COUNTRY_QUERY_KEY = ["TIMEZONE", "ALLTIMEZONE"];

const CALLING_CODE_BY_COUNTRY_QUERY_KEY = ["CALLING_CODE"];

export const useAllTimezonesByCountry = (id: string) =>
  useQuery({
    queryKey: ALL_TIMEZONE_BY_COUNTRY_QUERY_KEY,
    queryFn: () => getAllTimezoneByCountry(id),
  });

export const useCallingCodeByCountry = (id: string) =>
  useQuery({
    queryKey: CALLING_CODE_BY_COUNTRY_QUERY_KEY,
    queryFn: () => getCallingCodeByCountry(id),
  });
