/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const demoLambdaExecution = /* GraphQL */ `
  query DemoLambdaExecution($input: VideoContentPagination!) {
    demoLambdaExecution(input: $input) {
      result {
        id
        title
        description
        videoUrl
        thumbnailUrl
        videoLength
        createdAt
        updatedAt
      }
      totalResult
      limit
      page
      search
    }
  }
`;
export const getMyProfile = /* GraphQL */ `
  query MyQuery {
  getMyProfile {
    country
    dob
    email
    firstName
    id
    lastName
    phoneNumber
    profileUrl
    sub
    timezone
    userType
    clientProgramMap(limit: 10, page: 10) {
      clientId
      id
      isActiveProgram
      isCompleted
      programId
      program {
        description
        id
        sortOrder
        thumbnailUrl
        title
        programVideoMap(limit: 10, page: 1) {
          id
          programId
          sortOrder
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
        }
      }
    }
    clientCoachMap {
      clientId
      coachId
      id
      coach {
        country
        firstName
        id
        lastName
        phoneNumber
        profileUrl
        userType
      }
    }
    activeProgram {
      description
      id
      sortOrder
      thumbnailUrl
      title
      programVideoMap(limit: 10, page: 1) {
        id
        programId
        sortOrder
        videoContentId
        videoContent {
          createdAt
          description
          id
          thumbnailUrl
          title
          updatedAt
          videoLength
          videoUrl
        }
      }
    }
  }
}
`;
export const getMyPreviousWatchVideo = /* GraphQL */ `
  query GetMyPreviousWatchVideo {
    getMyPreviousWatchVideo {
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
export const getVideoContent = /* GraphQL */ `
  query GetVideoContent($id: Int!) {
    getVideoContent(id: $id) {
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
`;
export const getLibrary = /* GraphQL */ `
  query GetLibrary($id: Int!) {
    getLibrary(id: $id) {
      id
      title
      description
      libraryVideoMap {
        id
        libraryId
        videoContentId
        sortOrder
        category
      }
    }
  }
`;
export const listVideoContent = /* GraphQL */ `
  query ListVideoContent {
    listVideoContent {
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
`;
export const listMyCoach = /* GraphQL */ `
  query ListMyCoach($page: Int!, $limit: Int!) {
    listMyCoach(page: $page, limit: $limit) {
      id
      coachId
      clientId
      coach {
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
      }
      client {
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
      }
    }
  }
`;
export const listMyWeeklySchedule = /* GraphQL */ `
  query MyQuery {
  listMyWeeklySchedule {
    clientId
    id
    scheduleDay
    startTime
  }
}
`;

export const listEngagementDetail = /* GraphQL */ `
  query ListEngagementDetail($minDateTime: AWSDateTime!) {
    listEngagementDetail(minDateTime: $minDateTime) {
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
export const listLibraryMapByProgram = /* GraphQL */ `
  query ListLibraryMapByProgram($programId: Int!, $page: Int!, $limit: Int!) {
    listLibraryMapByProgram(programId: $programId, page: $page, limit: $limit) {
      id
      programId
      libraryId
      sortOrder
      program {
        id
        title
        description
        thumbnailUrl
        sortOrder
      }
      library {
        id
        title
        description
      }
    }
  }
`;

export const listLibraryVideoMapByCategory = (libraryId, category, pageSection, limitSection, page, limit) => {
  return `
  query listLibraryVideoMapByCategory {
    listLibraryVideoMapByCategory(category:${category} libraryId: ${libraryId} page: ${pageSection}, limit: ${limitSection}) {
    libraryVideoMap(page: ${page}, limit: ${limit}) {
    category
    id
    libraryId
    videoContentId
    sortOrder
    videoContent {
      createdAt
      description
      id
      thumbnailUrl
      title
      updatedAt
      videoLength
      videoUrl
    }
  }
}
} 
`;
}


export const listLibraries = (pageSection, limitSection, page, limit) => {
  return /* GraphQL */ `
query ListLibraries {
  listLibraries(page: ${pageSection}, limit: ${limitSection}) {
    libraryVideoMap(page: ${page}, limit: ${limit}) {
      id
      sortOrder
      videoContentId
      libraryId
      videoContent {
        videoUrl
        createdAt
        description
        id
        thumbnailUrl
        title
        updatedAt
        videoLength
      }
      category
    }
    description
    id
    title
  }
}
`;
}

export const listLibrariesByProgram = (pageSection, limitSection, page, limit, programId) => {
  return /* GraphQL */ `
query ListLibrariesByProgram {
  listLibraryMapByProgram(limit: ${limitSection}, page: ${pageSection}, programId: ${programId}) {
    library {
      id
      description
      title
      libraryVideoMap(limit: ${limit}, page: ${page}) {
        id
        category
        libraryId
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
        sortOrder
      }
    }
  }
}
`;
}


export const listMessageByDate = /* GraphQL */ `
  query ListMessageByDate(
    $clientCoachMappingId: ID
    $scheduleDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessageByDate(
      clientCoachMappingId: $clientCoachMappingId
      scheduleDate: $scheduleDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;

export const getHomeData = `
query HomeData {
  getMyProfile {
    clientCoachMap {
      clientId
      coachId
      id
    }
    clientProgramMap(limit: 10, page: 1) {
      clientId
      id
      isActiveProgram
      isCompleted
      programId
    }
    country
    dob
    email
    firstName
    id
    lastName
    phoneNumber
    profileUrl
    sub
    timezone
    userType
    activeProgram {
      description
      id
      programVideoMap(limit: 10, page: 10) {
        id
        programId
        sortOrder
        videoContentId
      }
      sortOrder
      thumbnailUrl
      title
    }
  }
  listEngagementDetail(minDateTime: "") {
    clientProgramMappingId
    id
    isCompleteWatch
    videoContentId
    watchEndTime
    watchStartTime
    videoContent {
      createdAt
      description
      id
      thumbnailUrl
      title
      updatedAt
      videoLength
      videoUrl
    }
  }
}
`;

export const listprogramVideoMap = (page, limit) => {
  return /* GraphQL */`
getMyProfile {
  userType
  timezone
  sub
  profileUrl
  phoneNumber
  lastName
  id
  firstName
  email
  dob
  country
  clientProgramMap(limit:${limit}, page: ${page}) {
    clientId
    id
    isActiveProgram
    isCompleted
    programId
    program {
      description
      id
      programVideoMap(limit:${limit}, page: ${page}) {
        id
        programId
        sortOrder
        videoContentId
        videoContent {
          createdAt
          description
          id
          thumbnailUrl
          title
          updatedAt
          videoLength
          videoUrl
        }
      }
      sortOrder
      thumbnailUrl
      title
    }
  }
}
  `
}