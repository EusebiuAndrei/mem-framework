import { Entity, UniqueEntityID } from '../..';
import { MeetingDuration, MeetingDurationProps } from '../meeting/MeetingDuration';
import { MeetingAgreementFactoryProps, MeetingProposalAgreement } from './MeetingProposalAgreement';

interface MeetingProposalProps {
  duration: MeetingDuration;
  meetingDate: Date;
  agreement: MeetingProposalAgreement;
  createDate: Date;
  changeDate: Date;
  cancelDate: Date;
}

export type MeetingProposalFactoryProps = Pick<MeetingProposalProps, 'duration' | 'meetingDate'> &
  MeetingAgreementFactoryProps;

export class MeetingProposal extends Entity<MeetingProposalProps> {
  public get duration() {
    return this.props.duration;
  }

  public get meetingDate() {
    return this.props.meetingDate;
  }

  public get agreement() {
    return this.props.agreement;
  }

  private constructor(props: MeetingProposalFactoryProps) {
    const { duration, meetingDate, studentId, professorId } = props;
    const contructorProps: MeetingProposalProps = {
      duration,
      meetingDate,
      agreement: MeetingProposalAgreement.create({ studentId, professorId }),
      createDate: new Date(),
      changeDate: null,
      cancelDate: null,
    };
    super(contructorProps);
  }

  public static create(props: MeetingProposalFactoryProps) {
    return new MeetingProposal(props);
  }

  public changeMainAttributes(
    duration: Partial<MeetingDurationProps>,
    meetingDate: Date,
    issuerId: UniqueEntityID,
  ) {
    this.props.duration = this.props.duration.changeDuration(duration);
    this.props.meetingDate = meetingDate;
    this.props.changeDate = new Date();
    // this.props.agreement.changeTerm(issuerId);
  }
}
