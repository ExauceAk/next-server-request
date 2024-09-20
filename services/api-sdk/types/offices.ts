
export type Office = {
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

export type CreateOfficeArgs = {
  logo: any;
  location: string;
  name: string;
  email: string;
  phoneNumber: string;
  speciality: string | null;
  licenceNumber: string;
  phonePrefix: string;
  timezone: string;
  videoLink: string;
  website: string;
  typeOffice: string;
  state : string;
  city : string;
  zipCode : string;
};

export type CreateOfficeWithoutLogoArgs = {
  location: string;
  name: string;
  email: string;
  phoneNumber: string;
  speciality: string | null;
  licenceNumber: string;
  phonePrefix: string;
  timezone: string;
  videoLink: string;
  website: string;
  typeOffice: string;
  state : string;
  city : string;
  zipCode : string;
};

export type UpdateOfficeArgs = {
  logo: any;
  location: string;
  name: string;
  email: string;
  phoneNumber: string;
  speciality: string | null;
  licenceNumber: string;
  phonePrefix: string;
  timezone: string;
  videoLink: string;
  website: string;
  typeOffice: string;
  state : string;
  city : string;
  zipCode : string;
};

export type UpdateOfficeWithoutLogoArgs = {
  location: string;
  name: string;
  email: string;
  phoneNumber: string;
  speciality: string | null;
  licenceNumber: string;
  phonePrefix: string;
  timezone: string;
  videoLink: string;
  website: string;
  typeOffice: string;
  state : string;
  city : string;
  zipCode : string;
};

export type FirstOfficeForUserConnected = {
  id: string;
  location: string;
  name: string;
  email: string;
  phoneNumber: string;
  specialityId: string | undefined;
  specialityName: string | undefined;
  licenceNumber: string | undefined;
  phonePrefix: string;
  timezone: string;
  videoLink: string;
  website: string;
  typeOffice: any;
  logo: string | undefined;
  state : string;
  city : string;
  zipCode : string;
};

export type OfficesForUserConnected = {
  id: string;
  name: string;
  address : string;
  speciality: string;
  manager: string;
  doctorsNumber: string;
  receptionistsNumber: string;
  image: string | null;
  typeOffice: string;
};

export type OneOffice = {
  id: string;
  location: string;
  name: string;
  email: string;
  phoneNumber: string;
  specialityId: string | undefined;
  specialityName: string | undefined;
  licenceNumber: string | undefined;
  phonePrefix: string;
  timezone: string;
  videoLink: string;
  website: string;
  typeOffice: any;
  logo: string | undefined;
  zipCode: string,
  city: string,
  state: string,
};

export type CheckOfficeAddressExistArgs = Partial<{
  location: string;
  id : string;
}>;

export type CheckOfficeAddressExistResponse = {
  exist: boolean;
  message: string;
};
