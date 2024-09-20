export const DATA_BODY_KEY = "body";

export type AllTypeOfficesQueryResponse = {
  statusCode: string;
  data: Array<{
    id: string;
    title: string;
    label: string;
  }>;
};

export type CreateEventRequestBody = {
  title: string;
  description: string;
  functionID: string[];
};

export type CreateEventResponse = {
  eventsID: string;
  title: string;
};

export type UpdateEventRequestBody = Partial<{
  title: string;
  description: string;
  functionID: string[];
}>;

export type UpdateEventResponse = {
  eventsID: string;
  title: string;
};
