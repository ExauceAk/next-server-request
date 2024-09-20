"use server";

import { ApiError } from "@/services/api-sdk/errors";
import { FetchService } from "@/services/api-sdk/lib/utils/fetch";
import {
  AddNewGuestArgs,
  AddNewGuestRequestBody,
  AllChatQueryResponse,
  AllChatroomPaticipantQueryResponse,
  AllChatroomQueryResponse,
  AllChatroomSearchQueryResponse,
  ChatroomMediaAndFilesQueryResponse,
  CreateChatMessageArgs,
  DATA_BODY_KEY,
  MasterChatQueryResponse,
} from "@/services/api-sdk/models/chat/contracts";
import {
  Chat,
  Chatroom,
  ChatroomMediaAndFiles,
  ChatroomPaticipant,
  CMessage,
  MasterChatMessage,
} from "@/services/api-sdk/types/chat";
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import { getToken } from "@/utils/user-token";

const fetchService: FetchService = new FetchService({
  requestInterceptor: async (config) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${await getToken()}`,
    },
  }),
});

// const fetchService: FetchService = new FetchService();

/**
 * Fetches all chats from the server.
 * @returns A promise that resolves to an array of chats.
 * @throws {ApiError} if the request fails.
 */

export const getAllChat = async (id: string): Promise<Chat[]> => {
  const response = await fetchService.get("/chat/chatrooms");

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllChatQueryResponse =
      await response.json();
    return data.map((item) => {
      try {
        return {
          noDataForNow: item.nope,
        } satisfies Chat;
      } catch (e) {
        throw new ApiError("Failed to fetch views chat");
      }
    });
  }

  throw new ApiError("Failed to fetch views chat");
};

/**
 * Fetches all chatrooms from the server.
 * @returns A promise that resolves to an array of chatrooms.
 * @throws {ApiError} if the request fails.
 */

export const getAllChatrooms = async (): Promise<Chatroom[]> => {
  const response = await fetchService.get("/chat/chatrooms?page=1&limit=100");

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllChatroomQueryResponse =
      await response.json();

    return data?.items
      ? (data?.items
          .map((item) => {
            try {
              return {
                id: item.id,
                chatroomId: item.chatroom.id,
                chatName: item.chatroom.name,
                isInternalChat: item.chatroom.isInternalChat,
                logo:
                  item.chatroom.refOffice?.logo?.path ||
                  item.chatroom.baseOffice?.logo?.path ||
                  null,

                message: item.chatroom.messages.flatMap((message) =>
                  message.id
                    ? [
                        {
                          id: message.id,
                          content: message.content || "",

                          files: [],
                          urls:
                            message.files?.map((file) => ({
                              id: file.id,
                              path: file.path,
                              type: file.type,
                              createdAt: file.createdAt,
                              updatedAt: file.updatedAt,
                              label: file.label,
                              size: file.size,
                              heigh: file.heigh,
                              width: file.width,
                            })) || [],
                          time: message.createdAt,
                          read: message.messageRead.length > 0 ? true : false,
                          isSend: true,
                          chatroom: item.chatroom.id,
                          chatroomAttendeeID: item.id,
                          case: {
                            id: message.caseId?.id,
                            name: message.caseId?.label,
                          },
                          user: {
                            id: message.userId.id,
                            name:
                              message.userId.firstName +
                              " " +
                              message.userId.lastName,
                            avatar: message.userId.profilePicture?.path || "",
                          },
                        },
                      ]
                    : [],
                ),
              } satisfies Chatroom;
            } catch (e) {
              console.log("errord32432423423423", e);
              // throw new ApiError("Failed to fetch  chatroom");
            }
          })
          .filter((item) => item !== null) as Chatroom[])
      : [];
  }

  throw new ApiError("Failed to fetch views chatroom: AP ");
};

/**
 * Fetches all chatrooms from the server.
 * @returns A promise that resolves to an array of chatrooms.
 * @throws {ApiError} if the request fails.
 */

export const getAllChatroomsSearch = async (
  query: string,
): Promise<Chatroom[]> => {
  if (query === "") throw new ApiError("Failed to fetch  chatroom");

  const response = await fetchService.get(
    `/chat/search/chatrooms/by/name?page=1&limit=10&name=${query}`,
  );

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllChatroomQueryResponse =
      await response.json();

    return data?.items
      .map((item) => {
        try {
          return {
            id: item.id,
            chatroomId: item.chatroom.id,
            chatName: item.chatroom.name,
            isInternalChat: item.chatroom.isInternalChat,
            logo:
              item.chatroom.refOffice?.logo?.path ||
              item.chatroom.baseOffice?.logo?.path ||
              null,

            message: item.chatroom.messages.flatMap((message) =>
              message.id
                ? [
                    {
                      id: message.id,
                      content: message.content || "",

                      files: [],
                      urls:
                        message.files?.map((file) => ({
                          id: file.id,
                          path: file.path,
                          type: file.type,
                          createdAt: file.createdAt,
                          updatedAt: file.updatedAt,
                          label: file.label,
                          size: file.size,
                          heigh: file.heigh,
                          width: file.width,
                        })) || [],
                      time: message.createdAt,
                      read: message.messageRead.length > 0 ? true : false,
                      isSend: true,
                      chatroom: item.chatroom.id,
                      chatroomAttendeeID: item.id,
                      case: {
                        id: message.caseId?.id,
                        name: message.caseId?.label,
                      },
                      user: {
                        id: message.userId.id,
                        name:
                          message.userId.firstName +
                          " " +
                          message.userId.lastName,
                        avatar: message.userId.profilePicture?.path || "",
                      },
                    },
                  ]
                : [],
            ),
          } satisfies Chatroom;
        } catch (e) {
          throw new ApiError("Failed to fetch  chatroom");
        }
      })
      .filter((item) => item !== null) as Chatroom[];
  }

  throw new ApiError("Failed to fetch views chatroom: AP ");
};

export const getAllChatroomsPaticipant = async (
  id: string,
): Promise<ChatroomPaticipant[]> => {
  const response = await fetchService.get(`/chat/${id}/attendees/tobe/tagged`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: AllChatroomPaticipantQueryResponse =
      await response.json();
    return data.map((item) => {
      try {
        return {
          id: item.id,
          firstName: item.firstName || "",
          lastName: item.lastName || "",
          image: item.profilePicture?.path || "",
        } satisfies ChatroomPaticipant;
      } catch (e) {
        throw new ApiError("Failed to fetch chatroompaticipants");
      }
    });
  }

  throw new ApiError("Failed to fetch views chatroom");
};

export const createChatMessage = async (
  args: CreateChatMessageArgs,
  chatroom: string,
) => {
  const file: File[] = args.file?.getAll("file");

  // oject table
  const formData = new FormData();

  args.content && formData.append("content", args.content);
  args.isImportant && formData.append("isImportant", args.isImportant);
  args.isArchived && formData.append("isArchived", args.isArchived);
  args.parentMessage && formData.append("parentMessage", args.parentMessage);
  args.userId && formData.append("userId", args.userId);
  args.case && formData.append("caseId", args.case);
  args.userKey && formData.append("userKey", args.userKey);
  args.taggedUsers?.length > 0 &&
    formData.append("taggedUsers", JSON.stringify(args.taggedUsers));

  if (file && file.length > 0) {
    file.forEach((item) => {
      formData.append("files", item);
    });
  }

  const response = await fetchService.post(
    `/chat/add-message/${chatroom}`,
    formData,
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

export const addNewGuest = async (args: AddNewGuestArgs) => {
  const response = await fetchService.post(
    "/chat/add-guest",

    JSON.stringify({
      officeUserIds: args.officeUsers,
      chatroomId: args.chatroomId,
      caseId: args.case,
    } satisfies AddNewGuestRequestBody),

    { headers: { "Content-Type": "application/json" } },
  );

  if (response.ok) {
    return "success";
  }

  if (!response.ok) {
    const error = await getApiErrorMessage(response);
    throw new ApiError(error);
  }
};

export const getChatroomsMediaAndFiles = async (
  id: string,
): Promise<ChatroomMediaAndFiles[]> => {
  const response = await fetchService.get(`/chat/get/file/by/chatroom/${id}`);

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: ChatroomMediaAndFilesQueryResponse =
      await response.json();
    return data.map((item) => {
      try {
        return {
          id: item.id,
          path: item.filePath,
          label: item.label,
          type: item.fileType,
          case: item.caseId,
        } satisfies ChatroomMediaAndFiles;
      } catch (e) {
        throw new ApiError("Failed to fetch  media and files");
      }
    });
  }

  throw new ApiError("Failed to fetch views media and files");
};

export const getMasterChat = async (): Promise<CMessage[]> => {
  const response = await fetchService.get(
    `/chat/get/message/in/masterChat?page=1&limit=100`,
  );

  if (response.ok) {
    const { [DATA_BODY_KEY]: data }: MasterChatQueryResponse =
      await response.json();
    //@ts-ignore
    return data.messages.map((message) => {
      try {
        return {
          id: message.id,
          content: message.content || "",

          files: [],
          urls:
            message.files?.map((file) => ({
              id: file.id,
              path: file.filePath,
              type: file.fileType,
              createdAt: file.createdAt,
              updatedAt: file.updatedAt,
              label: file.label,
              size: file.fileSize,
              heigh: file.fileHeight,
              width: file.fileWidth,
            })) || [],
          time: message.createdAt,
          read: message.messageRead.length > 0 ? true : false,
          isSend: true,
          chatroom: "0",
          chatroomAttendeeID: "0",
          case: {
            id: message.caseId?.id,
            name: message.caseId?.label,
          },
          user: {
            id: message.user.id,
            name: message.user.firstName + " " + message.user.lastName,
            avatar: message.user.profilePicture?.path || "",
          },
        } satisfies CMessage;
      } catch (e) {
        throw new ApiError("Failed to fetch master chat");
      }
    });
  }

  throw new ApiError("Failed to fetch views master chat");
};
