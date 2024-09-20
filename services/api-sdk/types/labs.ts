export type LabPreferredTechnicians = {
  id: string;
  fullName: string;
  officeName: string;
  totalCases: number;
  completedPercentage: number;
};

export type OfficeLab = {
  id: string;
  officeName: string;
  officeImage: null | string;
  speciality: string;
  status: string;
  patient: string;
  completedCase: string;
};

export type TechniciansDetails = {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  picture: string | null;
  officeName: string;
  officeLogo: string;
  caseCount: number;
  onGoing: number;
  overdue: number;
  completed: number;
  referredCase: Array<{
    id: string;
    status: string;
    rejectedReason: string;
    patientFullName: string;
    startDate: string;
    dueDate: string;
  }>;
};

export type OneLabOffices = {
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
    dueDate: string;
    patientName: string;
    specialistName: string;
    technicianName: string;
    status: string;
    rejectedReason: string;
  }>;
  referredOfficeStaff: Array<{
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    speciality: string;
  }>;
};
