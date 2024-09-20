export const DATA_BODY_KEY = "data";

export type AllDoctorsCanReferredQueryResponse = {
  [DATA_BODY_KEY]: Array<{
    id: string | null;
    status: string;
    office: {
      id: string | null;
      name: string | null;
      logo: {
        id: string;
        path: string;
      } | null;
      typeOffice: {
        id: string | null;
        label: string;
      };
    } | null;
    user: {
      id: string | null;
      firstName: string | null;
      lastName: string | null;
      profilePicture: {
        id: string;
        path: string;
      } | null;
    };
    speciality: {
      id: string,
      "title": string
    } | null;
  }>;
};

export type SendInviteToNewSpecialistOfficeRequestBody = {
  officeName: string;
  officePrimaryDoctorFirstName: string;
  officePrimaryDoctorLastName: string;
  officeEmail: string;
  officePhonePrefix: string;
  officePhone: string;
};

export type VerifyPatientNumberRequestBody = {
  to: string;
};

export type VerifyNumberByPatientRequestBody = {
  to: string;
  preferredDoctor: string;
  referredBy: string;
  userId : string;
};

export type NewInvitationQueryResponse = {
  [DATA_BODY_KEY]: {
    id: string;
    officeName: string;
    officePrimaryDoctorFirstName: string;
    officePrimaryDoctorLastName: string;
    officeEmail: string;
    officePhonePrefix: string;
    officePhone: string;
  };
};

export type SendSmsToPatientRequestBody = {
  to: string;
  message: string;
};
