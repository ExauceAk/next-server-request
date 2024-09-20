export const DATA_BODY_KEY = "data";

export type AllChatroomQueryResponse = {
  [DATA_BODY_KEY]: {
    items: [
      {
        id: string;
        createdAt: string;
        updatedAt: string;
        user: string;
        status: string;
        isInvited: boolean;
        email: null | string;
        officeUser: string;
        chatroom: {
          id: string;
          createdAt: string;
          updatedAt: string;
          name: string;
          isVerified: boolean;
          isInternalChat: boolean;
          messages: [
            {
              id: string;
              createdAt: string;
              updatedAt: string;
              content: string | null;
              isRead: boolean;
              isEdited: boolean;
              isImportant: boolean;
              isArchived: boolean;
              parentMessage: null | string;
              messageRead: [
                {
                  isRead: boolean;
                },
              ];

              userId: {
                id: string;
                createdAt: string;
                updatedAt: string;
                firstName: string;
                lastName: string;
                email: string;
                phoneNumber: string;
                phonePrefix: string;
                profilePicture: {
                  id: string;
                  label: string;
                  path: string;
                  size: number;
                  type: string;
                };

                username: null | string;
                verified: boolean;
                officeName: string;
                officeLocation: string;
                officePhoneNumber: string;
                officePhonePrefix: null | string;
                officeEmail: string;
                step: string;
              };
              files:
                | Array<{
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    label: string;
                    path: string;
                    heigh: number;
                    width: number;
                    size: number;
                    type: string;
                  }>
                | [];
              caseId: {
                id: string | null;
                label: string | null;
                notes: string | null;
                status: string | null;
                teeth: string | null;
              } | null;
              userReferences: [];
            },
          ];
          owner: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            phonePrefix: string;
            username: null | string;
            officeName: string;
            officeLocation: string;
            officePhoneNumber: string;
            officePhonePrefix: null | string;
            officeEmail: string;
            step: string;
          };
          baseOffice: {
            id: string;
            name: string;
            email: string;
            location: string;
            phoneNumber: string;
            phonePrefix: string;
            country: null | string;
            address: string;
            website: string;
            videoLink: string;
            timezone: string;
            parentOffice: null | string;
            licenceNumber: string;
            status: string;
            logo: {
              id: string;
              path: string;
            };
          };
          refOffice: {
            id: string;
            name: string;
            email: string;
            location: string;
            phoneNumber: string;
            phonePrefix: string;
            country: null | string;
            address: string;
            website: string;
            videoLink: string;
            timezone: string;
            parentOffice: null | string;
            licenceNumber: string;
            status: string;
            logo: {
              id: string;
              path: string;
            };
          } | null;

          image: null | string;
        };
        case: any;
      },
    ];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
    links: {
      first: string;
      previous: string;
      next: string;
      last: string;
    };
  };
};

export type AllChatroomSearchQueryResponse = {
  [DATA_BODY_KEY]: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      user: string;
      status: string;
      isInvited: boolean;
      email: null | string;
      officeUser: string;
      chatroom: {
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        isVerified: boolean;
        isInternalChat: boolean;
        messages: [
          {
            id: string;
            createdAt: string;
            updatedAt: string;
            content: string | null;
            isRead: boolean;
            isEdited: boolean;
            isImportant: boolean;
            isArchived: boolean;
            parentMessage: null | string;
            messageRead: [
              {
                isRead: boolean;
              },
            ];

            userId: {
              id: string;
              createdAt: string;
              updatedAt: string;
              firstName: string;
              lastName: string;
              email: string;
              phoneNumber: string;
              phonePrefix: string;
              profilePicture: {
                id: string;
                label: string;
                path: string;
                size: number;
                type: string;
              };

              username: null | string;
              verified: boolean;
              officeName: string;
              officeLocation: string;
              officePhoneNumber: string;
              officePhonePrefix: null | string;
              officeEmail: string;
              step: string;
            };
            files:
              | Array<{
                  id: string;
                  createdAt: string;
                  updatedAt: string;
                  label: string;
                  path: string;
                  heigh: number;
                  width: number;
                  size: number;
                  type: string;
                }>
              | [];
            caseId: {
              id: string | null;
              label: string | null;
              notes: string | null;
              status: string | null;
              teeth: string | null;
            } | null;
            userReferences: [];
          },
        ];
        owner: {
          id: string;
          firstName: string;
          lastName: string;
          email: string;
          phoneNumber: string;
          phonePrefix: string;
          username: null | string;
          officeName: string;
          officeLocation: string;
          officePhoneNumber: string;
          officePhonePrefix: null | string;
          officeEmail: string;
          step: string;
        };
        baseOffice: {
          id: string;
          name: string;
          email: string;
          location: string;
          phoneNumber: string;
          phonePrefix: string;
          country: null | string;
          address: string;
          website: string;
          videoLink: string;
          timezone: string;
          parentOffice: null | string;
          licenceNumber: string;
          status: string;
          logo: {
            id: string;
            path: string;
          };
        };
        refOffice: {
          id: string;
          name: string;
          email: string;
          location: string;
          phoneNumber: string;
          phonePrefix: string;
          country: null | string;
          address: string;
          website: string;
          videoLink: string;
          timezone: string;
          parentOffice: null | string;
          licenceNumber: string;
          status: string;
          logo: {
            id: string;
            path: string;
          };
        } | null;

        image: null | string;
      };
      case: any;
    },
  ];
};

