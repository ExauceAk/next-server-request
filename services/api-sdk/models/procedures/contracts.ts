export const DATA_BODY_KEY = "data";

export type CreateProcedureQueryResponse = {
  label: string;
  description: string;
  fee: string;
  idOffice: string;
  videoDescription: string;
};

export type UpdateProcedureQueryResponse = {
  label?: string;
  description?: string;
  fee?: string;
  idOffice?: string;
  videoDescription?: string;
};

export type AddDefaultProcedureQueryResponse = {
  idOffice: string;
  idGlobalProcedures: string[];
};

export type RemoveProcedureQueryResponse = {
  id: string;
};
