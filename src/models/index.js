// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Engagement, Client, Coach, CoachMessag, VideoPlay, VideoContent, TestScore, Test, LibraryContent, ExerciseSchedule } = initSchema(schema);

export {
  Engagement,
  Client,
  Coach,
  CoachMessag,
  VideoPlay,
  VideoContent,
  TestScore,
  Test,
  LibraryContent,
  ExerciseSchedule
};