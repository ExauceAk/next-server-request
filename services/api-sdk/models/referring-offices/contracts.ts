export const DATA_BODY_KEY = "data";

export type AllReferringOfficeQueryResponse = {
  [DATA_BODY_KEY]: Array<{
    office: {
      id: string;
      name: string;
      email: string;
      status: string;
      logo: string;
      typeOffice: {
        id: string;
        label: string;
        title: string;
        logo: string;
      };
      userId: string;
      speciality: string;
    };
    completedPercentage: number;
    totalCases: number;
    totalPatients: number;
  }>;
};

export type AllReferringOfficePreferredDoctorsQueryResponse = {
  data: Array<{
    doctor: {
      id: string;
      speciality: {
        id : string;
        title : string;
      } | null;
      office: {
        id: string;
        name: string;
      };
      user: {
        id: string;
        lastName: string;
        firstName: string;
        email: string;
      };
    };
    totalCases: number;
    completedPercentage: number;
  }>;
};

export type ReferringOfficeDetailsQueryResponse = {
  data: {
    doctor: {
      id: string;
      office: {
        id: string;
        name: string;
        logo: {
          id: string;
          path: string;
        } | null
      }
      user: {
        firstName:string;
        lastName: string;
        email: string;
        phoneNumber: string | null;
        profilePicture: {
          id: string;
          path: string;
        } | null;
      }
    }
    referredCase: Array<{
      id: string;
      case: {
        id: string;
        createdAt: string;
        status: string;
        patient: {
          id: string;
          firstName: string;
          lastName: string;
        }
      };
      referringFrom : {
        id: string;
        name: string;
      };
      referredTo : {
        id: string;
        name: string;
      };
    }>;
    caseCount: number,
    inQueue: number,
    referredBack: number,
    scheduled: number,
    completed: number,
    lost: number
  }
}
