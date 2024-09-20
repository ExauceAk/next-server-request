export type Patient = {
  id: string;
  title: string;
  description: string;
};

export type OfficePatients = {
  id: string;
  fullName: string;
  email: string | null;
  birthDate: string;
  phoneNumber: string | null;
  parentName: string;
  totalReferrals: number;
};

export type OneOfficePatients = {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  address: string;
  image: null | string;
  case: Array<{
    id: string;
    referralId : string;
    date: string;
    refferedStatus: string;
    referringFromId: string;
    referringToId: string;
    refferingFromName: string;
    refferingFromType: string;
    refferedToName: string;
    refferedToType: string;
    chatroomId: string,
    chatroomName: string,
    status: string;
  }>;
};
