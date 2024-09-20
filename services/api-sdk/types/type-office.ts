export type TypeOffice = {
  id: string;
  title: string;
  label: string;
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
