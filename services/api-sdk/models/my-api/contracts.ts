export const DATA_BODY_KEY = "data";

export type AllMySpecialitiesQueryResponse = Array<{
  id: string;
  officeName: string;
  officeImage: string;
  patient: string;
  completedCase: string;
  speciality: string;
  status: string;
}>;
