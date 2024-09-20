"use server";

import { ApiError, InvalidResponseError } from "@/services/api-sdk/errors";
import { getToken } from "@/utils/user-token";
import { FetchService } from "../../lib/utils/fetch";
import {
  AppUser,
  ChoosePrimaryDoctorArgs,
  CreateOfficeUserArgs,
  CreateUserArgs,
  ForgetPasswordArgs,
  LoginOtpArgs,
  OfficeUser,
  ResetPasswordArgs,
  ResetUserConnectedPasswordArgs,
  UpdateOfficeUserArgs,
  UpdateUserPersonnalInformationArgs,
  UpdateUserPersonnalInformationWithoutPictureArgs,
  UpdateUserStepArgs,
  User,
  UserConnected,
  UserConnectedProfile,
} from "../../types/users";
import {
  AllOfficeUsersQueryResponse,
  AllUsersQueryResponse,
  ChoosePrimaryDoctorRequestBody,
  CreateOfficeUserQueryResponse,
  CreateOfficeUserRequestBody,
  CreateUserQueryResponse,
  CreateUserRequestBody,
  DATA_BODY_KEY,
  ForgetPasswordRequestBody,
  LoginOtpRequestBody,
  ResetConnectedUserPasswordRequestBody,
  ResetPasswordRequestBody,
  UpdateOfficeUserRequestBody,
  UserConnectedProfileQueryResponse,
  UserConnectedQueryResponse,
} from "./contracts";
import { getApiErrorMessage } from "@/utils/get-api-error-message";

/**
 * Tag for the query to fetch a single function.
 */
// const getOneFunctionQueryTag = (id: string) => `FUNCTIONS/ONE_FUNCTION/${id}`;

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

/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */

export const getAllUsers = async (): Promise<AppUser[]> => {
  const response = await fetchService.get("/users/all-users");

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllUsersQueryResponse =
      await response.json();

    return data.map((item) => {
      try {
        return {
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          profilePicturePath: item.profilePicturePath,
          specialities: item.specialities,
        } satisfies AppUser;
      } catch (e) {
        throw new ApiError("Failed to fetch events");
      }
    });
  }

  throw new ApiError("Failed to fetch events");
};

export const getAllOfficeTechnicians = async (
  id: string,
): Promise<OfficeUser[]> => {
  const response = await fetchService.get(`/office-user/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllOfficeUsersQueryResponse =
      await response.json();
    return data.technician.map((item) => {
      try {
        return {
          id: item.user.id,
          username: item.user.username,
          email: item.user.email,
          firstName: item.user.firstName,
          lastName: item.user.lastName,
          fullName: `${item.user.firstName} ${item.user.lastName}`,
          role: item.role,
        } satisfies OfficeUser;
      } catch (e) {
        throw new ApiError("Failed to fetch office user");
      }
    });
  }

  throw new ApiError("Failed to fetch events");
};

export const getAllOfficeManagers = async (
  id: string,
): Promise<OfficeUser[]> => {
  const response = await fetchService.get(`/office-user/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllOfficeUsersQueryResponse =
      await response.json();
    return data.manager.map((item) => {
      try {
        return {
          id: item.user.id,
          username: item.user.username,
          email: item.user.email,
          firstName: item.user.firstName,
          lastName: item.user.lastName,
          fullName: `${item.user.firstName} ${item.user.lastName}`,
          role: item.role,
        } satisfies OfficeUser;
      } catch (e) {
        throw new ApiError("Failed to fetch office user");
      }
    });
  }

  throw new ApiError("Failed to fetch events");
};

export const getAllOfficeReceptionists = async (
  id: string,
): Promise<OfficeUser[]> => {
  const response = await fetchService.get(`/office-user/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllOfficeUsersQueryResponse =
      await response.json();
    return data.receptionist.map((item) => {
      try {
        return {
          id: item.user.id,
          username: item.user.username,
          email: item.user.email,
          firstName: item.user.firstName,
          lastName: item.user.lastName,
          fullName: `${item.user.firstName} ${item.user.lastName}`,
          role: item.role,
        } satisfies OfficeUser;
      } catch (e) {
        throw new ApiError("Failed to fetch office user");
      }
    });
  }

  throw new ApiError("Failed to fetch events");
};

export const getAllOfficeDoctors = async (
  id: string,
): Promise<OfficeUser[]> => {
  const response = await fetchService.get(`/office-user/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllOfficeUsersQueryResponse =
      await response.json();
    return data.doctor.map((item) => {
      try {
        return {
          id: item.user.id,
          username: item.user.username,
          email: item.user.email,
          firstName: item.user.firstName,
          lastName: item.user.lastName,
          fullName: `${item.user.firstName} ${item.user.lastName}`,
          role: item.role,
          speciality: item.speciality,
        } satisfies OfficeUser;
      } catch (e) {
        throw new ApiError("Failed to fetch office doctor");
      }
    });
  }

  throw new ApiError("Failed to fetch doctor");
};

