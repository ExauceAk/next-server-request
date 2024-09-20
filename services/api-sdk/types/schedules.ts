import { CaseStatus } from "../models/schedules/contracts";

export type ScheduleEvents = {
  event_id: string;
  title: string;
  start: any;
  end: any;
  procedure: string[];
  scheduledBy: string;
  patient: {
    id: string;
    name: string;
    image: string | null;
  };
  office: {
    id: string;
    name: string;
    type_office: string;
  };
  status: CaseStatus
  doctor: {
    name: string;
    image: string | null;
  };
};