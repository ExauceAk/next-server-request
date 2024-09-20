import { CaseStatus } from "../schedules/contracts";

export const DATA_BODY_KEY = "data";

export type AllOfficeCasesQueryResponse = {
  [DATA_BODY_KEY]: Array<{
    id: string;
    status: string;
    case: {
      id: string;
      status: CaseStatus;
      referringOfficeStatus: string;
      rejectedReason: string | null;
      chatroom: {
        id: string;
        name: string;
      } | null;
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
      procedures: [
        {
          id: string;
          label: string;
          fee: number;
          videoDescription: string;
          description: string;
          office: {
            id: string;
          };
        },
      ];
    };
    referringFrom: {
      id: string;
      name: string;
      typeOffice: {
        id: string;
        label: string;
      };
    };
    referredTo: {
      id: string;
      name: string;
      typeOffice: {
        id: string;
        label: string;
      };
    };
  }>;
};

export type AllCasesOneChatQueryResponse = {
  [DATA_BODY_KEY]: Array<{
    id: string;
    label: string;
  }>;
};

export type OneCaseQueryResponse = {
  data: {
    id: string;
    status: string;
    case: {
      id: string;
      createdAt: string;
      label: string;
      notes: string;
      status: string;
      referringOfficeStatus: string;
      teeth: string;
      patient: {
        id: string;
        lastName: string;
        firstName: string;
        email: null | string;
        birthDate: string;
        phoneNumber: null | string;
        parentName: string;
        parentPhoneNumber: null | string;
        parentEmail: string;
        insuranceNetwork: null | string;
        insuranceNumber: null | string;
        subscriberName: null | string;
        subscriberDOB: null | string;
        ssnmembership: null | string;
        address: null | string;
        profession: null | string;
        picture: null | string;
      };
      procedures: [
        {
          id: string;
          label: string;
          fee: number;
          videoDescription: string;
          description: string;
          office: {
            id: string;
          };
        },
      ];
      xray: [
        {
          id: string;
          label: string;
          path: string;
          size: number;
          type: string;
        },
      ];
      chatroom: {
        id: string;
        name: string;
      } | null;
      additionnalFile: [
        {
          id: string;
          label: string;
          path: string;
          size: number;
          type: string;
        },
      ];
    };
    referringFrom: {
      id: string;
      name: string;
    };
    referredTo: {
      id: string;
      name: string;
    };
    referralDoctor: {
      id: string;
      role: string;
      isPrimaryDoctor: true;
      speciality: {
        id: string;
        title: string;
      } | null;
      office: {
        id: string;
        name: string;
        email: string;
        status: string;
        logo: null | string;
        typeOffice: {
          id: string;
          label: string;
          logo: null | string;
        };
        speciality: null | string;
      };
      user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        profilePicture: {
          id: string;
          label: string;
          path: string;
          size: number;
          type: string;
        };
      };
    };
    preferredDoctor: {
      id: string;
      role: string;
      isPrimaryDoctor: true;
      speciality: {
        id: string;
        title: string;
      } | null;
      office: {
        id: string;
        name: string;
        email: string;
        status: string;
        logo: null | string;
        typeOffice: {
          id: string;
          label: string;
          logo: null | string;
        };
        speciality: null | string;
      };
      user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        profilePicture: {
          id: string;
          label: string;
          path: string;
          size: number;
          type: string;
        };
      };
    };
  };
};

export type OneCaseTimelineQueryResponse = {
  data: Array<{
    id: string;
    title: string;
    referral: {
      createdAt: string;
      case: {
        patient: {
          firstName: string;
          lastName: string;
          picture: {
            path: string;
          } | null;
        };
      };
      referringFrom: {
        id: string;
        name: string;
        logo: {
          path: string;
        } | null;
        typeOffice: {
          id: string;
          label: string;
        };
      };
      referredTo: {
        id: string;
        name: string;
        logo: {
          path: string;
        } | null;
        typeOffice: {
          id: string;
          label: string;
        };
      };
      referralDoctor: {
        speciality: {
          id: string;
          title: string;
        } | null;
        user: {
          firstName: string;
          lastName: string;
          profilePicture: {
            path: string;
          } | null;
        };
      };
      preferredDoctor: {
        speciality: {
          id: string;
          title: string;
        } | null;
        user: {
          firstName: string;
          lastName: string;
          profilePicture: {
            path: string;
          } | null;
        };
      };
    };
  }>;
};

export interface UpdateCaseProcedureRequestBody {
  procedures: string[];
}

export type RejectReferralRequestBody = {
  reason: string;
};

export type ScheduleCaseRequestBody = {
  date: string;
  startTime: string;
  endTime: string;
};

export type CompleteAndAddProcedureARequestBody = {
  procedures: string[];
  date: string;
  startTime: string;
  endTime: string;
};