/**
 * Creates a new event on the server.
 * @param args - The event data to create.
 * @returns A promise that resolves to the created event.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const createUser = async (args: CreateUserArgs): Promise<User> => {
  const response = await fetchService.post(
    "/users/register",
    JSON.stringify({
      email: args.email,
      password: args.password,
      confirmPassword: args.confirmPassword,
      officeName: args.officeName,
      // officeLocation: args.officeLocation,
      officePhoneNumber: args.officePhoneNumber,
      officePhonePrefix: args.phonePrefix,
      officeEmail: args.officeEmail,
      typeOffice: args.typeOffice,
    } satisfies CreateUserRequestBody),
    { headers: { "Content-Type": "application/json" } },
  );

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: CreateUserQueryResponse =
      await response.json();
    try {
      return {
        id: data.id,
        username: data.username ? data.username : "",
        email: data.email,
        officeName: data.officeName,
        officeLocation: data.officeLocation,
        officePhoneNumber: data.officePhoneNumber,
        firstName: data.firstName ? data.firstName : "",
        officeEmail: data.officeEmail,
        lastName: data.lastName ? data.lastName : "",
        phoneNumber: data.phoneNumber ? data.phoneNumber : "",
        profilePictur: data.profilePictur ? data.profilePictur : "",
        deleted: data.deleted,
      } satisfies User;
    } catch (e) {
      throw new InvalidResponseError("Failed to parse username data");
    }
  }
  throw new ApiError("Failed to create user");
};

export const createOfficeUser = async (
  id: string,
  args: CreateOfficeUserArgs,
) => {
  const response = await fetchService.post(
    `/users/create-user/${id}`,

    JSON.stringify({
      username: args.username,
      email: args.email ? args.email : null,
      firstName: args.firstName,
      lastName: args.lastName,
      password: args.password,
      role: args.role,
    } satisfies CreateOfficeUserRequestBody),

    { headers: { "Content-Type": "application/json" } },
  );

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: CreateOfficeUserQueryResponse =
      await response.json();
    try {
      return {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: `${data.firstName} ${data.lastName}`,
        role: data.role,
      } satisfies OfficeUser;
    } catch (e) {
      throw new InvalidResponseError("Failed to parse user data");
    }
  }

  if (!response.ok) {
    const error = await getApiErrorMessage(response);
    throw new ApiError(error);
  }
};

export const loginOpt = async (args: LoginOtpArgs): Promise<string> => {
  const response = await fetchService.post(
    `/users/create-user`,

    JSON.stringify({
      email: args.email,
      password: args.password,
    } satisfies LoginOtpRequestBody),

    { headers: { "Content-Type": "application/json" } },
  );

  if (response.ok) {
    return "Success";
  }
  throw new ApiError("Failed to create user");
};

export const createOfficedoctor = async (
  id: string,
  args: CreateOfficeUserArgs,
): Promise<OfficeUser> => {
  const response = await fetchService.post(
    `/users/create-doctor/${id}`,

    JSON.stringify({
      username: args.username,
      email: args.email ? args.email : null,
      firstName: args.firstName,
      lastName: args.lastName,
      password: args.password,
      role: args.role,
      speciality: args.speciality ? args.speciality : null,
    } satisfies CreateOfficeUserRequestBody),

    { headers: { "Content-Type": "application/json" } },
  );

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: CreateOfficeUserQueryResponse =
      await response.json();
    try {
      return {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: `${data.firstName} ${data.lastName}`,
        role: data.role,
      } satisfies OfficeUser;
    } catch (e) {
      throw new InvalidResponseError("Failed to parse username data");
    }
  }
  throw new ApiError("Failed to create user");
};

export const updateOfficeUser = async (
  id: string,
  args: UpdateOfficeUserArgs,
) => {
  const response = await fetchService.patch(
    `/users/${id}`,
    JSON.stringify({
      username: args.username,
      email: args.email ? args.email : null,
      firstName: args.firstName,
      lastName: args.lastName,
      // speciality: args.speciality ? args.speciality : null,
    } satisfies UpdateOfficeUserRequestBody),

    { headers: { "Content-Type": "application/json" } },
  );

  if (response.ok) {
    return "succes";
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
};

export const forgetPassword = async (
  args: ForgetPasswordArgs,
): Promise<string> => {
  const response = await fetchService.post(
    "/users/forgot-password",
    JSON.stringify({
      email: args.email,
    } satisfies ForgetPasswordRequestBody),
    { headers: { "Content-Type": "application/json" } },
  );

  if (response.ok) {
    return "succes";
  }

  throw new ApiError("Failed ");
};

export const resetPassword = async (
  args: ResetPasswordArgs,
): Promise<string> => {
  const response = await fetchService.post(
    "/users/reset-password",
    JSON.stringify({
      password: args.password,
      confirmPassword: args.confirmPassword,
      token: args.token,
    } satisfies ResetPasswordRequestBody),
    { headers: { "Content-Type": "application/json" } },
  );

  if (response.ok) {
    return "succes";
  }

  throw new ApiError("Failed ");
};

/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */

