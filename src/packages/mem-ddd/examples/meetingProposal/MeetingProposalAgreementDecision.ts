import { ValueObject } from '../..';

interface MeetingProposalDecisionProps {
  value: string;
}

export class MeetingProposalAgreementDecision extends ValueObject<MeetingProposalDecisionProps> {
  get value() {
    return this.props.value;
  }

  private constructor(props: MeetingProposalDecisionProps) {
    super(props);
  }

  public static TermsChanged = () =>
    new MeetingProposalAgreementDecision({ value: 'TermsChanged' });
  public static Accepted = () => new MeetingProposalAgreementDecision({ value: 'Accepted' });
  public static Rejected = () => new MeetingProposalAgreementDecision({ value: 'Rejected' });

  public isAccepted = () => this === MeetingProposalAgreementDecision.Accepted();
  public isRejected = () => this === MeetingProposalAgreementDecision.Rejected();
}
