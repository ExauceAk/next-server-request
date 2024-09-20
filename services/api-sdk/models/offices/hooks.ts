import { MutateOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useOneOfficeSpecialistInvalidate } from "@/services/api-sdk/models/speciality/hooks";
import {
  CheckOfficeAddressExistArgs,
  CheckOfficeAddressExistResponse,
  CreateOfficeArgs,
  CreateOfficeWithoutLogoArgs,
  UpdateOfficeArgs,
  UpdateOfficeWithoutLogoArgs
} from "../../types/offices";
import {
  checkOfficeLocation,
  createOffice,
  createOfficeWithoutLogo, getOneOffice,
  getUserConnectedAllOffice,
  getUserConnectedFirstOffice,
  updateOffice,
  updateOfficeWithoutLogo
} from "./request";
import { ALL_OFFICES_CASES_QUERY_KEY } from "@/services/api-sdk/models/cases/hooks";


/**
 * Tag for the query to fetch all offices.
 */
const ALL_OFFICES_QUERY_KEY = ["allOffices"];

const FIRST_OFFICE_FOR_CONNECTED_USER_QUERY_KEY = [
  "firstOfficeForConnectedUser",
];

const All_OFFICE_FOR_CONNECTED_USER_QUERY_KEY = ["allOfficeForConnectedUser"];

export const CHECK_OFFICE_LOCATION_EXIST_QUERY_KEY = ["checkOfficeLocationExist"];

const getUpdateOfficeMutationKey = (id: string) => [
  "OFFICES",
  "UPDATE_OFFICE",
  id,
];

const getOneOfficeKey = (id: string) => [
  "OFFICES",
  "ONE_OFFICE",
  id,
];

/**
 * Options for the create office mutation.
 */
type CreateOfficeOptions<TContext> = MutateOptions<
  void,
  Error,
  CreateOfficeArgs,
  TContext
>;

/**
 * Options for the create office mutation.
 */
type CreateOfficeWithoutLogoOptions<TContext> = MutateOptions<
  void,
  Error,
  CreateOfficeWithoutLogoArgs,
  TContext
>;

/**
 * Options for the update user mutation.
 */

type UpdateOfficeOptions<TContext> = MutateOptions<
  void,
  Error,
  UpdateOfficeArgs,
  TContext
>;

/**
 * Options for the update user mutation.
 */

type UpdateOfficeWithoutLogoOptions<TContext> = MutateOptions<
  void,
  Error,
  UpdateOfficeWithoutLogoArgs,
  TContext
>;

/**
 * Options for check office address exist.
 */
type CheckOfficeLocationExistOptions<TContext> = MutateOptions<CheckOfficeAddressExistResponse, Error, CheckOfficeAddressExistArgs, TContext>;

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useFirstOfficeForConnectedUser = () =>
  useQuery({
    queryKey: FIRST_OFFICE_FOR_CONNECTED_USER_QUERY_KEY,
    queryFn: () => getUserConnectedFirstOffice(),
  });

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useOneOffice = (id: string) =>
  useQuery({
    queryKey: getOneOfficeKey(id),
    queryFn: () => getOneOffice(id),
  });

export const useOneOfficeInvalidate = () => {
  const queryClient = useQueryClient();
  return (id: string) =>
    queryClient.invalidateQueries({
      queryKey: getOneOfficeKey(id),
    });
};


/**
 * Hook to fetch all offices.
 * @returns The query state.
 */

export const useAllOfficeForConnectedUser = () =>
  useQuery({
    queryKey: All_OFFICE_FOR_CONNECTED_USER_QUERY_KEY,
    queryFn: () => getUserConnectedAllOffice(),
  });

export const useAllOfficeForConnectedUserInvalidate = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: All_OFFICE_FOR_CONNECTED_USER_QUERY_KEY,
    });
};

/**
 * Hook to create an event.
 * @param options
 * @returns The mutation state and the mutation function
 * @remarks
 * The mutation function automatically invalidates the all events query on success.
 */