export const getMe = async (): Promise<UserConnected> => {
  const response = await fetchService.get("/users/user-profile");
  if (response.ok) {
    const { data }: UserConnectedQueryResponse = await response.json();
    try {
      return {
        id: data.id,
        officeName: data.officeName,
        officeLocation: data.officeLocation,
        isDoctor: JSON.stringify(data.isDoctor),
        officePhoneNumber: data.officePhoneNumber,
        officeEmail: data.officeEmail,
        officePhonePrefix: data.officePhonePrefix,
        email: data.email,
        firstName: data.firstName ? data.firstName : "",
        lastName: data.lastName ? data.lastName : "",
        phoneNumber: data.phoneNumber ? data.phoneNumber : "",
        phonePrefix: data.phonePrefix ? data.phonePrefix : "",
        username: data.username ? data.username : "",
        profilePicture: data.profilePicture ? data.profilePicture.path : "",
        typeOfficeId: data.typeOffice?.id,
        officeLabel: data.typeOffice?.label,
      } satisfies UserConnected;
    } catch (e) {
      throw new ApiError("Failed to fetch user connected");
    }
  }

  throw new ApiError("Failed to fetch connected");
};

/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */

export const getMeProfile = async (): Promise<UserConnectedProfile> => {
  const response = await fetchService.get("/users/profile");
  if (response.ok) {
    const { data }: UserConnectedProfileQueryResponse = await response.json();
    try {
      return {
        id: data.id,
        userID: data.user.id,
        officeId: data.office.id,
        officeName: data.user.officeName,
        officeLocation: data.user.officeLocation,
        officePhoneNumber: data.user.officePhoneNumber,
        officeEmail: data.user.officeEmail,
        email: data.user.email,
        firstName: data.user.firstName ? data.user.firstName : " ",
        lastName: data.user.lastName ? data.user.lastName : "",
        phoneNumber: data.user.phoneNumber ? data.user.phoneNumber : "",
        phonePrefix: data.user.phonePrefix ? data.user.phonePrefix : "",
        username: data.user.username ? data.user.username : "",
        profilePicture: data.user.profilePicture
          ? data.user.profilePicture.path
          : "",
        typeOfficeId: data.user.typeOffice?.id,
        officeLabel: data.user.typeOffice?.label,
        step: data?.user.step,
        speciality: data?.speciality ? data?.speciality.title : "",
        role: data.role,
      } satisfies UserConnectedProfile;
    } catch (e) {
      throw new ApiError("Failed to fetch user connected profile");
    }
  }

  throw new ApiError("Failed to fetch connected profile");
};

