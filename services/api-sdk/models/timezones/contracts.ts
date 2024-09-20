export const DATA_BODY_KEY = "data";

export type AllTimezonesQueryResponse = {
  [DATA_BODY_KEY]: Array<{
    name: string;
    utcOffsetStr: string;
  }>;
};

export type CallingCodeQueryResponse = {
  [DATA_BODY_KEY]: {
    callingCodes: string[]
  };

}
