"use client";

import {
  MutateOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";
import {
  ChoosePrimaryDoctorArgs,
  CreateOfficeUserArgs,
  CreateUserArgs,
  ForgetPasswordArgs,
  LoginOtpArgs,
  ResetPasswordArgs,
  ResetUserConnectedPasswordArgs,
  UpdateOfficeUserArgs,
  UpdateUserPersonnalInformationArgs,
  UpdateUserPersonnalInformationWithoutPictureArgs,
  UpdateUserStepArgs,
  User,
} from "../../types/users";
import {
  choosePrimaryDoctor,
  createOfficedoctor,
  createOfficeUser,
  createUser,
  deleteOfficeUser,
  forgetPassword,
  getAllOfficeDoctors,
  getAllOfficeManagers,
  getAllOfficeReceptionists,
  getAllOfficeTechnicians,
  getAllUsers,
  getMe,
  getMeProfile,
  loginOpt,
  resetPassword,
  resetUserConnectedPassword,
  updateOfficeUser,
  updateUserPersonalInformation,
  updateUserPersonalInformationWithoutPicture,
  updateUserStep,
} from "./requests";

/**
 * Tag for the query to fetch all functions.
 */

const ALL_USERS_QUERY_KEY = ["allUsers"];

const RESET_USER_CONNECTED_MUTATION_KEY = ["USERS", "RESET_PASSWORD_ACCOUNT"];

const CONNECTED_USER_QUERY_KEY = ["userConnected"];

const CONNECTED_USER_PROFILE_QUERY_KEY = ["userConnectedProfile"];

const CHOOSE_PRIMARY_DOCTOR = ["choosePrimaryDoctor"];

const CREATE_OFFICE_USER_MUTATION_KEY = (id: string) => [
  "USER",
  "CREATE_OFFICE_USER",
  id,
];

type ForgetPasswordOptions<TContext> = MutateOptions<
  string,
  Error,
  ForgetPasswordArgs,
  TContext
>;

type ResetPasswordOptions<TContext> = MutateOptions<
  string,
  Error,
  ResetPasswordArgs,
  TContext
>;

type CreateUserOptions<TContext> = MutateOptions<
  User,
  Error,
  CreateUserArgs,
  TContext
>;

type LoginOtpOptions<TContext> = MutateOptions<
  string,
  Error,
  LoginOtpArgs,
  TContext
>;

type UpdateUserOptions<TContext> = MutateOptions<
  any,
  Error,
  UpdateOfficeUserArgs,
  TContext
>;

type CreateOfficeUserOptions<TContext> = MutateOptions<
  any,
  Error,
  CreateOfficeUserArgs,
  TContext
>;

/**
 * Options for the update user mutation.
 */

type UpdatePersonnalInformationOptions<TContext> = MutateOptions<
  void,
  Error,
  UpdateUserPersonnalInformationArgs,
  TContext
>;

/**
 * Options for the change connected user password mutation.
 */
type ResetUserConnectedPasswordOptions<TContext> = MutateOptions<
  User,
  Error,
  ResetUserConnectedPasswordArgs,
  TContext
>;

/**
 * Options for the update user mutation.
 */

type UpdatePersonnalInformationWithoutPictureOptions<TContext> = MutateOptions<
  void,
  Error,
  UpdateUserPersonnalInformationWithoutPictureArgs,
  TContext
>;

/**
 * Options for the update user mutation.
 */

type UpdateUserStepOptions<TContext> = MutateOptions<
  void,
  Error,
  UpdateUserStepArgs,
  TContext
>;

type ChoosePrimaryDoctor<TContext> = MutateOptions<
  string,
  Error,
  ChoosePrimaryDoctorArgs,
  TContext
>;

type DeleteOptions<TContext> = MutateOptions<void, Error, undefined, TContext>;

/**
 * Tag for the query to fetch a single function.
 * @param id - The id of the function to fetch
 * @returns The query tag.
 */
const getOneUserQueryKey = (id: string) => ["USERS", "ONE_USER", id];

const getOfficeTechniciansQueryKey = (id: string) => [
  "USERS",
  "OFFICE_TECHNICIAN",
  id,
];

const getOfficeManagersQueryKey = (id: string) => [
  "USERS",
  "OFFICE_MANAGER",
  id,
];
const getOfficeReceptionistsQueryKey = (id: string) => [
  "USERS",
  "OFFICE_RECEPTIONISTS",
  id,
];
const getOfficeDoctorsQueryKey = (id: string) => [
  "USERS",
  "OFFICE_DOCTORS",
  id,
];

/* Tag for the mutation to update an user.
 * @param id - The id of the user to update.
 * @returns The mutation tag.
 */
const getUpdateUserMutationKey = (id: string) => ["USERS", "UPDATE_USER", id];

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useAllUsers = () =>
  useQuery({
    queryKey: ALL_USERS_QUERY_KEY,
    queryFn: () => getAllUsers(),
  });

export const useAllUsersInvalidate = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ALL_USERS_QUERY_KEY });
};