export type AllChatroomPaticipantQueryResponse = {
  [DATA_BODY_KEY]: [
    {
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      phoneNumber: string | null;
      phonePrefix: string | null;
      username: null | string;
      verified: boolean;
      officeName: string | null;
      officeLocation: string | null;
      officePhoneNumber: string | null;
      officePhonePrefix: null | string;
      officeEmail: string | null;
      step: string | null;
      profilePicture: {
        id: string;
        label: string | null;
        path: string | null;
      } | null;
      typeOffice: {
        id: string;
        label: string | null;
        title: string | null;
        logo: string | null;
      } | null;
    },
  ];
};

export type ChatroomMediaAndFilesQueryResponse = {
  [DATA_BODY_KEY]: Array<{
    id: string;
    filePath: string;
    fileType: string;
    label: string;
    caseId: null | {
      id: string;
      label: string;
    };
  }>;
};

export type MasterChatQueryResponse = {
  [DATA_BODY_KEY]: {
    messages: Array<{
      id: string;
      createdAt: string;
      updatedAt: string;
      content: string | null;
      isRead: boolean;
      isEdited: boolean;
      isImportant: boolean;
      isArchived: boolean;
      parentMessage: null | string;
      messageRead: [
        {
          isRead: boolean;
        },
      ];
      user: {
        id: string;
        firstName: string;
        lastName: string;
        profilePicture: {
          id: string;
          label: string;
          path: string;
          size: number;
          type: string;
        };
      };

      files:
        | Array<{
            id: string;
            label: string;
            filePath: string;
            fileType: string;
            fileSize: number;
            fileWidth: number;
            fileHeight: number;
            createdAt: string;
            updatedAt: string;
          }>
        | [];
      caseId: {
        id: string | null;
        label: string | null;
        notes: string | null;
        status: string | null;
        teeth: string | null;
      } | null;
      userReferences: [];
    }>;
  };
};

export type AllChatQueryResponse = {
  [DATA_BODY_KEY]: Array<{
    nope: string;
  }>;
};

export type AddNewGuestArgs = {
  officeUsers: string[];
  chatroomId: string;
  case: string;
};

export type AddNewGuestRequestBody = {
  officeUserIds: string[];
  chatroomId: string;
  caseId: string;
};

export type CreateChatMessageArgs = Partial<{
  content: string;
  isImportant: string;
  isArchived: string;
  parentMessage: string;
  userId: string;
  file: any;
  case: string;
  userKey: string;
  taggedUsers: any;
}>;

export type MessageFromSocket = {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  isRead: boolean;
  isEdited: boolean;
  isImportant: boolean;
  isArchived: boolean;
  parentMessage: null | string;
  userId: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    phonePrefix: string;
    username: null | string;
    profilePicture: {
      id: string;
      label: string;
      path: string;
    };
  };
  chatroom: {
    id: string;
    name: string;
    isVerified: boolean;
    isInternalChat: boolean;
    owner: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      username: null | string;
      profilePicture: {
        id: string;
        label: string;
        path: string;
      };
    };

    baseOffice: {
      id: string;
      name: string;
      email: string;
      location: string;
      phoneNumber: string;
      phonePrefix: string;
      country: null | string;
      address: string;
      website: string;
      videoLink: string;
      timezone: string;
      parentOffice: null | string;
      licenceNumber: string;
      status: string;
      logo: {
        id: string;
        path: string;
      };
    };
    refOffice: {
      id: string;
      name: string;
      email: string;
      location: string;
      phoneNumber: string;
      phonePrefix: string;
      country: null | string;
      address: string;
      website: string;
      videoLink: string;
      timezone: string;
      parentOffice: null | string;
      licenceNumber: string;
      status: string;
      logo: {
        id: string;
        path: string;
      };
    } | null;
    image: null | string;
  };
  files:
    | Array<{
        id: string;
        createdAt: string;
        updatedAt: string;
        label: string;
        path: string;
        size: number;
        heigh: number;
        width: number;
        type: string;
      }>
    | [];
  caseId: {
    id: string | null;
    label: string | null;
    notes: string | null;
    status: string | null;
    teeth: string | null;
  } | null;
};

export type MassageIsRead = {
  id: string;
  isRead: boolean;
  chatroomAttendee: {
    id: string;
  };
  message: {
    id: string;
    createdAt: string;
    updatedAt: string;
    content: string;
    isRead: boolean;
    isEdited: boolean;
    isImportant: boolean;
    isArchived: boolean;
    parentMessage: null | string;
    userId: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      phonePrefix: string;
      username: null | string;
      profilePicture: {
        id: string;
        label: string;
        path: string;
      };
    };
    chatroom: {
      id: string;
      name: string;
      isVerified: boolean;
      isInternalChat: boolean;
      owner: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        username: null | string;
        profilePicture: {
          id: string;
          label: string;
          path: string;
        };
      };

      baseOffice: {
        id: string;
        name: string;
        email: string;
        location: string;
        phoneNumber: string;
        phonePrefix: string;
        country: null | string;
        address: string;
        website: string;
        videoLink: string;
        timezone: string;
        parentOffice: null | string;
        licenceNumber: string;
        status: string;
        logo: {
          id: string;
          path: string;
        };
      };
      refOffice: {
        id: string;
        name: string;
        email: string;
        location: string;
        phoneNumber: string;
        phonePrefix: string;
        country: null | string;
        address: string;
        website: string;
        videoLink: string;
        timezone: string;
        parentOffice: null | string;
        licenceNumber: string;
        status: string;
        logo: {
          id: string;
          path: string;
        };
      } | null;
      image: null | string;
    };
    files:
      | Array<{
          id: string;
          createdAt: string;
          updatedAt: string;
          label: string;
          path: string;
          size: number;
          heigh: number;
          width: number;
          type: string;
        }>
      | [];
    caseId: {
      id: string | null;
      label: string | null;
      notes: string | null;
      status: string | null;
      teeth: string | null;
    } | null;
  };
};
