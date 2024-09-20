import { CaseStatus } from "../models/schedules/contracts";

export type OfficeCases = {
  id: string;
  caseId: string;
  referBackStatus: string;
  patientFullName: string;
  patientEmail: string | null;
  patientBirthDate: string;
  patientPhoneNumber: string | null;
  patientParentName: string;
  referringFromId: string;
  referringFromName: string;
  referringFromOffice: string;
  referringToId: string;
  referringToName: string;
  referringToOffice: string;
  status: CaseStatus;
  referringOfficeStatus: string;
  rejectedReason: string | null;
  chatroomId: string | null;
  chatroomName: string | null;
  procedures: Array<{
    id: string;
    name: string;
    officeId: string;
    fee: number;
  }>;
};

export type CasesOneChat = {
  id: string;
  label: string;
};

export type OneCase = {
  id: string;
  birth: string;
  status: string;
  insurance: string;
  parent: string | null;
  phone: string | null;
  email: string | null;
  note: string;
  chatroomId: string;
  chatroomName: string;
  caseInfo: {
    status: string;
    date: string;
    teeth: string;
    referringOfficeStatus: string;
    patient: {
      images: string | null;
      name: string;
      job: string;
      phone: string | null;
    };
    referralDoctor: {
      images: string;
      name: string;
      speciality: string;
      office: {
        images: string | null;
        name: string;
        typeOffice: string;
      };
    };
    preferredDoctor: {
      images: string;
      name: string;
      speciality: string;
      office: {
        images: string | null;
        name: string;
        typeOffice: string;
      };
    };
  };
  xray: Array<{
    id: string;
    label: string;
    path: string;
  }>;
  additionnalFile: Array<{
    id: string;
    label: string;
    path: string;
  }>;
  procedures: Array<{
    id: string;
    name: string;
    officeId: string;
    fee: number;
  }>;
  referringFromId: string;
  referringToId: string;
};

export type OneCaseTimeline = {
  id: string;
  title: string;
  referralDate: string;
  patientFullName: string;
  patientPicture: string;
  referringDoctorName: string;
  referringDoctorSpeciality: string | null;
  referringDoctorPicture: string | null;
  referringDoctorOfficeLogo: string;
  referringDoctorOfficeName: string;
  referringDoctorOfficeType: string;
  preferredDoctorName: string | null;
  preferredDoctorSpeciality: string | null;
  preferredDoctorPicture: string | null;
  preferredDoctorOfficeLogo: string;
  preferredDoctorOfficeName: string;
  preferredDoctorOfficeType: string;
};

export type UpdateCaseProcedureArgs = {
  procedure: string[];
};

export type RejectNewReferralArgs = {
  reason: string;
};

export type ScheduleCaseArgs = {
  date: string;
  startTime: string;
  endTime: string;
};

export type CompleteAndAddProcedureArgs = {
  procedures: string[];
  date: string;
  startTime: string;
  endTime: string;
};

export type CompleteCaseArgs = {
  totalAmount: any;
  estimatedInsuranceCoverage: any;
  procedure: any;
  additionalFiles: any;
  isReferredBack: any;
  referredBackReason: string;
  feedBackComment: string;
  feedBackType: string;
};
