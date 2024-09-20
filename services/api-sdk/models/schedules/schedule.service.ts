
import axiosInstance from "@/utils/axios-instance";
import { useQuery } from "@tanstack/react-query";

const UPCOMINGEVENTS = (id: string) => [
  "upcoming-events",
  id,
];



  export const useGetUpcomingEvents = (officeId: string, ) => 
    useQuery({  
      queryKey: UPCOMINGEVENTS(officeId),
      queryFn: () => axiosInstance()!.get(`/schedule/upcoming-schedule/${officeId}`),
    });