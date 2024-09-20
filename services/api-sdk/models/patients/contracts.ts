export const DATA_BODY_KEY = "data";

export type OfficePatientsQueryResponse = {
  [DATA_BODY_KEY]: Array<{
    patient: {
      id: string;
      lastName: string;
      firstName: string;
      email: string | null;
      birthDate: string;
      phoneNumber: string | null;
      parentName: string;
      parentEmail: string | null;
    };
    caseCount: number;
  }>;
};

export type OfficeOnePatientsQueryResponse = {
  [DATA_BODY_KEY]: {
    patient: {
      id: string;
      lastName: string;
      firstName: string;
      email: string;
      birthDate: string;
      phoneNumber: string;
      parentName: string;
      parentPhoneNumber: string;
      parentEmail: string;
      insuranceNetwork: string;
      insuranceNumber: string | null;
      subscriberName: string;
      subscriberDOB: string;
      ssnmembership: string;
      cases: [
        {
          id: string;
          createdAt: string;
          updatedAt: string;
          label: string;
          notes: string;
          status: string;
          referringOfficeStatus: string;
          teeth: string | null;
          rejectedReason: string | null;
          referral: {
            id: string;
            status: string;
            case: {
              id: string;
              deleted: false;
              createdAt: string;
              updatedAt: string;
              deletedAt: string | null;
              label: string;
              notes: string;
              status: string;
              teeth: string | null;
              rejectedReason: string | null;
            };
            referringFrom: {
              id: string;
              name: string;
              email: string;
              location: string;
              phoneNumber: string;
              phonePrefix: string;
            };
            referredTo: {
              id: string;
              name: string;
              email: string;
              location: string;
              phoneNumber: string;
              phonePrefix: string;
            };
            referralDoctor: {
              id: string;
              role: string;
              isPrimaryDoctor: boolean;
              speciality: string | null;
              status: string;
              reason: string | null;
              backDate: string | null;
              isTechnicianOwner: boolean;
            };
            preferredDoctor: {
              id: string;
              role: string;
              isPrimaryDoctor: boolean;
              speciality: string | null;
              status: string;
              reason: string | null;
              backDate: string | null;
              isTechnicianOwner: boolean;
            };
          };
          chatroom : {
            id: string,
            name: string
          } | null;
        },
      ];
      picture: null;
      doctor: null;
    };
    caseCount: 1;
  };
};
