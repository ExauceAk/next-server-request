"use client";

import {
  createReferral,
  getAllDoctorsCanReferred,
  sendInviteToOffice,
  sendSmsToPatient, verifyNumberByUser,
  verifyPatientNumber
} from "@/services/api-sdk/models/referral/requests";
import {
  CreateReferralArgs,
  NewInvitation,
  SendInviteToNewSpecialistOfficeArgs,
  SendSmsToPatientArgs, VerifyNumberByPatientArgs,
  VerifyPatientNumberArgs,
} from "@/services/api-sdk/types/referrals";
import {
  MutateOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";
import { useAllOfficeCasesInvalidate } from "../cases/hooks";

/**
 * Tag for the query to fetch all functions.
 */
const ALL_REFERRED_DOCTOR_QUERY_KEY = ["allDoctorsCanReferred"];

const SEND_INVITE_TO_NEW_SPECIALIST_OFFICE = [
  "sendInviteToNewSpecialistOffice",
];

export const CREATE_REFERRAL_MUTATION_KEY = ["createReferral"];

const VERIFY_PATIENT_PHONE_NUMBER = ["verifyPatientPhoneNumber"];

const VERIFY_NUMBER_BY_PATIENT = ["verifyPhoneNumberByPatient"];

const SEND_SMS_TO_PATIENT = ["sendSmsToPatient"];

/**
 * Options for the sendInviteToOffice mutation.
 */

type SendInviteOptions<TContext> = MutateOptions<
  NewInvitation | any,
  Error,
  SendInviteToNewSpecialistOfficeArgs,
  TContext
>;

type CreateReferralOptions<TContext> = MutateOptions<
  void,
  Error,
  CreateReferralArgs,
  TContext
>;

/**
 * Options for the verifyPatientNumber mutation.
 */

type VerifyPatientNumberOptions<TContext> = MutateOptions<
  void,
  Error,
  VerifyPatientNumberArgs,
  TContext
>;

/**
 * Options for the verifyPatientNumber mutation.
 */

type VerifyNumberByPatientOptions<TContext> = MutateOptions<
    void,
    Error,
    VerifyNumberByPatientArgs,
    TContext
>;

/**
 * Options for the verifyPatientNumber mutation.
 */

type SendSmsToPatientOptions<TContext> = MutateOptions<
  void,
  Error,
  SendSmsToPatientArgs,
  TContext
>;

/**
 * Hook to fetch all functions.
 * @returns The query state.
 */
export const useAllDoctorsCanReferred = () =>
  useQuery({
    queryKey: ALL_REFERRED_DOCTOR_QUERY_KEY,
    queryFn: () => getAllDoctorsCanReferred(),
  });

/**
 * hook to invalidate the all functions query.
 * @returns The invalidation function.
 */

export const useAllDoctorsCanReferredInvalidate = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: ALL_REFERRED_DOCTOR_QUERY_KEY });
};

/**
 * Hook to create an event.
 * @param options
 * @returns The mutation state and the mutation function
 * @remarks
 * The mutation function automatically invalidates the all events query on success.
 */
export const useSendInviteToOffice = <TContext = unknown>(
  options?: SendInviteOptions<TContext>,
) => {
  const getMutationOptions = useCallback(
    (
      mutateOptions?: SendInviteOptions<TContext>,
    ): SendInviteOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await SEND_INVITE_TO_NEW_SPECIALIST_OFFICE;
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [SEND_INVITE_TO_NEW_SPECIALIST_OFFICE],
  );

  const mutation = useMutation({
    // @ts-ignore
    mutationFn: (args) => sendInviteToOffice(args),
    mutationKey: SEND_INVITE_TO_NEW_SPECIALIST_OFFICE,
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
export const useVerifyUserPhoneNumber = <TContext = unknown>(
  options?: VerifyPatientNumberOptions<TContext>,
) => {
  const getMutationOptions = useCallback(
    (
      mutateOptions?: VerifyPatientNumberOptions<TContext>,
    ): VerifyPatientNumberOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await VERIFY_PATIENT_PHONE_NUMBER;
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [VERIFY_PATIENT_PHONE_NUMBER],
  );

  const mutation = useMutation({
    mutationFn: (args) => verifyPatientNumber(args),
    mutationKey: VERIFY_PATIENT_PHONE_NUMBER,
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
export const useVerifyPhoneNumberByUser = <TContext = unknown>(
  options?: VerifyNumberByPatientOptions<TContext>,
) => {
  const getMutationOptions = useCallback(
    (
      mutateOptions?: VerifyNumberByPatientOptions<TContext>,
    ): VerifyNumberByPatientOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await VERIFY_NUMBER_BY_PATIENT;
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [VERIFY_NUMBER_BY_PATIENT],
  );

  const mutation = useMutation({
    mutationFn: (args) => verifyNumberByUser(args),
    mutationKey: VERIFY_NUMBER_BY_PATIENT,
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
export const useSendSmsToPatient = <TContext = unknown>(
  options?: SendSmsToPatientOptions<TContext>,
) => {
  const getMutationOptions = useCallback(
    (
      mutateOptions?: SendSmsToPatientOptions<TContext>,
    ): SendSmsToPatientOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await SEND_SMS_TO_PATIENT;
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [SEND_SMS_TO_PATIENT],
  );

  const mutation = useMutation({
    mutationFn: (args) => sendSmsToPatient(args),
    mutationKey: SEND_SMS_TO_PATIENT,
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

export const useCreateReferral = <TContext = unknown>(
  options?: CreateReferralOptions<TContext>,
) => {
  const invalidateReferal = useAllOfficeCasesInvalidate();
  const getMutationOptions = useCallback(
    (
      mutateOptions?: CreateReferralOptions<TContext>,
    ): CreateReferralOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateReferal();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [],
  );

  const mutation = useMutation({
    mutationFn: (args) => createReferral(args),
    mutationKey: CREATE_REFERRAL_MUTATION_KEY,
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
