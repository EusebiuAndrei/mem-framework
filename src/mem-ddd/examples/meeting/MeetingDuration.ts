import { ValueObject } from '../../index';

export interface MeetingDurationProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export class MeetingDuration extends ValueObject<MeetingDurationProps> {
  public get hours() {
    return this.props.hours;
  }

  public get minutes() {
    return this.props.minutes;
  }

  public get seconds() {
    return this.props.seconds;
  }

  private constructor(props: MeetingDurationProps) {
    super(props);
  }

  public static create(props: Partial<MeetingDurationProps>) {
    return new MeetingDuration({
      hours: props.hours ?? 0,
      minutes: props.minutes ?? 0,
      seconds: props.seconds ?? 0,
    });
  }

  public changeDuration(props: Partial<MeetingDurationProps>) {
    return new MeetingDuration({
      hours: props.hours ?? this.hours,
      minutes: props.minutes ?? this.minutes,
      seconds: props.seconds ?? this.seconds,
    });
  }
}
