export const DATA_BODY_KEY = "data";

export type AllUsersQueryResponse = {
  [DATA_BODY_KEY]: Array<{
    id: string;
    firstName: string;
    lastName: string;
    profilePicturePath: string | null;
    specialities: string[];
  }>;
};

export type AllOfficeUsersQueryResponse = {
  [DATA_BODY_KEY]: {
    admin: Array<{
      id: string;
      deletedAt: string | null;
      role: string;
      isPrimaryDoctor: boolean;
      speciality: string | null;
      office: {
        id: string;
        name: string;
        email: string;
        location: string;
      };
      user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string | null;
        phoneNumber: string | null;
        phonePrefix: string | null;
        username: string;
        verified: boolean;
        profilePicture: string | null;
      };
    }>;
    manager: Array<{
      id: string;
      deletedAt: string | null;
      role: string;
      isPrimaryDoctor: boolean;
      speciality: string | null;
      office: {
        id: string;
        name: string;
        email: string;
        location: string;
      };
      user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string | null;
        phoneNumber: string | null;
        phonePrefix: string | null;
        username: string;
        verified: boolean;
        profilePicture: string | null;
      };
    }>;
    receptionist: Array<{
      id: string;
      deletedAt: string | null;
      role: string;
      isPrimaryDoctor: boolean;
      speciality: string | null;
      office: {
        id: string;
        name: string;
        email: string;
        location: string;
      };
      user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string | null;
        phoneNumber: string | null;
        phonePrefix: string | null;
        username: string;
        verified: boolean;
        profilePicture: string | null;
      };
    }>;
    doctor: Array<{
      id: string;
      deletedAt: string | null;
      role: string;
      isPrimaryDoctor: boolean;
      speciality: string | null;
      office: {
        id: string;
        name: string;
        email: string;
        location: string;
      };
      user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string | null;
        phoneNumber: string | null;
        phonePrefix: string | null;
        username: string;
        verified: boolean;
        profilePicture: string | null;
      };
    }>;
    technician: Array<{
      id: string;
      deletedAt: string | null;
      role: string;
      isPrimaryDoctor: boolean;
      speciality: string | null;
      office: {
        id: string;
        name: string;
        email: string;
        location: string;
      };
      user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string | null;
        phoneNumber: string | null;
        phonePrefix: string | null;
        username: string;
        verified: boolean;
        profilePicture: string | null;
      };
    }>;
  };
};

export type ForgetPasswordRequestBody = {
  email: String;
};

export type ResetPasswordRequestBody = {
  password: string;
  confirmPassword: string;
  token: string;
};

export type CreateUsernameResponse = {
  body: string;
  additionnalData: string;
};

export type CreateUserRequestBody = {
  email: string;
  password: string;
  confirmPassword: string;
  officeName: string;
  officePhonePrefix: string;
  // officeLocation: string;
  officePhoneNumber: string;
  officeEmail: string;
  typeOffice: string | null;
};

export type CreateOfficeUserRequestBody = {
  username: string;
  email?: string | null;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  speciality?: string | null;
};

export type LoginOtpRequestBody = {
  email: string;
  password: string;
};

export type UpdateOfficeUserRequestBody = {
  username: string;
  email?: string | null;
  firstName: string;
  lastName: string;
  speciality?: string | null;
};

export type CreateUserQueryResponse = {
  [DATA_BODY_KEY]: {
    email: string;
    confirmPassword: string;
    officeName: string;
    officeLocation: string;
    officePhoneNumber: string;
    officeEmail: string;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    username: string | null;
    profilePictur: string | null;
    id: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    verified: boolean;
  };
};

export type CreateOfficeUserQueryResponse = {
  [DATA_BODY_KEY]: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    phoneNumber: string | null;
    phonePrefix: string | null;
    officeName: string | null;
    officeLocation: string | null;
    officePhoneNumber: string | null;
    officePhonePrefix: string | null;
    officeEmail: string | null;
    profilePicture: string | null;
    id: string;
    deleted: false;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    verified: boolean;
  };
};

export type UpdateOfficeUserQueryResponse = {
  [DATA_BODY_KEY]: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    phoneNumber: string | null;
    phonePrefix: string | null;
    officeName: string | null;
    officeLocation: string | null;
    officePhoneNumber: string | null;
    officePhonePrefix: string | null;
    officeEmail: string | null;
    profilePicture: string | null;
    id: string;
    deleted: false;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    verified: boolean;
  };
};

export type UserConnectedProfileQueryResponse = {
  data: {
    id: string;
    role: string;
    speciality: {
      id: string;
      title: string;
    } | null;
    office: {
      id: string;
      name: string;
    };
    user: {
      id: string;
      firstName: string | undefined;
      lastName: string | undefined;
      email: string;
      phoneNumber: string | undefined;
      phonePrefix: string | undefined;
      username: string | undefined;
      officeName: string;
      officeLocation: string;
      officePhoneNumber: string;
      officeEmail: string;
      step: string | undefined;
      profilePicture:
        | {
            id: string;
            label: string;
            path: string;
          }
        | undefined;
      typeOffice: {
        id: string;
        label: string;
      };
    };
  };
};

export type UserConnectedQueryResponse = {
  data: {
    id: string;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string;
    isDoctor: boolean;
    phoneNumber: string | undefined;
    phonePrefix: string | undefined;
    username: string | undefined;
    officeName: string;
    officeLocation: string;
    officePhoneNumber: string;
    officeEmail: string;
    officePhonePrefix: string;
    profilePicture:
      | {
          id: string;
          label: string;
          path: string;
        }
      | undefined;
    typeOffice: {
      id: string;
      label: string;
    };
  };
};

export type UpdateUserPersonnalInformationRequestBody = Partial<{
  profilePicture: any;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phonePrefix: string;
}>;

export type UpdateUserPersonnalInformationWithoutPictureRequestBody = Partial<{
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phonePrefix: string;
}>;

export type UpdateUserPersonnalInformationQueryResponse = {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    phonePrefix: string;
    username: string;
    officeName: string;
    officeLocation: string;
    officePhoneNumber: string;
    officeEmail: string;
    profilePicture: string;
    typeOffice: {
      id: string;
      label: string;
    };
  };
};

export type ChoosePrimaryDoctorRequestBody = {
  idOffice: string;
  idUser: string;
};

export type UpdateUserStepRequestBody = {
  step: string;
};

export type ResetConnectedUserPasswordRequestBody = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};
