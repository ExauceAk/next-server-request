export const DATA_BODY_KEY = "data";

export type AllSpecialitiesQueryResponse = {
  data: Array<{
    id: string;
    title: string;
  }>;
};

export type SpecialitieOfficeDetailQueryResponse = {
  data: {
    office: {
      id: string;
      name: string;
      email: string;
      location: string;
      phoneNumber: string;
      phonePrefix: string;
      parentOffice: null | string;
      licenceNumber: string;
      status: string;
      website: string | null;
      timezone: string | null;
      logo: {
        id: string;
        label: string;
        path: string;
        size: number;
        type: string;
      };
      typeOffice: {
        id: string;
        label: string;
      };
      speciality: {
        id: string;
        title: string;
      };
    };
    referredCase: [
      {
        id: string;
        status: string;
        createdAt: string;
        case: {
          id: string;
          label: string;
          notes: string;
          status: string;
          teeth: string;
          referringOfficeStatus: string;
          rejectedReason: null | string;
          patient: {
            id: string;
            lastName: string;
            firstName: string;
            email: string;
            birthDate: string;
          };
        };
        referringFrom : {
          id: string;
          name: string;
        };
        referredTo : {
          id: string;
          name: string;
        };
        referralDoctor: {
          id: string;
          role: string;
          speciality: string;
          user: {
            id: string;
            firstName: string;
            lastName: string;
            username: string;
          };
        };
      },
    ];
    referredOfficeStaff: {
      admin: [
        {
          id: string;
          role: string;
          isPrimaryDoctor: boolean;
          speciality: {
            id: string;
            title: string;
          };
          isTechnicianOwner: boolean;
          user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            phonePrefix: string;
            profilePicture: null | string;
          };
        },
      ];
      manager: [
        {
          id: string;
          role: string;
          isPrimaryDoctor: boolean;
          speciality: null | string;
          isTechnicianOwner: boolean;

          user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            phonePrefix: string;
            profilePicture: null | string;
          };
        },
      ];
      receptionist: [
        {
          id: string;
          role: string;
          isPrimaryDoctor: boolean;
          speciality: null | string;
          isTechnicianOwner: boolean;
          user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            phonePrefix: string;
            profilePicture: null | string;
          };
        },
      ];
      doctor: [
        {
          id: string;
          role: string;
          isPrimaryDoctor: boolean;
          speciality: null | string;
          isTechnicianOwner: boolean;

          user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            phonePrefix: string;
            profilePicture: null | string;
          };
        },
      ];
      technician: [
        {
          id: string;
          role: string;
          isPrimaryDoctor: boolean;
          speciality: null | string;
          isTechnicianOwner: boolean;

          user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            phonePrefix: string;
            profilePicture: null | string;
          };
        },
      ];
    };
    caseCount: number;
    inQueue: number;
    approved: number;
    scheduled: number;
    completed: number;
    lost: number;
    overdue: number;
  };
};
