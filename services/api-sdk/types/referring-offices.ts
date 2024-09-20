export type ReferringOffices = {
  id: string;
  officeName: string;
  officeImage: null | string;
  speciality: string;
  status: string;
  patient: string;
  completedCase: string;
};

export type ReferringOfficesPreferredDoctors = {
  id: string;
  fullName: string;
  speciality: string | null;
  officeName: string;
  totalCases: number;
  completedPercentage: number;
};

export type OneReferringOffices = {
  id: string;
  name: string;
  speciality: string;
  email: string;
  phoneNumber: string;
  address: string;
  image: null | string;
  statistics: {
    caseCount: string;
    inQueue: string;
    approved: string;
    scheduled: string;
    completed: string;
    lost: string;
    overdue: string;
  };
  referredCase: Array<{
    id: string;
    consultation: string;
    patientName: string;
    specialistName: string;
    status: string;
  }>;
  referredOfficeStaff: Array<{
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    speciality: string;
  }>;
};

export type ReferringOfficeDoctorsDetails = {
  id: string;
  fullName: string;
  phoneNumber: string | null;
  email: string;
  picture: string | null;
  officeName: string;
  officeLogo: string | null;
  caseCount: string;
  inQueue: string;
  referredBack: string;
  scheduled: string;
  completed: string;
  lost: string;
  referredCase: Array<{
    id: string;
    status: string;
    patientFullName: string;
    referringFromId: string;
    referredToId: string;
    startDate: string;
  }>;
};
