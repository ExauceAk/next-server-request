"use server";

import { FetchService } from "@/services/api-sdk/lib/utils/fetch";
import { getToken } from "@/utils/user-token";
import {
  AllDoctorsCanReferred,
  NewInvitation,
  CreateReferralArgs,
  SendInviteToNewSpecialistOfficeArgs,
  VerifyPatientNumberArgs,
  SendSmsToPatientArgs,
  VerifyNumberByPatientArgs,
} from "@/services/api-sdk/types/referrals";
import { ApiError, InvalidResponseError } from "@/services/api-sdk/errors";
import {
  AllDoctorsCanReferredQueryResponse,
  DATA_BODY_KEY,
  NewInvitationQueryResponse,
  SendInviteToNewSpecialistOfficeRequestBody,
  SendSmsToPatientRequestBody,
  VerifyNumberByPatientRequestBody,
  VerifyPatientNumberRequestBody,
} from "@/services/api-sdk/models/referral/contracts";

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

/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */

export const getAllDoctorsCanReferred = async (): Promise<
  AllDoctorsCanReferred[]
> => {
  const response = await fetchService.get("/office-user/doctors");

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllDoctorsCanReferredQueryResponse =
      await response.json();
    return data.map((item) => {
      return {
        id: item.id ? item.id : "",
        status: item.status,
        speciality: item.speciality ? item.speciality.title : null,
        officeId: item.office?.id || "",
        officeName: item.office?.name || "",
        officeLogo: item.office?.logo ? item.office.logo.path : "",
        typeOfficeId: item.office?.typeOffice.id
          ? item.office.typeOffice.id
          : "",
        typeOfficeLabel: item.office?.typeOffice.label || "",
        doctorId: item.user.id ? item.user.id : "",
        doctorFullName:
          item.user.firstName || item.user.lastName
            ? `${item.user.firstName} ${item.user.lastName}`
            : "",
        doctorProfilePicture: item.user.profilePicture
          ? item.user.profilePicture.path
          : "",
      } satisfies AllDoctorsCanReferred;
    });
  }
  throw new ApiError("Failed to fetch all doctors can referred");
};

/**
 * Invite a new specialist office.
 * @param args - The invite data to send invite.
 * @returns A promise that resolves to the invite office.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const sendInviteToOffice = async (
  args: SendInviteToNewSpecialistOfficeArgs,
): Promise<NewInvitation | any> => {
  const response = await fetchService.post(
    "/invitation",
    JSON.stringify({
      officeName: args.officeName,
      officePrimaryDoctorLastName: args.officePrimaryDoctorLastName,
      officePrimaryDoctorFirstName: args.officePrimaryDoctorFirstName,
      officeEmail: args.officeEmail,
      officePhonePrefix: args.officePhonePrefix,
      officePhone: args.officePhone,
    } satisfies SendInviteToNewSpecialistOfficeRequestBody),
    { headers: { "Content-Type": "application/json" } },
  );

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: NewInvitationQueryResponse =
      await response.json();
    try {
      return {
        id: data.id,
        officeName: data.officeName,
        officePrimaryDoctorLastName: data.officePrimaryDoctorLastName,
        officePrimaryDoctorFirstName: data.officePrimaryDoctorFirstName,
        officeEmail: data.officeEmail,
        officePhonePrefix: data.officePhonePrefix,
        officePhone: data.officePhone,
      } satisfies NewInvitation;
    } catch (e) {
      throw new InvalidResponseError("Failed to parse invite data");
    }
  }
  throw new InvalidResponseError("Failed to parse invite data");
};

/**
 * Invite a new specialist office.
 * @param args - The invite data to send invite.
 * @returns A promise that resolves to the invite office.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const verifyPatientNumber = async (args: VerifyPatientNumberArgs) => {
  const response = await fetchService.post(
    "/sms/verify-patient-number",
    JSON.stringify({
      to: args.to,
    } satisfies VerifyPatientNumberRequestBody),
    { headers: { "Content-Type": "application/json" } },
  );

  if (!response.ok) {
    throw new ApiError("Failed to verify-number patient number");
  }
};

/**
 * Invite a new specialist office.
 * @param args - The invite data to send invite.
 * @returns A promise that resolves to the invite office.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const verifyNumberByUser = async (args: VerifyNumberByPatientArgs) => {
  const response = await fetchService.post(
    "/sms/verify-patient-number",
    JSON.stringify({
      to: args.to,
      preferredDoctor: args.preferredDoctor,
      referredBy: args.referredBy,
      userId: args.userId,
    } satisfies VerifyNumberByPatientRequestBody),
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

/**
 * Invite a new specialist office.
 * @param args - The invite data to send invite.
 * @returns A promise that resolves to the invite office.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const sendSmsToPatient = async (args: SendSmsToPatientArgs) => {
  const response = await fetchService.post(
    "/sms",
    JSON.stringify({
      to: args.to,
      message: args.message,
    } satisfies SendSmsToPatientRequestBody),
    { headers: { "Content-Type": "application/json" } },
  );

  if (!response.ok) {
    throw new ApiError("Failed to send sms to patient");
  }
};

export const createReferral = async (args: CreateReferralArgs) => {
  const xray: File[] = args.xray.getAll("xray");
  const additionalFiles: File[] = args.additionalFiles.getAll("file");

  let prescriptionFile: File[] = [];
  if (args && args.prescriptionFile) {
    prescriptionFile = args.prescriptionFile.getAll("prescriptionFile");
  }

  const formData = new FormData();

  args.firstName && formData.append("firstName", args.firstName);
  args.lastName && formData.append("lastName", args.lastName);
  args.birthDate && formData.append("birthDate", args.birthDate);
  args.insurance && formData.append("insurance", args.insurance);
  args.parentName && formData.append("parentName", args.parentName);
  args.parentEmail && formData.append("parentEmail", args.parentEmail);
  args.procedure?.length && formData.append("procedure", args.procedure);
  args.dueDate && formData.append("dueDate", args.dueDate);
  args.phoneNumber && formData.append("phoneNumber", args.phoneNumber);
  args.categories && formData.append("categories", args.categories);

  if (xray) {
    xray.forEach((item) => {
      formData.append("xray", item);
    });
  }
  if (additionalFiles) {
    xray.forEach((item) => {
      formData.append("additionalFiles", item);
    });
  }

  if (prescriptionFile.length > 0) {
    prescriptionFile.forEach((item) => {
      formData.append("prescriptionFile", item);
    });
  }
  args.teeth && formData.append("teeth", args.teeth);
  args.notes && formData.append("notes", args.notes);
  args.referringFrom && formData.append("referringFrom", args.referringFrom);
  args.referredTo && formData.append("referredTo", args.referredTo);
  args.referralDoctor && formData.append("referralDoctor", args.referralDoctor);
  args.preferredDoctor &&
    formData.append("preferredDoctor", args.preferredDoctor);

  args.insuranceNetwork &&
    formData.append("insuranceNetwork", args.insuranceNetwork);
  args.subscriberName && formData.append("subscriberName", args.subscriberName);
  args.subscriberDOB && formData.append("subscriberDOB", args.subscriberDOB);
  args.ssnmembership && formData.append("ssnmembership", args.ssnmembership);
  args.email && formData.append("email", args.email);

  const response = await fetchService.post(`/referral`, formData);

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
    console.log(response);
    const error = await fetchData();
    throw new ApiError(error);
  }
};