// Technician listes

export const useAllOfficeTechnicians = (id: string) =>
  useQuery({
    queryKey: getOfficeTechniciansQueryKey(id),
    queryFn: () => getAllOfficeTechnicians(id),
  });

export const useAllOfficeeTechniciansInvalidate = () => {
  const queryClient = useQueryClient();
  return (id: string) =>
    queryClient.invalidateQueries({
      queryKey: getOfficeTechniciansQueryKey(id),
    });
};

// Manager listes

export const useAllOfficeManagers = (id: string) =>
  useQuery({
    queryKey: getOfficeManagersQueryKey(id),
    queryFn: () => getAllOfficeManagers(id),
  });

export const useAllOfficeeManagersInvalidate = () => {
  const queryClient = useQueryClient();
  return (id: string) =>
    queryClient.invalidateQueries({ queryKey: getOfficeManagersQueryKey(id) });
};

// Receptionists liste
export const useAllOfficeReceptionists = (id: string) =>
  useQuery({
    queryKey: getOfficeReceptionistsQueryKey(id),
    queryFn: () => getAllOfficeReceptionists(id),
  });

export const useAllOfficeReceptionistsInvalidate = () => {
  const queryClient = useQueryClient();
  return (id: string) =>
    queryClient.invalidateQueries({
      queryKey: getOfficeReceptionistsQueryKey(id),
    });
};

// Doctors liste
export const useAllOfficeDoctors = (id: string) =>
  useQuery({
    queryKey: getOfficeDoctorsQueryKey(id),
    queryFn: () => getAllOfficeDoctors(id),
  });

export const useAllOfficeDoctorsInvalidate = () => {
  const queryClient = useQueryClient();
  return (id: string) =>
    queryClient.invalidateQueries({ queryKey: getOfficeDoctorsQueryKey(id) });
};

/**
 * Hook to invalidate a single event query.
 * @param id - The id of the event to invalidate.
 * @returns The invalidation function
 */
export const useOneUserInvalidate = () => {
  const queryClient = useQueryClient();
  return (id: string) =>
    queryClient.invalidateQueries({ queryKey: getOneUserQueryKey(id) });
};

/**
 * Hook to create an event.
 * @param options
 * @returns The mutation state and the mutation function
 * @remarks
 * The mutation function automatically invalidates the all events query on success.
 */
export const useCreateUser = <TContext = unknown>(
  options?: CreateUserOptions<TContext>,
) => {
  const getMutationOptions = useCallback(
    (
      mutateOptions?: CreateUserOptions<TContext>,
    ): CreateUserOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await ALL_USERS_QUERY_KEY;
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [ALL_USERS_QUERY_KEY],
  );

  const mutation = useMutation({
    mutationFn: (args) => createUser(args),
    mutationKey: ALL_USERS_QUERY_KEY,
    ...getMutationOptions(options),
  });

  const mutate: typeof mutation.mutate = (mutateArgs, mutateOptions?) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));

  const mutateAsync: typeof mutation.mutateAsync = (
    mutateArgs,
    mutateOptions?,
  ) => mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));

  return {
    ...mutation,
    mutate,
    mutateAsync,
  } as typeof mutation;
};

