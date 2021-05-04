import WorkTrack from '../../../models/ValueObjects/WorkTrack';

class WorkTrackValueObject {
  estimated: number;
  completed: number;
  remaining: number;

  constructor(estimated: number, completed: number, remaining: number) {
    this.estimated = estimated;
    this.completed = completed;
    this.remaining = remaining;
  }

  public static createNew(estimated: number) {
    return new WorkTrackValueObject(estimated, 0, estimated);
  }

  public static restore(workTrack: WorkTrack) {
    return new WorkTrackValueObject(workTrack.estimated, workTrack.completed, workTrack.remaining);
  }

  public addCompletedTime(completedTime: number) {
    return new WorkTrackValueObject(
      this.estimated,
      this.completed + completedTime,
      this.remaining - completedTime,
    );
  }
}

export default WorkTrackValueObject;
