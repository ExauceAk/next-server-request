export const DATA_BODY_KEY = "data";

export type AllOfficeLabPreferredTechniciansQueryResponse = {
  data: Array<{
    doctor: {
      id: string;
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

export type AllOfficeLabQueryResponse = {
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

export type TechniciansDetailsQueryResponse = {
  data: {
    doctor: {
      id: string;
      office: {
        id: string;
        name: string;
        logo: {
          id: string;
          path: string;
        };
      };
      user: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        profilePicture: {
          id: string;
          path: string;
        } | null;
      };
    };
    referredCase: Array<{
      id: string;
      dueDate: string;
      case: {
        id: string;
        createdAt: string;
        status: string;
        referringOfficeStatus: string;
        rejectedReason : string;
        patient: {
          id: string;
          firstName: string;
          lastName: string;
        };
      };
    }>;
    caseCount: number;
    approved: number;
    overdue: number;
    completed: number;
  };
};

export type LabOfficeDetailQueryResponse = {
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
      logo: {
        id: string;
        label: string;
        path: string;
        size: number;
        type: string;
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
        dueDate: string;
        case: {
          id: string;
          label: string;
          notes: string;
          referringOfficeStatus: string;
          teeth: string;
          rejectedReason: string | null;
          patient: {
            id: string;
            lastName: string;
            firstName: string;
            email: string;
            birthDate: string;
          };
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
        preferredDoctor: {
          id: string;
          role: string;
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
