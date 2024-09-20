export const DATA_BODY_KEY = "data";

export type AllOfficesRankingsQueryResponse = {
  data: {
    TopReferBack: Array<{
      office_id: string;
      office_name: string;
      office_logo: string;
    }>;
    OfficesRanking: Array<{
      officeId: string;
      officeName: string;
      logo: string;
      caseCount: number;
      completionPercentage: number;
    }>;
  };
};

export type ReferredInIncomeQueryResponse = {
  data: {
    stat: Array<{
      procedure: string;
      price: number;
    }>;
    total: number;
  };
};

export type ReferredInPatientsQueryResponse = {
  data: {
    stat: Array<{
      date: string;
      Patients: number;
    }>;
  };
};

export type ReferredInPatientsStatusQueryResponse = {
  data: {
    stat: Array<{
      name: string;
      sales: number;
    }>;
  };
};

export type ScheduledCasesQueryResponse = {
  data: {
    stat: Array<{
      date: string;
      Completed: number;
      Lost: number;
    }>;
  };
};

export type AllPatientReferralStatisticsQueryResponse = {
  data: {
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
};
