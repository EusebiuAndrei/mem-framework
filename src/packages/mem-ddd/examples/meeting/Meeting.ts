import { Entity, UniqueEntityID } from '../..';
import { MeetingDuration } from './MeetingDuration';

export interface MeetingProps {
  duration: MeetingDuration;
  meetingDate: Date;
  studentId: UniqueEntityID;
  professorId: UniqueEntityID;
  createDate: Date;
  cancelDate: Date;
}

export class Meeting extends Entity<MeetingProps> {}
