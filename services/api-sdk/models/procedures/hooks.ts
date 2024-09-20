import {
  MutateOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";

import {
  addDefaultProcedure,
  createProcedure,
  getAllGeneralProcedure,
  getAllSpecialProcedure, getCategoriesByOfficeId,
  getProcedureByOfficeId,
  removeProcedure,
  updateProcedure
} from "./request";
import {
  AddDefaultProcedureQueryResponse,
  CreateProcedureQueryResponse,
  RemoveProcedureQueryResponse,
  UpdateProcedureQueryResponse,
} from "./contracts";

/**
 * Tag for the query to fetch all offices.
 */
const ALL_OFFICES_QUERY_KEY = ["allOffices"];
const ALL_PROCEDURES_QUERY_KEY = ["allProcedures"];
const ALL_SPECIALIST_PROCEDURES_QUERY_KEY = (speciality: string) => [
  "allSpecialistProcedures",
  speciality,
];
const ALL_PROCEDURES_BY_OFFICE_ID_QUERY_KEY = ["allProceduresByOfficeId"];

const getUpdateOfficeMutationKey = (id: string) => [
  "OFFICES",
  "UPDATE_OFFICE",
  id,
];

/**
 * Options for the create office mutation.
 */
type CreateProcedureOptions<TContext> = MutateOptions<
  CreateProcedureQueryResponse,
  Error,
  CreateProcedureQueryResponse,
  TContext
>;

type DeleteProcedureOptions<TContext> = MutateOptions<
  RemoveProcedureQueryResponse,
  Error,
  RemoveProcedureQueryResponse,
  TContext
>;

type AddDefaultProcedureOptions<TContext> = MutateOptions<
  AddDefaultProcedureQueryResponse,
  Error,
  AddDefaultProcedureQueryResponse,
  TContext
>;

/**
 * Options for the update user mutation.
 */

type UpdateProcedureOptions<TContext> = MutateOptions<
  UpdateProcedureQueryResponse,
  Error,
  UpdateProcedureQueryResponse,
  TContext
>;

const ALL_PROCEDURE_QUERY_KEY = (id: string) => [
  "allProcedure",
  "oneProcedure",
  id,
];
/**
 * Hook to fetch all functions.
 * @returns The query state.
 */

export const useAllProcedureByOfficeId = (id: string) =>
  useQuery({
    queryKey: ALL_PROCEDURES_BY_OFFICE_ID_QUERY_KEY,
    queryFn: () => getProcedureByOfficeId(id),
    enabled: !!id,
  });

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */

export const useAllCategoriesByOfficeId = (id: string) =>
  useQuery({
    queryKey: ALL_PROCEDURES_BY_OFFICE_ID_QUERY_KEY,
    queryFn: () => getCategoriesByOfficeId(id),
    enabled: !!id,
  });

export const useAllProcedureByOfficeIdInvalidate = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ALL_PROCEDURES_BY_OFFICE_ID_QUERY_KEY,
    });
};
/**
 * Hook to create an event.
 * @param options
 * @returns The mutation state and the mutation function
 * @remarks
 * The mutation function automatically invalidates the all events query on success.
 */
export const useCreateProcedure = <TContext = unknown>(
  options?: CreateProcedureOptions<TContext>,
) => {
  const invalidateOfficeProcedure = useAllProcedureByOfficeIdInvalidate();
  const getMutationOptions = useCallback(
    (
      mutateOptions?: CreateProcedureOptions<TContext>,
    ): CreateProcedureOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOfficeProcedure();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateOfficeProcedure],
  );

  const mutation = useMutation({
    mutationFn: (args) => createProcedure(args),
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
export const useUpdateProcedure = <TContext = unknown>(
  id: string,
  options?: UpdateProcedureOptions<TContext>,
) => {
  const invalidateOfficeProcedure = useAllProcedureByOfficeIdInvalidate();
  const getMutationOptions = useCallback(
    (
      mutateOptions?: UpdateProcedureOptions<TContext>,
    ): UpdateProcedureOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOfficeProcedure();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateOfficeProcedure],
  );
  const mutation = useMutation({
    // @ts-ignore
    mutationFn: (args) => updateProcedure(id, args),
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

export const useAllProcedures = () => {
  return useQuery({
    queryKey: ALL_PROCEDURES_QUERY_KEY,
    queryFn: () => getAllGeneralProcedure(),
  });
};

export const useAllSpecialProcedures = (speciality: string) => {
  return useQuery({
    queryKey: ALL_SPECIALIST_PROCEDURES_QUERY_KEY(speciality),
    queryFn: () => getAllSpecialProcedure(speciality),
  });
};

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */

/**
 * Hook to create an event.
 * @param options
 * @returns The mutation state and the mutation function
 * @remarks
 * The mutation function automatically invalidates the all events query on success.
 */
export const useAddDefaultProcedure = <TContext = unknown>(
  options?: AddDefaultProcedureOptions<TContext>,
) => {
  const invalidateOfficeProcedure = useAllProcedureByOfficeIdInvalidate();
  const getMutationOptions = useCallback(
    (
      mutateOptions?: AddDefaultProcedureOptions<TContext>,
    ): AddDefaultProcedureOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOfficeProcedure();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateOfficeProcedure],
  );

  const mutation = useMutation({
    // @ts-ignore
    mutationFn: (args) => addDefaultProcedure(args),
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
export const useDeleteProcedure = <TContext = unknown>(
  id: string,
  options?: DeleteProcedureOptions<TContext>,
) => {
  const invalidateOfficeProcedure = useAllProcedureByOfficeIdInvalidate();
  const getMutationOptions = useCallback(
    (
      mutateOptions?: DeleteProcedureOptions<TContext>,
    ): DeleteProcedureOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOfficeProcedure();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateOfficeProcedure],
  );
  const mutation = useMutation({
    // @ts-ignore
    mutationFn: (args) => removeProcedure(id, args),
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
