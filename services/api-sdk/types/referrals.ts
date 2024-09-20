import { Dispatch, SetStateAction } from "react";

export type AllDoctorsCanReferred = {
  id: string | null;
  status: string;
  speciality: string | null;
  officeId: string | null;
  officeName: string | null;
  officeLogo: string | null;
  typeOfficeId: string | null;
  typeOfficeLabel: string;
  doctorId: string | null;
  doctorFullName: string | null;
  doctorProfilePicture: string | null;
};

export type SendInviteToNewSpecialistOfficeArgs = {
  officeName: string;
  officePrimaryDoctorFirstName: string;
  officePrimaryDoctorLastName: string;
  officeEmail: string;
  officePhonePrefix: string;
  officePhone: string;
};

export type VerifyPatientNumberArgs = {
  to: string;
};

export type VerifyNumberByPatientArgs = {
  to: string;
  preferredDoctor: string;
  referredBy: string;
  userId : string;
};

export type NewInvitation = {
  id: string;
  officeName: string;
  officePrimaryDoctorFirstName: string;
  officePrimaryDoctorLastName: string;
  officeEmail: string;
  officePhonePrefix: string;
  officePhone: string;
};

export interface InvitationContext {
  invite: string;
  setInvite: (value: string) => void;
}

export type CreateReferralArgs = Partial<{
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  parentName: string;
  parentPhoneNumber: string;
  parentEmail: string;
  insuranceNetwork: string;
  insurance: string;
  subscriberName: string;
  subscriberDOB: string;
  ssnmembership: string;
  notes: string;
  status: string;
  procedure: any;
  categories: any;
  teeth: string;
  officeName: string;
  officePrimaryDoctorFirstName: string;
  officePrimaryDoctorLastName: string;
  officeEmail: string;
  officePhonePrefix: string;
  officePhone: string;
  referringFrom: string;
  referredTo: string;
  referralDoctor: string;
  preferredDoctor: string;
  additionalFiles: any;
  xray: any;
  haveInvitation: boolean;
  prescriptionFile: any;
  dueDate: string;
}>;

export type SendSmsToPatientArgs = {
  to: string;
  message:string;
};

export type SmsData = {
  preferredDoctorId: string;
  preferredDoctorOfficeId: string;
  patientNumber: string;
  referredDoctor: string |null;
  referredDoctorId: string | null;
}