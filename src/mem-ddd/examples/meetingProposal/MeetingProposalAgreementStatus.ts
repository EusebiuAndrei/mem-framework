import { ValueObject } from '../..';

interface MeetingProposalStatusProps {
  value: string;
}

export class MeetingProposalAgreementStatus extends ValueObject<MeetingProposalStatusProps> {
  get value() {
    return this.props.value;
  }

  private constructor(props: MeetingProposalStatusProps) {
    super(props);
  }

  public static InVerification = () =>
    new MeetingProposalAgreementStatus({ value: 'InVerification' });
  public static InDiscussion = () => new MeetingProposalAgreementStatus({ value: 'InDiscussion' });
  public static Accepted = () => new MeetingProposalAgreementStatus({ value: 'Accepted' });
  public static Rejected = () => new MeetingProposalAgreementStatus({ value: 'Rejected' });
}
