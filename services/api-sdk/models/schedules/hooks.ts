import { useQuery } from "@tanstack/react-query";
import { getScheduleEvents } from "./requests";
import { CaseStatus } from "./contracts";


/**
 * Tag for the query to fetch all functions.
 */
const ALL_SCHEDULE_EVENTS_QUERY_KEY = (id: string, start?: Date, end?: Date, status?: CaseStatus) => [
  "all-schedule-events", id, start, end, status
];


/**
 * Hook to fetch all schedule events..
 * @returns The query state.
 */
export const useAllScheduleEvents = (id: string, start?: Date, end?: Date, status?: CaseStatus) =>
  useQuery({  
    queryKey: ALL_SCHEDULE_EVENTS_QUERY_KEY(id, start, end, status),
    queryFn: () => {
      console.log(start, end, status)
      return getScheduleEvents(id, start, end, status);
    }
  });
