"use client";

import {
  approveNewReferral,
  completeAndAddProcedure,
  completeCase,
  getAllOfficeCases,
  getCasesOneChat,
  getOneCase,
  getOneCaseTimeline,
  rejectNewReferral,
  scheduleCase,
  updateCaseProcedure,
} from "@/services/api-sdk/models/cases/requests";
import {
  MutateOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";
import {
  CompleteAndAddProcedureArgs,
  CompleteCaseArgs,
  RejectNewReferralArgs,
  ScheduleCaseArgs,
  UpdateCaseProcedureArgs,
} from "../../types/cases";
import { CreateReferralArgs } from "@/services/api-sdk/types/referrals";
import { createReferral } from "@/services/api-sdk/models/referral/requests";
import { CREATE_REFERRAL_MUTATION_KEY } from "@/services/api-sdk/models/referral/hooks";

/**
 * Tag for the query to fetch all functions.
 */
export const ALL_OFFICES_CASES_QUERY_KEY = ["all-cases-for-my-office"];

export const ALL_OFFICES_CASES_ONE_CHAT_QUERY_KEY = [
  "all-cases-for-my-office-one-chat",
];

const ONE_CASE_OFFICES_QUERY_KEY = (id: string) => ["one-offices-Case", id];

const ONE_CASE_TIMELINE_QUERY_KEY = (id: string) => ["one-timeline-Case", id];

export const updateCaseProcedureMutationKey = (id: string) => [
  "PROCEDURE",
  "UPDATE_PROCEDURE",
  id,
];

const getApproveNewReferralMutationKey = (id: string) => [
  "Cases",
  "approve-new-referral",
  id,
];

const getRejectNewReferralMutationKey = (id: string) => [
  "Cases",
  "reject-new-referral",
  id,
];

const getNewReferralScheduledMutationKey = (id: string) => [
  "Cases",
  "scheduled-new-referral",
  id,
];

const getNewReferralCompleteAndAddProcedureMutationKey = (id: string) => [
  "Cases",
  "complete-and-add-procedure-to-case",
  id,
];

export const COMPLETE_CASE_KEY = ["completeCase"];

type ApproveNewReferralOptions<TContext> = MutateOptions<void, Error, TContext>;

type RejectNewReferralOptions<TContext> = MutateOptions<
  void,
  Error,
  RejectNewReferralArgs,
  TContext
>;

type ScheduleNewReferralOptions<TContext> = MutateOptions<
  void,
  Error,
  ScheduleCaseArgs,
  TContext
>;

type CompleteAndAddProcedureNewReferralOptions<TContext> = MutateOptions<
  void,
  Error,
  CompleteAndAddProcedureArgs,
  TContext
>;

type CompleteCaseOptions<TContext> = MutateOptions<
  void,
  Error,
  CompleteCaseArgs,
  TContext
>;

/**
 * Options for the update procedure mutation.
 */
type UpdateProcedureOptions<TContext> = MutateOptions<
  void,
  Error,
  UpdateCaseProcedureArgs,
  TContext
>;

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useCasesOneChat = (id: string) =>
  useQuery({
    queryKey: ALL_OFFICES_CASES_ONE_CHAT_QUERY_KEY,
    queryFn: () => getCasesOneChat(id),
  });

export const useCasesOneChatInvalidate = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ALL_OFFICES_CASES_ONE_CHAT_QUERY_KEY,
    });
};

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useAllOfficeCases = (id: string) =>
  useQuery({
    queryKey: ALL_OFFICES_CASES_QUERY_KEY,
    queryFn: () => getAllOfficeCases(id),
  });

export const useAllOfficeCasesInvalidate = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ALL_OFFICES_CASES_QUERY_KEY,
    });
};

export const useOneCase = (id: string) =>
  useQuery({
    queryKey: ONE_CASE_OFFICES_QUERY_KEY(id),
    queryFn: () => getOneCase(id),
  });

export const useOneCaseInvalidate = () => {
  const queryClient = useQueryClient();
  return (id: string) =>
    queryClient.invalidateQueries({ queryKey: ONE_CASE_OFFICES_QUERY_KEY(id) });
};

export const useOneCaseTimeline = (id: string) =>
  useQuery({
    queryKey: ONE_CASE_TIMELINE_QUERY_KEY(id),
    queryFn: () => getOneCaseTimeline(id),
  });

