"use server"

import { getToken } from "@/utils/user-token";
import { FetchService } from "../../lib/utils/fetch";
import { ScheduleEvents } from "../../types/schedules";
import { AllScheduleEventsQueryResponse, CaseStatus, DATA_BODY_KEY } from "./contracts";
import { ApiError } from "../../errors";
import { paramsBuilder } from "@/lib/paramsBuilder";

/**
 * Fetch service instance
 * @type {FetchService}
 */
const fetchService: FetchService = new FetchService({
  requestInterceptor: async (config) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${await getToken()}`,
    },
  }),
});

export const getScheduleEvents = async (id: string, startDate?: Date, endDate?: Date, status?: CaseStatus): Promise<ScheduleEvents[]> => {
  const params = paramsBuilder({ start: startDate, end: endDate, status });
  const response = await fetchService.get(`/schedule/all/${id}?${params}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllScheduleEventsQueryResponse =
      await response.json();
    return data.map((item) => {
      try {
        return {
          event_id: item.eventId,
          title: item.title,
          start: new Date(new Date(item.startTime).toString()),
          end: new Date(new Date(item.endTime).toString()),
          procedure: item.procedure,
          scheduledBy: item.scheduledBy,
          patient: {
            id: item.patient.id,
            name: item.patient.name,
            image: item.patient.image || null,
          },
          office: {
            id: item.office.id,
            name: item.office.name,
            type_office: item.office.type_office,
          },
          status: item.status,
          doctor: {
            name: item.doctor.name,
            image: item.doctor.image || null,
          },
        } satisfies ScheduleEvents;
      } catch (e) {
        throw new ApiError("Failed to fetch all schedule events");
      }
    });
  }

  throw new ApiError("Failed to fetch all schedule events");


};

