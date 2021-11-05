import { ValueObject } from '../..';

interface MeetingProposalAgreementPartyRoleProps {
  value: string;
}

export class MeetingProposalAgreementPartyRole extends ValueObject<
  MeetingProposalAgreementPartyRoleProps
> {
  get value() {
    return this.props.value;
  }

  private constructor(props: MeetingProposalAgreementPartyRoleProps) {
    super(props);
  }

  public static Professor = () => new MeetingProposalAgreementPartyRole({ value: 'Professor' });
  public static Student = () => new MeetingProposalAgreementPartyRole({ value: 'Student' });
}
