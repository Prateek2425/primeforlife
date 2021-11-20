import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class ExerciseSchedule {
  readonly Monday?: string;
  readonly Tuesday?: string;
  readonly Wednesday?: string;
  readonly Thursday?: string;
  readonly Friday?: string;
  readonly Saturday?: string;
  readonly Sunday?: string;
  constructor(init: ModelInit<ExerciseSchedule>);
}

type EngagementMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ClientMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CoachMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CoachMessagMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VideoPlayMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VideoContentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TestScoreMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TestMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LibraryContentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Engagement {
  readonly id: string;
  readonly date?: string;
  readonly Client?: Client;
  readonly clientID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Engagement, EngagementMetaData>);
  static copyOf(source: Engagement, mutator: (draft: MutableModel<Engagement, EngagementMetaData>) => MutableModel<Engagement, EngagementMetaData> | void): Engagement;
}

export declare class Client {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly phoneNumber?: string;
  readonly cognitoSubID?: string;
  readonly country?: string;
  readonly dob?: string;
  readonly nextVideoID?: string;
  readonly Coach?: Coach;
  readonly coachID?: string;
  readonly CoachMessags?: (CoachMessag | null)[];
  readonly VideoPlays?: (VideoPlay | null)[];
  readonly schedule?: ExerciseSchedule;
  readonly Engagements?: (Engagement | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Client, ClientMetaData>);
  static copyOf(source: Client, mutator: (draft: MutableModel<Client, ClientMetaData>) => MutableModel<Client, ClientMetaData> | void): Client;
}

export declare class Coach {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly imageURI?: string;
  readonly Clients?: (Client | null)[];
  readonly CoachMessags?: (CoachMessag | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Coach, CoachMetaData>);
  static copyOf(source: Coach, mutator: (draft: MutableModel<Coach, CoachMetaData>) => MutableModel<Coach, CoachMetaData> | void): Coach;
}

export declare class CoachMessag {
  readonly id: string;
  readonly text?: string;
  readonly imageMessag?: boolean;
  readonly imageURI?: string;
  readonly date?: string;
  readonly coachToClient?: boolean;
  readonly Coach?: Coach;
  readonly Client?: Client;
  readonly coachID?: string;
  readonly clientID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CoachMessag, CoachMessagMetaData>);
  static copyOf(source: CoachMessag, mutator: (draft: MutableModel<CoachMessag, CoachMessagMetaData>) => MutableModel<CoachMessag, CoachMessagMetaData> | void): CoachMessag;
}

export declare class VideoPlay {
  readonly id: string;
  readonly start?: string;
  readonly end?: string;
  readonly VideoContent?: VideoContent;
  readonly Client?: Client;
  readonly clientID?: string;
  readonly videocontentID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<VideoPlay, VideoPlayMetaData>);
  static copyOf(source: VideoPlay, mutator: (draft: MutableModel<VideoPlay, VideoPlayMetaData>) => MutableModel<VideoPlay, VideoPlayMetaData> | void): VideoPlay;
}

export declare class VideoContent {
  readonly id: string;
  readonly title?: string;
  readonly videoURI?: string;
  readonly description?: string;
  readonly thumbnailURI?: string;
  readonly VideoPlays?: (VideoPlay | null)[];
  readonly seconds?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<VideoContent, VideoContentMetaData>);
  static copyOf(source: VideoContent, mutator: (draft: MutableModel<VideoContent, VideoContentMetaData>) => MutableModel<VideoContent, VideoContentMetaData> | void): VideoContent;
}

export declare class TestScore {
  readonly id: string;
  readonly score?: number;
  readonly date?: string;
  readonly Test?: Test;
  readonly Client?: Client;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TestScore, TestScoreMetaData>);
  static copyOf(source: TestScore, mutator: (draft: MutableModel<TestScore, TestScoreMetaData>) => MutableModel<TestScore, TestScoreMetaData> | void): TestScore;
}

export declare class Test {
  readonly id: string;
  readonly name?: string;
  readonly higherIsStronger?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Test, TestMetaData>);
  static copyOf(source: Test, mutator: (draft: MutableModel<Test, TestMetaData>) => MutableModel<Test, TestMetaData> | void): Test;
}

export declare class LibraryContent {
  readonly id: string;
  readonly section?: string;
  readonly contentType?: string;
  readonly contentID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LibraryContent, LibraryContentMetaData>);
  static copyOf(source: LibraryContent, mutator: (draft: MutableModel<LibraryContent, LibraryContentMetaData>) => MutableModel<LibraryContent, LibraryContentMetaData> | void): LibraryContent;
}