export const useLoginOpt = <TContext = unknown>(
  options?: LoginOtpOptions<TContext>,
) => {
  const getMutationOptions = useCallback(
    (mutateOptions?: LoginOtpOptions<TContext>): LoginOtpOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await ALL_USERS_QUERY_KEY;
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [ALL_USERS_QUERY_KEY],
  );

  const mutation = useMutation({
    mutationFn: (args) => loginOpt(args),
    mutationKey: ALL_USERS_QUERY_KEY,
    ...getMutationOptions(options),
  });

  const mutate: typeof mutation.mutate = (mutateArgs, mutateOptions?) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));

  const mutateAsync: typeof mutation.mutateAsync = (
    mutateArgs,
    mutateOptions?,
  ) => mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));

  return {
    ...mutation,
    mutate,
    mutateAsync,
  } as typeof mutation;
};

export const useOfficeCreateDoctor = <TContext = unknown>(
  id: string,
  options?: CreateOfficeUserOptions<TContext>,
) => {
  const invalidateAllOfficeeDoctors = useAllOfficeDoctorsInvalidate();

  const getMutationOptions = useCallback(
    (
      mutateOptions?: CreateOfficeUserOptions<TContext>,
    ): CreateOfficeUserOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllOfficeeDoctors(id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllOfficeeDoctors, id],
  );

  const mutation = useMutation({
    mutationFn: (args) => createOfficedoctor(id, args),
    mutationKey: CREATE_OFFICE_USER_MUTATION_KEY(id),
    ...getMutationOptions(options),
  });

  const mutate: typeof mutation.mutate = (mutateArgs, mutateOptions?) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));

  const mutateAsync: typeof mutation.mutateAsync = (
    mutateArgs,
    mutateOptions?,
  ) => mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));

  return {
    ...mutation,
    mutate,
    mutateAsync,
  } as typeof mutation;
};

export const useOfficeCreateUser = <TContext = unknown>(
  id: string,
  options?: CreateOfficeUserOptions<TContext>,
) => {
  const invalidateAllOfficeeTechnicians = useAllOfficeeTechniciansInvalidate();
  const invalidateAllOfficeeManagers = useAllOfficeeManagersInvalidate();
  const invalidateAllOfficeeReceptionists =
    useAllOfficeReceptionistsInvalidate();
  const invalidateAllOfficeeDoctors = useAllOfficeDoctorsInvalidate();

  const getMutationOptions = useCallback(
    (
      mutateOptions?: CreateOfficeUserOptions<TContext>,
    ): CreateOfficeUserOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllOfficeeTechnicians(id);
        await invalidateAllOfficeeManagers(id);
        await invalidateAllOfficeeReceptionists(id);
        await invalidateAllOfficeeDoctors(id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllOfficeeManagers, id],
  );

  const mutation = useMutation({
    mutationFn: (args) => createOfficeUser(id, args),
    mutationKey: CREATE_OFFICE_USER_MUTATION_KEY(id),
    ...getMutationOptions(options),
  });

  const mutate: typeof mutation.mutate = (mutateArgs, mutateOptions?) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));

  const mutateAsync: typeof mutation.mutateAsync = (
    mutateArgs,
    mutateOptions?,
  ) => mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));

  return {
    ...mutation,
    mutate,
    mutateAsync,
  } as typeof mutation;
};

