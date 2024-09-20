"use server";

import { ApiError } from "@/services/api-sdk/errors";
import { FetchService } from "@/services/api-sdk/lib/utils/fetch";
import {
  AllCasesOneChatQueryResponse,
  AllOfficeCasesQueryResponse,
  CompleteAndAddProcedureARequestBody,
  DATA_BODY_KEY,
  OneCaseQueryResponse,
  OneCaseTimelineQueryResponse,
  RejectReferralRequestBody,
  ScheduleCaseRequestBody,
  UpdateCaseProcedureRequestBody,
} from "@/services/api-sdk/models/cases/contracts";
import {
  CasesOneChat,
  CompleteAndAddProcedureArgs,
  CompleteCaseArgs,
  OfficeCases,
  OneCase,
  OneCaseTimeline,
  RejectNewReferralArgs,
  ScheduleCaseArgs,
  UpdateCaseProcedureArgs,
} from "@/services/api-sdk/types/cases";
import { getToken } from "@/utils/user-token";

/**
 * Fetch service instance
 * @type {FetchService}
 */
const fetchService: FetchService = new FetchService({
  requestInterceptor: async (config) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${await getToken()}`,
    },
  }),
});

async function fetchData(response: Response) {
  const reader = response.body?.getReader();
  let data = "";
  // @ts-ignore
  while (true) {
    // @ts-ignore
    const { done, value } = await reader?.read();

    if (done) {
      break;
    }

    data += new TextDecoder("utf-8").decode(value);
  }

  return JSON.parse(data).message;
}

export const getCasesOneChat = async (id: string): Promise<CasesOneChat[]> => {
  const response = await fetchService.get(`/case/filtered/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllCasesOneChatQueryResponse =
      await response.json();
    return data.map((item) => {
      try {
        return {
          id: item.id,
          label: item.label,
        } satisfies CasesOneChat;
      } catch (e) {
        throw new ApiError("Failed to fetch office cases");
      }
    });
  }

  throw new ApiError("Failed to fetch cases");
};

