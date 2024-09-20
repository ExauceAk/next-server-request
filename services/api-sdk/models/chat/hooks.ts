import {
  MutateOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addNewGuest,
  createChatMessage,
  getAllChatrooms,
  getAllChatroomsPaticipant,
  getAllChatroomsSearch,
  getChatroomsMediaAndFiles,
  getMasterChat,
} from "./requests";
import { AddNewGuestArgs, CreateChatMessageArgs } from "./contracts";
import { useCallback } from "react";

/**
 * Tag for the query to fetch all timezone by country.
 */
export const ALL_CHATROOMS_SEARCH_QUERY_KEY = (name: string) => [
  "CHATROOMS",
  "ALLCHATROOMS",
  "SEARCH",
  name,
];
export const ALL_CHATROOMS_QUERY_KEY = ["CHATROOMS", "ALLCHATROOMS"];
export const ALL_CHATROOMS_MEDIA_AND_FILES_QUERY_KEY = (id: string) => [
  "CHATROOMS",
  "ALLCHATROOMS",
  "MEDIAANDFILES",
  id,
];

export const MASTER_CHAT_QUERY_KEY = ["MASTERCHAT"];

export const ALL_CHATROOMS_PATICIPANT_QUERY_KEY = [
  "CHATROOMS",
  "ALLCHATROOMSPATICIPANT",
];

export const ADD_NEW_GUEST_MUTATION_KEY = ["addNewGuest"];

export const CREATE_CHAT_MESSAGE_MUTATION_KEY = ["createChatMessage"];

/**
 * Options for the createReferral mutation.
 */

type CreateChatMessageOptions<TContext> = MutateOptions<
  void,
  Error,
  CreateChatMessageArgs,
  TContext
>;

type AddNewGuestOptions<TContext> = MutateOptions<
  any,
  Error,
  AddNewGuestArgs,
  TContext
>;

/**
 * Hook to fetch all chatrooms.
 * @returns A query object that can be used to fetch the data.
 */
export const useAllChatroomSearch = (name: string) =>
  useQuery({
    queryKey: ALL_CHATROOMS_SEARCH_QUERY_KEY(name),
    queryFn: () => getAllChatroomsSearch(name),
  });

/**
 * Hook to fetch all chatrooms.
 * @returns A query object that can be used to fetch the data.
 */
export const useAllChatroom = () =>
  useQuery({
    queryKey: ALL_CHATROOMS_QUERY_KEY,
    queryFn: () => getAllChatrooms(),
  });

/**
 * Hook to fetch file on chatrooms.
 * @returns A query object that can be used to fetch the data.
 */
export const useChatroomsMediaAndFiles = (id: string) =>
  useQuery({
    queryKey: ALL_CHATROOMS_MEDIA_AND_FILES_QUERY_KEY(id),
    queryFn: () => getChatroomsMediaAndFiles(id),
  });

/**
 * Hook to fetch master chat.
 * @returns A query object that can be used to fetch the data.
 */
export const useMasterChat = () =>
  useQuery({
    queryKey: MASTER_CHAT_QUERY_KEY,
    queryFn: () => getMasterChat(),
  });

/**
 * Hook to fetch all chatrooms paticipants.
 * @returns A query object that can be used to fetch the data.
 */

export const useAllChatroomPaticipants = (id: string) =>
  useQuery({
    queryKey: ALL_CHATROOMS_PATICIPANT_QUERY_KEY,
    queryFn: () => getAllChatroomsPaticipant(id),
  });

/**
 * Hook to invalidate the query for all chatrooms.
 * @returns A function that can be used to invalidate the query.
 */

export const useChatroomInvalidate = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ALL_CHATROOMS_QUERY_KEY,
    });
};

/**
 * Hook to create an message.
 * @param options
 * @returns The mutation state and the mutation function
 * @remarks
 * The mutation function automatically invalidates the all messages query on success.
 */

export const useCreateChatMessage = <TContext = unknown>(
  chatroom: string,
  options?: CreateChatMessageOptions<TContext>,
) => {
  // No need to invalidate chatroom
  // const invalidateChatroom = useChatroomInvalidate();
  const getMutationOptions = useCallback(
    (
      mutateOptions?: CreateChatMessageOptions<TContext>,
    ): CreateChatMessageOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        // await invalidateChatroom();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [],
  );

  const mutation = useMutation({
    mutationFn: (args) => createChatMessage(args, chatroom),
    mutationKey: CREATE_CHAT_MESSAGE_MUTATION_KEY,
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

export const useAddNewGuest = <TContext = unknown>(
  options?: AddNewGuestOptions<TContext>,
) => {
  // const invalidateAllOfficeeTechnicians = useAllOfficeeTechniciansInvalidate();

  const getMutationOptions = useCallback(
    (
      mutateOptions?: AddNewGuestOptions<TContext>,
    ): AddNewGuestOptions<TContext> => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        // await invalidateAllOfficeeDoctors(id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [],
  );

  const mutation = useMutation({
    mutationFn: (args) => addNewGuest(args),
    mutationKey: ADD_NEW_GUEST_MUTATION_KEY,
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