export const useForgetPassword = <TContext = unknown>(
  options?: ForgetPasswordOptions<TContext>,
) => {
  const getMutationOptions = useCallback(
    (
      mutateOptions?: ForgetPasswordOptions<TContext>,
    ): ForgetPasswordOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await ALL_USERS_QUERY_KEY;
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [ALL_USERS_QUERY_KEY],
  );

  const mutation = useMutation({
    mutationFn: (args) => forgetPassword(args),
    mutationKey: ALL_USERS_QUERY_KEY,
    ...getMutationOptions(options),
  });

  const mutate: typeof mutation.mutate = (mutateArgs, mutateOptions?) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));

  const mutateAsync: typeof mutation.mutateAsync = (
    mutateArgs,
    mutateOptions?,
  ) => mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));

  return {
    ...mutation,
    mutate,
    mutateAsync,
  } as typeof mutation;
};

export const useResetPassword = <TContext = unknown>(
  options?: ResetPasswordOptions<TContext>,
) => {
  const getMutationOptions = useCallback(
    (
      mutateOptions?: ResetPasswordOptions<TContext>,
    ): ResetPasswordOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await ALL_USERS_QUERY_KEY;
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [ALL_USERS_QUERY_KEY],
  );

  const mutation = useMutation({
    mutationFn: (args) => resetPassword(args),
    mutationKey: ALL_USERS_QUERY_KEY,
    ...getMutationOptions(options),
  });

  const mutate: typeof mutation.mutate = (mutateArgs, mutateOptions?) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));

  const mutateAsync: typeof mutation.mutateAsync = (
    mutateArgs,
    mutateOptions?,
  ) => mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));

  return {
    ...mutation,
    mutate,
    mutateAsync,
  } as typeof mutation;
};

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useMe = () =>
  useQuery({
    queryKey: CONNECTED_USER_QUERY_KEY,
    queryFn: () => getMe(),
  });

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useMeProfile = () =>
  useQuery({
    queryKey: CONNECTED_USER_PROFILE_QUERY_KEY,
    queryFn: () => getMeProfile(),
  });

/**
 * hook to invalidate the all functions query.
 * @returns The invalidation function.
 */

export const useMeInvalidate = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: CONNECTED_USER_QUERY_KEY });
};

/**
 * hook to invalidate the all functions query.
 * @returns The invalidation function.
 */

export const useMeProfileInvalidate = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: CONNECTED_USER_PROFILE_QUERY_KEY,
    });
};

/**
 * Hook to update an user.
 * @param id - The id of the user to update.
 * @param options
 * @returns The mutation state and the mutation user
 */
export const useUpdateUserPersonalInformationWithoutPicture = <
  TContext = unknown,
>(
  id: string,
  options?: UpdatePersonnalInformationWithoutPictureOptions<TContext>,
) => {
  const invalidateOneUser = useOneUserInvalidate();
  const invalidateAllUsers = useAllUsersInvalidate();
  const invalidateUseMeProfile = useMeProfileInvalidate();

  const getMutationOptions = useCallback(
    (
      mutateOptions?: UpdatePersonnalInformationWithoutPictureOptions<TContext>,
    ): UpdatePersonnalInformationWithoutPictureOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneUser(id);
        await invalidateAllUsers();
        await invalidateUseMeProfile();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateOneUser, id],
  );
  const mutation = useMutation({
    mutationFn: (args) => updateUserPersonalInformationWithoutPicture(args),
    mutationKey: getUpdateUserMutationKey(id),
    ...getMutationOptions(options),
  });

  const mutate: typeof mutation.mutate = (mutateArgs, mutateOptions?) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));

  const mutateAsync: typeof mutation.mutateAsync = (
    mutateArgs,
    mutateOptions?,
  ) => mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));

  return {
    ...mutation,
    mutate,
    mutateAsync,
  } as typeof mutation;
};

/**
 * Hook to update an user.
 * @param id - The id of the user to update.
 * @param options
 * @returns The mutation state and the mutation user
 */
