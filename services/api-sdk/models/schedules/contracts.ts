export const DATA_BODY_KEY = "data";

export enum CaseStatus {
  NEW = "new",
	LOST = "lost",
	COMPLETED = "completed",
	IN_QUEUE = "in-queue",
  TO_BE_RESCHEDULED = "to-be-rescheduled",
	SCHEDULED = "scheduled",
  AWAITING_APPROVAL = "awaiting-approval",
  APPROVED = "approved",
  REJECTED = "rejected",
  OVERDUE = "overdue",
  CANCELED = "canceled",


}

export type AllScheduleEventsQueryResponse = {
  [DATA_BODY_KEY]: Array<{
    eventId: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    procedure: string[];
    scheduledBy: string;
    patient: {
      id: string;
      name: string;
      image: string | null;
    };
    status: CaseStatus;
    office: {
      id: string;
      name: string;
      type_office: string;
    };
    doctor: {
      name: string;
      image: string |null;
    };
  }>;
};
