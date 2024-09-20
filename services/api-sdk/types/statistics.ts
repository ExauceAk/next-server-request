export type OfficesRankings = {
  id: string;
  logo: string;
  officeName: string;
  caseCount: number;
  completionPercentage: number;
};

export type TopReferBack = {
  id: string;
  officeName: string;
  logo: string;
};

export type ReferredInIncome = {
  stat: Array<{
    procedure: string;
    price: number;
  }>;
  total: number;
};

export type ReferredInPatients = {
  stat: Array<{
    date: string;
    Patients: number;
  }>;
};

export type ReferredInPatientsStatus = {
  stat: Array<{
    name: string;
    sales: number;
  }>;
};

export type ScheduledCases = {
  stat: Array<{
    date: string;
    Completed: number;
    Lost: number;
  }>;
};

export type PatientReferralStatistics = {
  ReceivingOffices: number;
  ReferredInCases: number;
  ReferredOutCases: number;
  referredBackCases: number;
  ReferredInPatients: {
    inQueue: number;
    scheduled: number;
    completed: number;
    lost: number;
  };
  ReferredOutPatients: {
    inQueue: number;
    scheduled: number;
    completed: number;
    lost: number;
  };
  ReferredBackPatients: {
    inQueue: number;
    scheduled: number;
    completed: number;
    lost: number;
  };
};