export const useUpdateUserPersonalInformation = <TContext = unknown>(
  id: string,
  options?: UpdatePersonnalInformationOptions<TContext>,
) => {
  const invalidateOneUser = useOneUserInvalidate();
  const invalidateAllUsers = useAllUsersInvalidate();
  const invalidateUseMeProfile = useMeProfileInvalidate();

  const getMutationOptions = useCallback(
    (
      mutateOptions?: UpdatePersonnalInformationOptions<TContext>,
    ): UpdatePersonnalInformationOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneUser(id);
        await invalidateAllUsers();
        await invalidateUseMeProfile();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateOneUser, id],
  );
  const mutation = useMutation({
    mutationFn: (args) => {
      const formData = new FormData();
      formData.set("file", args.profileImage);

      return updateUserPersonalInformation({
        firstName: args.firstName,
        lastName: args.lastName,
        phoneNumber: args.phoneNumber,
        phonePrefix: args.phonePrefix,
        isDoctor: args.isDoctor,
        profileImage: formData,
        username: args.username,
      });
    },
    mutationKey: getUpdateUserMutationKey(id),
    ...getMutationOptions(options),
  });

  const mutate: typeof mutation.mutate = (mutateArgs, mutateOptions?) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));

  const mutateAsync: typeof mutation.mutateAsync = (
    mutateArgs,
    mutateOptions?,
  ) => mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));

  return {
    ...mutation,
    mutate,
    mutateAsync,
  } as typeof mutation;
};

/**
 * Hook to update an user.
 * @param id - The id of the user to update.
 * @param options
 * @returns The mutation state and the mutation user
 */
export const useUpdateUserStep = <TContext = unknown>(
  id: string,
  options?: UpdateUserStepOptions<TContext>,
) => {
  const invalidateOneUser = useOneUserInvalidate();
  const invalidateAllUsers = useAllUsersInvalidate();

  const getMutationOptions = useCallback(
    (
      mutateOptions?: UpdateUserStepOptions<TContext>,
    ): UpdateUserStepOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneUser(id);
        await invalidateAllUsers();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateOneUser, id],
  );
  const mutation = useMutation({
    mutationFn: (args) => updateUserStep(args),
    mutationKey: getUpdateUserMutationKey(id),
    ...getMutationOptions(options),
  });

  const mutate: typeof mutation.mutate = (mutateArgs, mutateOptions?) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));

  const mutateAsync: typeof mutation.mutateAsync = (
    mutateArgs,
    mutateOptions?,
  ) => mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));

  return {
    ...mutation,
    mutate,
    mutateAsync,
  } as typeof mutation;
};

export const useUpdateUser = <TContext = unknown>(
  id: string,
  officeId: string,
  options?: UpdateUserOptions<TContext>,
) => {
  const invalidateAllOfficeeManagers = useAllOfficeeManagersInvalidate();
  const invalidateAllOfficeeTechnicians = useAllOfficeeTechniciansInvalidate();
  const invalidateAllOfficeeReceptionists =
    useAllOfficeReceptionistsInvalidate();
  const invalidateAllOfficeeDoctor = useAllOfficeDoctorsInvalidate();
  const getMutationOptions = useCallback(
    (
      mutateOptions?: UpdateUserOptions<TContext>,
    ): UpdateUserOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllOfficeeTechnicians(officeId);
        await invalidateAllOfficeeManagers(officeId);
        await invalidateAllOfficeeReceptionists(officeId);
        await invalidateAllOfficeeDoctor(officeId);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      invalidateAllOfficeeDoctor,
      invalidateAllOfficeeManagers,
      invalidateAllOfficeeReceptionists,
      officeId,
    ],
  );

  const mutation = useMutation({
    mutationFn: (args) => updateOfficeUser(id, args),
    mutationKey: getOfficeManagersQueryKey(officeId),
    ...getMutationOptions(options),
  });

  const mutate: typeof mutation.mutate = (mutateArgs, mutateOptions?) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));

  const mutateAsync: typeof mutation.mutateAsync = (
    mutateArgs,
    mutateOptions?,
  ) => mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));

  return {
    ...mutation,
    mutate,
    mutateAsync,
  } as typeof mutation;
};

