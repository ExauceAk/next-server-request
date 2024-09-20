export const DATA_BODY_KEY = "data";

export type CreateOfficeQueryResponse = {
  data: {
    location: string;
    name: string;
    email: string;
    phoneNumber: string;
    licenceNumber: string;
    phonePrefix: string;
    timezone: string;
    videoLink: string;
    website: string;
  };
};

export type CreateOfficeRequestBody = {
  logo: string | undefined;
  location: string;
  name: string;
  email: string;
  phoneNumber: string;
  licenceNumber: string;
  phonePrefix: string;
  timezone: string;
  videoLink: string;
  website: string;
  typeOffice: string;
};

export type UpdateOfficeQueryResponse = {
  data: {
    location: string;
    name: string;
    email: string;
    phoneNumber: string;
    licenceNumber: string;
    phonePrefix: string;
    timezone: string;
    videoLink: string;
    website: string;
  };
};

export type UpdateOfficeRequestBody = {
  logo: string | undefined;
  location: string;
  name: string;
  email: string;
  phoneNumber: string;
  licenceNumber: string;
  phonePrefix: string;
  timezone: string;
  videoLink: string;
  website: string;
  typeOffice: string;
};

export type FirstOfficeForUserConnectedQueryResponse = {
  data: {
    id: string;
    location: string;
    name: string;
    email: string;
    state : string;
    city : string;
    zipCode : string;
    phoneNumber: string;
    licenceNumber: string | undefined;
    phonePrefix: string;
    timezone: string;
    videoLink: string;
    website: string;
    typeOffice: string;
    logo:
      | {
          id: string;
          label: string;
          path: string;
        }
      | undefined;
    speciality:
      | {
          id: string;
          title: string;
        }
      | undefined;
  };
};

export type AllOfficeForUserConnectedQueryResponse = {
  data: Array<{
    office: {
      id: string;
      name: string;
      email: string;
      location :string | null;
      logo: {
        id: string;
        label: string;
        path: string | null;
      };
      typeOffice: {
        id: string;
        label: string;
        title: string;
      };
      userId: null | string;
      speciality: null | string;
    };
    doctorsNumber: number;
    receptionistsNumber: number;
    manager: [
      {
        id: string;
        user: {
          id: string;
          firstName: string;
          lastName: string;
          username: string;
        };
      },
    ];
  }>;
};

export type OneOfficeQueryResponse = {
  data: {
    id: string;
    location: string;
    name: string;
    email: string;
    phoneNumber: string;
    licenceNumber: string | undefined;
    phonePrefix: string;
    timezone: string;
    videoLink: string;
    website: string;
    zipCode: string,
    city: string,
    state: string,
    typeOffice: string;
    logo:
      | {
      id: string;
      label: string;
      path: string;
    }
      | undefined;
    speciality:
      | {
      id: string;
      title: string;
    }
      | undefined;
  };
};

export type CheckOfficeAddressExistRequestBody = {
  location: string;
}

export type CheckOfficeAddressExistQueryResponse = {
  data: {
    exist: boolean,
    message: string
  }
};

