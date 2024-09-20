export type User = {
  email: string;
  officeName: string;
  officeLocation: string;
  officePhoneNumber: string;
  officeEmail: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  profilePictur?: string;
  id?: string;
  deleted: boolean;
  updatedAt?: string;
  deletedAt?: string;
  verified?: boolean;
};

export type AppUser = {
  id: string;
  firstName: string;
  lastName: string;
  profilePicturePath: string | null;
  specialities: string[];
};

export type OfficeUser = {
  id: string;
  username: string;
  email: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  speciality?: string | null;
};

export type CreateUserArgs = {
  email: string;
  password: string;
  confirmPassword: string;
  officeName: string;
  phonePrefix: string;
  // officeLocation: string;
  officePhoneNumber: string;
  officeEmail: string;
  typeOffice: string | null;
};

export type CreateOfficeUserArgs = {
  username: string;
  email?: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  speciality?: string | null;
};

export type LoginOtpArgs = {
  email: string;
  password: string;
};

export type UpdateOfficeUserArgs = {
  username: string;
  email?: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  speciality?: string;
};

export type Username = {
  fullname: string;
  username: string;
};

export type ForgetPasswordArgs = {
  email: string;
};
export type ResetPasswordArgs = {
  password: string;
  confirmPassword: string;
  token: string;
};
export type UserConnectedProfile = {
  id: string;
  userID: string;
  officeId: string;
  email: string;
  officeName: string;
  officeLocation: string;
  officePhoneNumber: string;
  officeEmail: string;
  firstName: string | undefined;
  lastName: string | undefined;
  phoneNumber: string | undefined;
  phonePrefix: string | undefined;
  username: string | undefined;
  profilePicture: string | undefined;
  typeOfficeId: string | undefined;
  officeLabel: string | undefined;
  step: string | undefined;
  role: string;
  speciality: string | undefined;
};

export type UserConnected = {
  id: string;
  email: string;
  officeName: string;
  isDoctor: string;
  officeLocation: string;
  officePhoneNumber: string;
  officeEmail: string;
  officePhonePrefix: string;
  firstName: string | undefined;
  lastName: string | undefined;
  phoneNumber: string | undefined;
  phonePrefix: string | undefined;
  username: string | undefined;
  profilePicture: string | undefined;
  typeOfficeId: string | undefined;
  officeLabel: string | undefined;
};

export type UpdateUserPersonnalInformationArgs = {
  profileImage: any;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phonePrefix: string;
  isDoctor: string;
  username: string;
};

export type UpdateUserPersonnalInformationWithoutPictureArgs = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phonePrefix: string;
  isDoctor: string;
  username: string;
};

export type ChoosePrimaryDoctorArgs = {
  idOffice: string;
  idUser: string;
};

export type UpdateUserStepArgs = {
  step: string;
};

export type ResetUserConnectedPasswordArgs = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};