export const useCreateOffice = <TContext = unknown>(
  options?: CreateOfficeOptions<TContext>,
) => {

  const invalidateAllOffice = useAllOfficeForConnectedUserInvalidate()
  const getMutationOptions = useCallback(
    (
      mutateOptions?: CreateOfficeOptions<TContext>,
    ): CreateOfficeOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await ALL_OFFICES_QUERY_KEY;
        await invalidateAllOffice();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [ALL_OFFICES_QUERY_KEY, invalidateAllOffice],
  );

  const mutation = useMutation({
    mutationFn: (args) => {
      const formData = new FormData();
      formData.set("file", args.logo);

      return createOffice({
        location: args.location,
        name: args.name,
        email: args.email,
        phoneNumber: args.phoneNumber,
        phonePrefix: args.phonePrefix,
        licenceNumber: args.licenceNumber,
        speciality: args.speciality,
        timezone: args.timezone,
        videoLink: args.videoLink,
        website: args.website,
        typeOffice: args.typeOffice,
        logo: formData,
        zipCode : args.zipCode,
        state : args.state,
        city : args.city,
      });
    },
    mutationKey: ALL_OFFICES_QUERY_KEY,
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
 * Hook to create an event.
 * @param options
 * @returns The mutation state and the mutation function
 * @remarks
 * The mutation function automatically invalidates the all events query on success.
 */
export const useCreateOfficeWithoutLogo = <TContext = unknown>(
  options?: CreateOfficeWithoutLogoOptions<TContext>,
) => {
  const invalidateAllOffice = useAllOfficeForConnectedUserInvalidate()
  const getMutationOptions = useCallback(
    (
      mutateOptions?: CreateOfficeWithoutLogoOptions<TContext>,
    ): CreateOfficeWithoutLogoOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await ALL_OFFICES_QUERY_KEY;
        await invalidateAllOffice();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [ALL_OFFICES_QUERY_KEY, invalidateAllOffice],
  );

  const mutation = useMutation({
    mutationFn: (args) => createOfficeWithoutLogo(args),
    mutationKey: ALL_OFFICES_QUERY_KEY,
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
export const useUpdateOffice = <TContext = unknown>(
  id: string,
  options?: UpdateOfficeOptions<TContext>,
) => {
  const invalidateOneOfficeSpecialist = useOneOfficeSpecialistInvalidate();
  const invalidateOneOffice = useOneOfficeInvalidate();
  const getMutationOptions = useCallback(
    (
      mutateOptions?: UpdateOfficeOptions<TContext>,
    ): UpdateOfficeOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await ALL_OFFICES_QUERY_KEY;
        await invalidateOneOfficeSpecialist(id);
        await invalidateOneOffice(id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [ALL_OFFICES_QUERY_KEY],
  );
  const mutation = useMutation({
    // @ts-ignore
    mutationFn: (args) => {
      const formData = new FormData();
      formData.set("file", args.logo);

      return updateOffice(id, {
        location: args.location,
        name: args.name,
        email: args.email,
        phoneNumber: args.phoneNumber,
        phonePrefix: args.phonePrefix,
        licenceNumber: args.licenceNumber,
        speciality: args.speciality,
        timezone: args.timezone,
        videoLink: args.videoLink,
        website: args.website,
        typeOffice: args.typeOffice,
        logo: formData,
        zipCode : args.zipCode,
        state : args.state,
        city : args.city,
      });
    },
    mutationKey: getUpdateOfficeMutationKey(id),
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
export const useUpdateOfficeWithoutLogo = <TContext = unknown>(
  id: string,
  options?: UpdateOfficeWithoutLogoOptions<TContext>,
) => {
  const invalidateOneOfficeSpecialist = useOneOfficeSpecialistInvalidate();
  const invalidateOneOffice = useOneOfficeInvalidate();
  const getMutationOptions = useCallback(
    (
      mutateOptions?: UpdateOfficeWithoutLogoOptions<TContext>,
    ): UpdateOfficeWithoutLogoOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await ALL_OFFICES_QUERY_KEY;
        await invalidateOneOfficeSpecialist(id);
        await invalidateOneOffice(id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [ALL_OFFICES_QUERY_KEY],
  );
  const mutation = useMutation({
    // @ts-ignore
    mutationFn: (args) => updateOfficeWithoutLogo(id, args),
    mutationKey: getUpdateOfficeMutationKey(id),
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

export const useCheckOfficeLocation = <TContext = unknown>(options?: CheckOfficeLocationExistOptions<TContext>) => {
  const getMutationOptions = useCallback(
    (mutateOptions?: CheckOfficeLocationExistOptions<TContext>): CheckOfficeLocationExistOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await CHECK_OFFICE_LOCATION_EXIST_QUERY_KEY;
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [CHECK_OFFICE_LOCATION_EXIST_QUERY_KEY],
  );

  const mutation = useMutation({
    mutationFn: (args) => checkOfficeLocation(args),
    mutationKey: CHECK_OFFICE_LOCATION_EXIST_QUERY_KEY,
    ...getMutationOptions(options),
  });

  const mutate: typeof mutation.mutate = (mutateArgs, mutateOptions?) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));

  const mutateAsync: typeof mutation.mutateAsync = (mutateArgs, mutateOptions?) =>
    mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));

  return {
    ...mutation,
    mutate,
    mutateAsync,
  } as typeof mutation;
};