export const getAllOfficeCases = async (id: string): Promise<OfficeCases[]> => {
  const response = await fetchService.get(`/referral/office/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllOfficeCasesQueryResponse =
      await response.json();
    return data.map((item) => {
      try {
        return {
          id: item.id,
          caseId: item.case.id,
          referBackStatus: item.status,
          patientFullName: `${item.case.patient.lastName} ${item.case.patient.firstName}`,
          patientEmail: item.case.patient.parentEmail
            ? item.case.patient.parentEmail
            : item.case.patient.email,
          patientBirthDate: item.case.patient.birthDate,
          patientPhoneNumber: item.case.patient.phoneNumber
            ? item.case.patient.phoneNumber
            : "",
          patientParentName: item.case.patient.parentName,
          status: item.case.status,
          referringOfficeStatus: item.case.referringOfficeStatus,
          referringFromId: item.referringFrom.id,
          referringFromName: item.referringFrom.name,
          referringFromOffice: item.referringFrom.typeOffice.label,
          referringToId: item.referredTo.id,
          referringToName: item.referredTo.name,
          referringToOffice: item.referredTo.typeOffice.label,
          rejectedReason: item.case.rejectedReason
            ? item.case.rejectedReason
            : "",
          chatroomId: item.case.chatroom ? item.case.chatroom.id : "",
          chatroomName: item.case.chatroom ? item.case.chatroom.name : "",
          procedures: item?.case.procedures.flatMap((procedure) =>
            procedure.id
              ? [
                  {
                    id: procedure.id,
                    name: procedure.label,
                    fee: procedure.fee,
                    officeId: procedure.office.id,
                  },
                ]
              : [],
          ),
        } satisfies OfficeCases;
      } catch (e) {
        throw new ApiError("Failed to fetch office cases");
      }
    });
  }

  throw new ApiError("Failed to fetch cases");
};

export const getOneCase = async (id: string): Promise<OneCase> => {
  const response = await fetchService.get(`/referral/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: item }: OneCaseQueryResponse =
      await response.json();
    return {
      id: item.id,
      status: item.status,
      birth: item.case.patient.birthDate || "",
      insurance: item.case?.patient.insuranceNetwork || "",
      parent: item.case.patient.parentName,
      phone:
        item.case.patient.phoneNumber || item.case.patient.parentPhoneNumber,
      email: item.case.patient.email,
      note: item.case.notes || "",
      chatroomId: item.case.chatroom ? item.case.chatroom.id : "",
      chatroomName: item.case.chatroom ? item.case.chatroom.name : "",
      caseInfo: {
        status: item.case.status,
        date: item.case.createdAt,
        teeth: item.case.teeth,
        referringOfficeStatus: item.case.referringOfficeStatus,
        patient: {
          images: item.case.patient.picture,
          name: item.case.patient.firstName + " " + item.case.patient.lastName,
          job: item.case.patient.profession || "",
          phone: item.case.patient.phoneNumber || "",
        },
        referralDoctor: {
          images: item.referralDoctor.user.profilePicture?.path,
          name:
            item.referralDoctor.user.firstName +
            " " +
            item.referralDoctor.user.lastName,
          speciality: item.referralDoctor.speciality
            ? item.referralDoctor.speciality.title
            : "",
          office: {
            images: item.referralDoctor.office.logo,
            name: item.referralDoctor.office.name,
            typeOffice: item.referralDoctor.office.typeOffice.label,
          },
        },
        preferredDoctor: {
          images: item.preferredDoctor.user.profilePicture?.path,
          name:
            item.preferredDoctor.user.firstName +
            " " +
            item.preferredDoctor.user.lastName,
          speciality: item.preferredDoctor.speciality
            ? item.preferredDoctor.speciality.title
            : "",
          office: {
            images: item.preferredDoctor.office.logo,
            name: item.preferredDoctor.office.name,
            typeOffice: item.preferredDoctor.office.typeOffice.label,
          },
        },
      },

      xray: item?.case.xray.flatMap((file) =>
        file.id
          ? [
              {
                id: file.id,
                label: file.label,
                path: file.path,
              },
            ]
          : [],
      ),

      additionnalFile: item?.case.additionnalFile.flatMap((file) =>
        file.id
          ? [
              {
                id: file.id,
                label: file.label,
                path: file.path,
              },
            ]
          : [],
      ),
      procedures: item?.case.procedures.flatMap((procedure) =>
        procedure.id
          ? [
              {
                id: procedure.id,
                name: procedure.label,
                fee: procedure.fee,
                officeId: procedure.office.id,
              },
            ]
          : [],
      ),
      referringFromId: item.referringFrom.id,
      referringToId: item.referredTo.id,
    } satisfies OneCase;
  }

  async function fetchData() {
    const reader = response.body?.getReader();
    let data = "";
    // @ts-ignore
    while (true) {
      // @ts-ignore
      const { done, value } = await reader?.read();

      if (done) {
        break;
      }

      data += new TextDecoder("utf-8").decode(value);
    }

    return JSON.parse(data).message;
  }

  if (!response.ok) {
    const error = await fetchData();
    throw new ApiError(error);
  }

  throw new ApiError("Failed to fetch Specialist Offices");
};

