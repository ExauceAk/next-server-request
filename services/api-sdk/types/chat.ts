import { use } from "react";
export type Chat = {
  noDataForNow: string;
};

export type CMessage = {
  id: string;
  content: string;
  files: File[];
  urls?: Array<{
    id: string;
    createdAt: string;
    updatedAt: string;
    path: string;
    type: string;
    label: string;
    size: number;
    heigh: number;
    width: number;
  }>;
  time: string;
  read: boolean;
  isSend: boolean;
  chatroom: string;
  chatroomAttendeeID: string;
  case: {
    id: string | null | undefined;
    name: string | null | undefined;
  };
  user: {
    id: string;
    name: string;
    avatar: string;
  };
};

export type Chatroom = {
  id: string;
  chatroomId: string;
  chatName: string;
  isInternalChat: boolean;
  logo: string | null;
  message: Array<CMessage>;
};

export type ChatroomPaticipant = {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
};

export type ChatroomMediaAndFiles = {
  id: string;
  path: string;
  type: string;
  label: string;
  case: null | {
    id: string;
    label: string;
  };
};

export type MasterChatMessage = {
  chatroomId: string;
  messageId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  files: [
    {
      filePath: string;
      fileType: string;
    },
  ];
  user: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: null | string;
  };
  case: null | {
    id: string;
    label: string;
  };
};
