/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProgramVideoEngagement = /* GraphQL */ `
  mutation CreateProgramVideoEngagement(
    $createProgramVideoEngagementInput: CreateProgramVideoEngagementInput!
  ) {
    createProgramVideoEngagement(
      createProgramVideoEngagementInput: $createProgramVideoEngagementInput
    ) {
      id
      clientProgramMappingId
      videoContentId
      watchStartTime
      watchEndTime
      isCompleteWatch
      videoContent {
        id
        title
        description
        videoUrl
        thumbnailUrl
        videoLength
        createdAt
        updatedAt
      }
    }
  }
`;
export const createMessageByClient = /* GraphQL */ `
  mutation CreateMessageByClient(
    $createMessageByClientInput: CreateMessageByClientInput!
  ) {
    createMessageByClient(
      createMessageByClientInput: $createMessageByClientInput
    ) {
      id
      clientCoachMappingId
      userId
      members
      contentType
      contentText
      contentUrl
      scheduleDate
      createdAt
      updatedAt
    }
  }
`;
export const updateMyProfileOld = /* GraphQL */ `
  mutation UpdateMyProfile($updateMyProfileInput: UpdateMyProfileInput!) {
    updateMyProfile(updateMyProfileInput: $updateMyProfileInput) {
      id
      sub
      userType
      email
      firstName
      lastName
      phoneNumber
      country
      dob
      profileUrl
      timezone
      clientCoachMap {
        id
        coachId
        clientId
      }
      clientProgramMap {
        id
        programId
        clientId
        isActiveProgram
        isCompleted
      }
      activeProgram {
        id
        title
        description
        thumbnailUrl
        sortOrder
      }
    }
  }
`;

export const updateMyProfile =/* GraphQL */ `
mutation UpdateMyProfile {
  updateMyProfile(updateMyProfileInput: $updateMyProfileInput) {
    activeProgram {
      title
      thumbnailUrl
      sortOrder
      id
      description
      programVideoMap(limit: ${10}, page: ${1}) {
        sortOrder
        programId
        videoContentId
        videoContent {
          videoUrl
          videoLength
          updatedAt
          title
          thumbnailUrl
          id
          description
          createdAt
        }
        id
      }
    }
    country
    dob
    email
    firstName
    id
    lastName
    phoneNumber
    profileUrl
    userType
    timezone
    sub
    clientProgramMap(limit: ${10}, page: ${1}) {
      clientId
      id
      isActiveProgram
      isCompleted
      programId
    }
    clientCoachMap {
      id
      coachId
      clientId
      coach {
        country
        firstName
        lastName
        id
        phoneNumber
        profileUrl
        userType
      }
    }
  }
}
`;


export const updateClientScheduleTime = /* GraphQL */ `
  mutation UpdateClientScheduleTime(
    $updateClientScheduleTimeInput: UpdateClientScheduleTimeInput!
  ) {
    updateClientScheduleTime(
      updateClientScheduleTimeInput: $updateClientScheduleTimeInput
    ) {
      id
      clientId
      scheduleDay
      startTime
    }
  }
`;