export const useUpdateCaseProcedure = <TContext = unknown>(
  id: string,
  options?: UpdateProcedureOptions<TContext>,
) => {
  const invalidateOneCase = useOneCaseInvalidate();

  const getMutationOptions = useCallback(
    (
      mutateOptions?: UpdateProcedureOptions<TContext>,
    ): UpdateProcedureOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneCase(id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateOneCase, id],
  );
  const mutation = useMutation({
    // @ts-ignore
    mutationFn: (args) => updateCaseProcedure(id, args),
    mutationKey: updateCaseProcedureMutationKey(id),
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
export const useApproveReferral = <TContext = unknown>(
  id: string,
  options?: ApproveNewReferralOptions<TContext>,
) => {
  const invalidateAllOfficeCase = useAllOfficeCasesInvalidate();
  const invalidateOneCase = useOneCaseInvalidate();

  const getMutationOptions = useCallback(
    (
      mutateOptions?: ApproveNewReferralOptions<TContext>,
    ): ApproveNewReferralOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllOfficeCase();
        await invalidateOneCase(id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllOfficeCase, invalidateOneCase, id],
  );
  const mutation = useMutation({
    mutationFn: () => approveNewReferral(id),
    mutationKey: getApproveNewReferralMutationKey(id),
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

export const useRejectNewReferral = <TContext = unknown>(
  id: string,
  options?: RejectNewReferralOptions<TContext>,
) => {
  const invalidateAllOfficeCase = useAllOfficeCasesInvalidate();
  const invalidateOneCase = useOneCaseInvalidate();

  const getMutationOptions = useCallback(
    (
      mutateOptions?: RejectNewReferralOptions<TContext>,
    ): RejectNewReferralOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllOfficeCase();
        await invalidateOneCase(id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllOfficeCase, id],
  );
  const mutation = useMutation({
    mutationFn: (args) => rejectNewReferral(id, args),
    mutationKey: getRejectNewReferralMutationKey(id),
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

export const useScheduleNewReferral = <TContext = unknown>(
  id: string,
  options?: ScheduleNewReferralOptions<TContext>,
) => {
  const invalidateAllOfficeCase = useAllOfficeCasesInvalidate();
  const invalidateOneCase = useOneCaseInvalidate();

  const getMutationOptions = useCallback(
    (
      mutateOptions?: ScheduleNewReferralOptions<TContext>,
    ): ScheduleNewReferralOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllOfficeCase();
        await invalidateOneCase(id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllOfficeCase, invalidateOneCase, id],
  );
  const mutation = useMutation({
    mutationFn: (args) => scheduleCase(id, args),
    mutationKey: getNewReferralScheduledMutationKey(id),
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

export const useCompleteAndAddProcedureToCase = <TContext = unknown>(
  id: string,
  options?: CompleteAndAddProcedureNewReferralOptions<TContext>,
) => {
  const invalidateAllOfficeCase = useAllOfficeCasesInvalidate();
  const invalidateOneCase = useOneCaseInvalidate();

  const getMutationOptions = useCallback(
    (
      mutateOptions?: CompleteAndAddProcedureNewReferralOptions<TContext>,
    ): CompleteAndAddProcedureNewReferralOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllOfficeCase();
        await invalidateOneCase(id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllOfficeCase, invalidateOneCase, id],
  );
  const mutation = useMutation({
    mutationFn: (args) => completeAndAddProcedure(id, args),
    mutationKey: getNewReferralCompleteAndAddProcedureMutationKey(id),
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

export const useCompleteCase = <TContext = unknown>(
  id: string,
  options?: CompleteCaseOptions<TContext>,
) => {
  const invalidateAllOfficeCase = useAllOfficeCasesInvalidate();
  const invalidateOneCase = useOneCaseInvalidate();
  const getMutationOptions = useCallback(
    (
      mutateOptions?: CompleteCaseOptions<TContext>,
    ): CompleteCaseOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllOfficeCase();
        await invalidateOneCase(id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateOneCase, invalidateAllOfficeCase],
  );

  const mutation = useMutation({
    mutationFn: (args) => completeCase(id, args),
    mutationKey: COMPLETE_CASE_KEY,
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