/**
 * Update an existing user on the server.
 * @param id - The id of the user to update.
 * @param args - The event data to update.
 * @returns A promise that resolves to the updated user.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const updateUserPersonalInformation = async (
  args: UpdateUserPersonnalInformationArgs,
) => {
  const uploadedFile = args.profileImage.get("file");
  // if (!(uploadedFile instanceof File)) {
  //   throw new Error("No file provided");
  // }

  const formData = new FormData();
  formData.append("firstName", args.firstName);
  formData.append("lastName", args.lastName);
  formData.append("phoneNumber", args.phoneNumber);
  formData.append("phonePrefix", args.phonePrefix);
  uploadedFile && formData.append("profilePicture", uploadedFile);
  formData.append("isDoctor", args.isDoctor);
  formData.append("username", args.username);

  const response = await fetchService.patch(
    `/users/update-connected-user`,
    formData,
  );
  console.log("formData=====================================", formData);

  // if (response.ok) {
  //   const { data }: UpdateUserPersonnalInformationQueryResponse =
  //     await response.json();
  //   try {
  //     return {
  //       id: data.id,
  //       officeName: data.officeName,
  //       officeLocation: data.officeLocation,
  //       officePhoneNumber: data.officePhoneNumber,
  //       officeEmail: data.officeEmail,
  //       email: data.email,
  //       firstName: data.firstName ? data.firstName : " ",
  //       lastName: data.lastName ? data.lastName : "",
  //       phoneNumber: data.phoneNumber ? data.phoneNumber : "",
  //       phonePrefix: data.phonePrefix ? data.phonePrefix : "",
  //       username: data.username ? data.username : "",
  //       profilePictur: data.profilePicture ? data.profilePicture : "",
  //       typeOfficeId : data.typeOffice.id,
  //       officeLabel : data.typeOffice.label
  //     } satisfies UserConnected;
  //   } catch (e) {
  //     throw new ApiError("Failed to parse user data");
  //   }
  // }

  if (!response.ok) {
    throw new ApiError("Failed to update user");
  }
};

/**
 * Update an existing user on the server.
 * @param id - The id of the user to update.
 * @param args - The event data to update.
 * @returns A promise that resolves to the updated user.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const updateUserPersonalInformationWithoutPicture = async (
  args: UpdateUserPersonnalInformationWithoutPictureArgs,
) => {
  const formData = new FormData();
  formData.append("firstName", args.firstName);
  formData.append("lastName", args.lastName);
  formData.append("phoneNumber", args.phoneNumber);
  formData.append("phonePrefix", args.phonePrefix);
  formData.append("isDoctor", args.isDoctor);
  formData.append("username", args.username);
  const response = await fetchService.patch(
    `/users/update-connected-user`,
    formData,
  );

  console.log("formData=====================================", formData);

  if (!response.ok) {
    throw new ApiError("Failed to update user");
  }
};
/**
 * Update an existing user on the server.
 * @param id - The id of the user to update.
 * @param args - The event data to update.
 * @returns A promise that resolves to the updated user.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const updateUserStep = async (args: UpdateUserStepArgs) => {
  const formData = new FormData();
  formData.append("step", args.step);
  const response = await fetchService.patch(
    `/users/update-connected-user`,
    formData,
  );

  if (!response.ok) {
    throw new ApiError("Failed to update user step");
  }
};

export const deleteOfficeUser = async (id: string): Promise<void> => {
  const response = await fetchService.delete(`/users/delete-user/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new ApiError("Failed to delete Event");
  } else {
    const data = await response.json();
    return data;
  }
};

/**
 * choose primary doctor on the server.
 * @param args - The OfficeId and userId data to choose doctor.
 * @returns A promise that resolves to the updated user.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const choosePrimaryDoctor = async (args: ChoosePrimaryDoctorArgs) => {
  const response = await fetchService.patch(
    `/office-user/update-primary-doctor`,
    JSON.stringify({
      idOffice: args.idOffice,
      idUser: args.idUser,
    } satisfies ChoosePrimaryDoctorRequestBody),
    { headers: { "Content-Type": "application/json" } },
  );

  if (!response.ok) {
    throw new ApiError("Failed to choose primary doctor");
  }
};

/**
 * Reset connected user password on the server.
 * @param args - The reset password data to create.
 * @returns A promise that resolves to the reset password.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const resetUserConnectedPassword = async (
  args: ResetUserConnectedPasswordArgs,
) => {
  const response = await fetchService.post(
    "/users/change-password",
    JSON.stringify({
      oldPassword: args.password,
      password: args.newPassword,
      confirmPassword: args.confirmPassword,
    } satisfies ResetConnectedUserPasswordRequestBody),
    { headers: { "Content-Type": "application/json" } },
  );

  if (!response.ok) {
    const error = await fetchData(response);
    throw new ApiError(error);
  }
};
