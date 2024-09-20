export type Event = {
  id: string;
  title: string;
  description: string;
};

export type EventFunc = {
  id: string;
  title: string;
  description: string;
  functions: Array<{
    id: string;
    title: string;
  }>;
};

export type CreateEventArgs = {
  title: string;
  description: string;
  functionEvents: Array<{
    id: string;
    title: string;
  }>;
};

export type UpdateEventArgs = {
  title: string;
  description: string;
  functionEvents: Array<{
    id: string;
    title: string;
  }>;
};