export const getOneCaseTimeline = async (
  id: string,
): Promise<OneCaseTimeline[]> => {
  const response = await fetchService.get(`/case-timeline/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: OneCaseTimelineQueryResponse =
      await response.json();
    return data.map((item) => {
      try {
        return {
          id: item.id,
          title: item.title,
          referralDate: item.referral.createdAt,
          patientFullName: `${item.referral.case.patient.lastName} ${item.referral.case.patient.firstName}`,
          patientPicture: item.referral.case.patient.picture
            ? item.referral.case.patient.picture.path
            : "",
          referringDoctorName: `${item.referral.referralDoctor.user?.firstName} ${item.referral.referralDoctor.user?.lastName}`,
          referringDoctorPicture: item.referral.referralDoctor.user
            .profilePicture
            ? item.referral.referralDoctor.user.profilePicture.path
            : "",
          referringDoctorSpeciality: item.referral.referralDoctor.speciality
            ? item.referral.referralDoctor.speciality.title
            : "",
          referringDoctorOfficeLogo: item.referral.referringFrom.logo
            ? item.referral.referringFrom.logo.path
            : "",
          referringDoctorOfficeName: item.referral.referringFrom.name,
          referringDoctorOfficeType:
            item.referral.referringFrom.typeOffice.label,
          preferredDoctorName: `${item.referral.preferredDoctor.user.lastName} ${item.referral.preferredDoctor.user.firstName}`,
          preferredDoctorSpeciality: item.referral.preferredDoctor.speciality
            ? item.referral.preferredDoctor.speciality.title
            : "",
          preferredDoctorPicture: item.referral.preferredDoctor.user
            .profilePicture
            ? item.referral.preferredDoctor.user.profilePicture.path
            : "",
          preferredDoctorOfficeLogo: item.referral.referredTo.logo
            ? item.referral.referredTo.logo.path
            : "",
          preferredDoctorOfficeName: item.referral.referredTo.name,
          preferredDoctorOfficeType: item.referral.referredTo.typeOffice.label,
        } satisfies OneCaseTimeline;
      } catch (e) {
        throw new ApiError("Failed to fetch all cases timeline");
      }
    });
  }

  throw new ApiError("Failed to fetch all cases timeline");
};

export const updateCaseProcedure = async (
  id: string,
  args: UpdateCaseProcedureArgs,
) => {
  const response = await fetchService.patch(
    `/referral/update-procedures/${id}`,
    JSON.stringify({
      procedures: args.procedure,
    } satisfies UpdateCaseProcedureRequestBody),
    { headers: { "Content-Type": "application/json" } },
  );

  async function fetchData() {
    const reader = response.body?.getReader();
    let data = "";
    // @ts-ignore
    while (true) {
      // @ts-ignore
      const { done, value } = await reader?.read();

      if (done) {
        break;
      }

      data += new TextDecoder("utf-8").decode(value);
    }

    return JSON.parse(data).message;
  }

  if (!response.ok) {
    const error = await fetchData();
    throw new ApiError(error);
  }
};

export const approveNewReferral = async (id: string) => {
  const response = await fetchService.patch(`/referral/approve/${id}`);

  if (!response.ok) {
    throw new ApiError("Failed to approved new referral");
  }
};

export const rejectNewReferral = async (
  id: string,
  args: RejectNewReferralArgs,
) => {
  const response = await fetchService.patch(
    `/referral/reject/${id}`,
    JSON.stringify({
      reason: args.reason,
    } satisfies RejectReferralRequestBody),
    { headers: { "Content-Type": "application/json" } },
  );

  if (!response.ok) {
    throw new ApiError("Failed to reject new referral");
  }
};

export const scheduleCase = async (id: string, args: ScheduleCaseArgs) => {
  const response = await fetchService.patch(
    `/referral/schedule/${id}`,
    JSON.stringify({
      date: args.date,
      startTime: args.startTime,
      endTime: args.endTime,
    } satisfies ScheduleCaseRequestBody),
    { headers: { "Content-Type": "application/json" } },
  );

  if (!response.ok) {
    const error = await fetchData(response);
    throw new ApiError(error);
  }
};

export const completeAndAddProcedure = async (
  id: string,
  args: CompleteAndAddProcedureArgs,
) => {
  const response = await fetchService.patch(
    `/referral/complete-procedure/${id}`,
    JSON.stringify({
      date: args.date,
      startTime: args.startTime,
      endTime: args.endTime,
      procedures: args.procedures,
    } satisfies CompleteAndAddProcedureARequestBody),
    { headers: { "Content-Type": "application/json" } },
  );

  if (!response.ok) {
    throw new ApiError("Failed to complete and add procedures to case");
  }
};

export const completeCase = async (id: string, args: CompleteCaseArgs) => {
  const additionalFiles: File[] = args.additionalFiles.getAll("file");

  const formData = new FormData();

  formData.append("totalAmount", args.totalAmount);
  formData.append(
    "estimatedInsuranceCoverage",
    args.estimatedInsuranceCoverage,
  );
  formData.append("isReferredBack", args.isReferredBack);
  formData.append("referredBackReason", args.referredBackReason);
  formData.append("feedBackComment", args.feedBackComment);
  formData.append("feedBackType", args.feedBackType);
  formData.append("procedure", args.procedure);

  if (additionalFiles) {
    additionalFiles.forEach((item) => {
      formData.append("additionalFiles", item);
    });
  }

  const response = await fetchService.patch(
    `/referral/complete-referral/${id}`,
    formData,
  );

  if (!response.ok) {
    const error = await fetchData(response);
    throw new ApiError(error);
  }
};