export const useDeleteOfficeUser = <TContext = unknown>(
  id: string,
  officeId: string,
  options?: DeleteOptions<TContext>,
) => {
  const invalidateAllOfficeeTechnicians = useAllOfficeeTechniciansInvalidate();
  const invalidateAllOfficeeManagers = useAllOfficeeManagersInvalidate();
  const invalidateAllOfficeeReceptionists =
    useAllOfficeReceptionistsInvalidate();
  const invalidateAllOfficeeDoctor = useAllOfficeDoctorsInvalidate();

  const getMutationOptions = useCallback(
    (mutateOptions?: DeleteOptions<TContext>): DeleteOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllOfficeeTechnicians(officeId);
        await invalidateAllOfficeeManagers(officeId);
        await invalidateAllOfficeeReceptionists(officeId);
        await invalidateAllOfficeeDoctor(officeId);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      invalidateAllOfficeeManagers,
      officeId,
      invalidateAllOfficeeReceptionists,
      invalidateAllOfficeeDoctor,
    ],
  );

  const mutation = useMutation({
    mutationFn: () => deleteOfficeUser(id),
    mutationKey: getOfficeManagersQueryKey(officeId),
    ...getMutationOptions(options),
  });

  const mutate: typeof mutation.mutate = (mutateArgs, mutateOptions?) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));

  const mutateAsync: typeof mutation.mutateAsync = (
    mutateArgs,
    mutateOptions?,
  ) => mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));

  return {
    ...mutation,
    mutate,
    mutateAsync,
  } as typeof mutation;
};

/**
 * Hook to update an user.
 * @param id - The id of the user to update.
 * @param options
 * @returns The mutation state and the mutation user
 */
export const useChoosePrimaryDoctor = <TContext = unknown>(
  options?: ChoosePrimaryDoctor<TContext>,
) => {
  const getMutationOptions = useCallback(
    (
      mutateOptions?: ChoosePrimaryDoctor<TContext>,
    ): ChoosePrimaryDoctor<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await ALL_USERS_QUERY_KEY;
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [ALL_USERS_QUERY_KEY],
  );
  const mutation = useMutation({
    // @ts-ignore
    mutationFn: (args) => choosePrimaryDoctor(args),
    mutationKey: CHOOSE_PRIMARY_DOCTOR,
    ...getMutationOptions(options),
  });

  const mutate: typeof mutation.mutate = (mutateArgs, mutateOptions?) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));

  const mutateAsync: typeof mutation.mutateAsync = (
    mutateArgs,
    mutateOptions?,
  ) => mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));

  return {
    ...mutation,
    mutate,
    mutateAsync,
  } as typeof mutation;
};

/**
 * Hook to create an department.
 * @param options
 * @returns The mutation state and the mutation department
 * @remarks
 * The mutation function automatically invalidates the all groups query on success.
 */
export const useResetUserConnectedPassword = <TContext = unknown>(
  options?: ResetUserConnectedPasswordOptions<TContext>,
) => {
  const getMutationOptions = useCallback(
    (
      mutateOptions?: ResetUserConnectedPasswordOptions<TContext>,
    ): ResetUserConnectedPasswordOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [],
  );

  const mutation = useMutation({
    // @ts-ignore
    mutationFn: (args) => resetUserConnectedPassword(args),
    mutationKey: RESET_USER_CONNECTED_MUTATION_KEY,
    ...getMutationOptions(options),
  });

  const mutate: typeof mutation.mutate = (mutateArgs, mutateOptions?) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));

  const mutateAsync: typeof mutation.mutateAsync = (
    mutateArgs,
    mutateOptions?,
  ) => mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));

  return {
    ...mutation,
    mutate,
    mutateAsync,
  } as typeof mutation;
};
