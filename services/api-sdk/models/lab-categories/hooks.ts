import { MutateOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import {
  addDefaultCategory,
  createCategory, getAllDefaultCategories, getCategoryByOfficeId, removeCategory, updateCategory
} from "./request";
import {
  AddDefaultCategoryQueryResponse,
  CreateCategoryQueryResponse,
  RemoveCategoryQueryResponse,
  UpdateCategoryQueryResponse
} from "./contracts";

/**
 * Tag for the query to fetch all offices.
 */
const ALL_OFFICES_QUERY_KEY = ["allOffices"];
const ALL_CATEGORIES_QUERY_KEY = ["allCategories"];
const ALL_CATEGORIES_BY_OFFICE_ID_QUERY_KEY =  ["allCategoriesByOfficeId"];

const getUpdateCategoryMutationKey = (id: string) => [
  "CATEGORIES",
  "UPDATE_CATEGORY",
  id,
];

/**
 * Options for the create office mutation.
 */
type CreateCategoryOptions<TContext> = MutateOptions<
  CreateCategoryQueryResponse,
  Error,
  CreateCategoryQueryResponse,
  TContext
>;

type DeleteCategoryOptions<TContext> = MutateOptions<
  RemoveCategoryQueryResponse,
  Error,
  RemoveCategoryQueryResponse,
  TContext
>;

type AddDefaultCategoryOptions<TContext> = MutateOptions<
  AddDefaultCategoryQueryResponse,
  Error,
  AddDefaultCategoryQueryResponse,
  TContext
>;

/**
 * Options for the update user mutation.
 */

type UpdateCategoryOptions<TContext> = MutateOptions<
  UpdateCategoryQueryResponse,
  Error,
  UpdateCategoryQueryResponse,
  TContext
>;

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */

export const useAllCategoriesByOfficeId = (id:string) =>
  useQuery({
    queryKey: ALL_CATEGORIES_BY_OFFICE_ID_QUERY_KEY,
    queryFn: () => getCategoryByOfficeId(id),
    enabled: !!id,
  });

export const useAllCategoriesByOfficeIdInvalidate = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ALL_CATEGORIES_BY_OFFICE_ID_QUERY_KEY,
    });
};
/**
 * Hook to create an event.
 * @param options
 * @returns The mutation state and the mutation function
 * @remarks
 * The mutation function automatically invalidates the all events query on success.
 */
export const useCreateCategory = <TContext = unknown>(
  options?: CreateCategoryOptions<TContext>,
) => {
  const invalidateOfficeCategory = useAllCategoriesByOfficeIdInvalidate();
  const getMutationOptions = useCallback(
    (
      mutateOptions?: CreateCategoryOptions<TContext>,
    ): CreateCategoryOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOfficeCategory();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateOfficeCategory],
  );

  const mutation = useMutation({
    mutationFn: (args) => createCategory(args),
    mutationKey: ALL_CATEGORIES_BY_OFFICE_ID_QUERY_KEY,
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
export const useUpdateCategory = <TContext = unknown>(
  id: string,
  options?: UpdateCategoryOptions<TContext>,
) => {
  const invalidateOfficeCategory = useAllCategoriesByOfficeIdInvalidate();
  const getMutationOptions = useCallback(
    (
      mutateOptions?: UpdateCategoryOptions<TContext>,
    ): UpdateCategoryOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOfficeCategory();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateOfficeCategory],
  );
  const mutation = useMutation({
    // @ts-ignore
    mutationFn: (args) => updateCategory(id, args),
    mutationKey: getUpdateCategoryMutationKey(id),
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


export const useAllCategories = () => {
  return useQuery({
    queryKey: ALL_CATEGORIES_QUERY_KEY,
    queryFn: () => getAllDefaultCategories(),
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
export const useAddDefaultCategory = <TContext = unknown>(
  options?: AddDefaultCategoryOptions<TContext>,
) => {
  const invalidateOfficeCategory = useAllCategoriesByOfficeIdInvalidate();
  const getMutationOptions = useCallback(
    (
      mutateOptions?: AddDefaultCategoryOptions<TContext>,
    ): AddDefaultCategoryOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOfficeCategory();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateOfficeCategory],
  );

  const mutation = useMutation({
    // @ts-ignore
    mutationFn: (args) => addDefaultCategory(args),
    mutationKey: ALL_CATEGORIES_BY_OFFICE_ID_QUERY_KEY,
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
export const useDeleteCategory = <TContext = unknown>(
  id: string,
  options?: DeleteCategoryOptions<TContext>,
) => {
  const invalidateOfficeCategory = useAllCategoriesByOfficeIdInvalidate();
  const getMutationOptions = useCallback(
    (
      mutateOptions?: DeleteCategoryOptions<TContext>,
    ): DeleteCategoryOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOfficeCategory();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateOfficeCategory],
  );
  const mutation = useMutation({
    // @ts-ignore
    mutationFn: (args) => removeCategory(id, args),
    mutationKey: getUpdateCategoryMutationKey(id),
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
