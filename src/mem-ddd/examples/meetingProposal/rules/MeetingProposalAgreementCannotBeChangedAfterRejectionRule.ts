import { BusinessRule } from '../../..';
import { MeetingProposalAgreement } from '../MeetingProposalAgreement';

export class MeetingProposalAgreementCannotBeChangedAfterRejectionRule implements BusinessRule {
  message = 'Meeting proposal agreement cannot be changed after it has been rejected by a party';

  constructor(private readonly meetingProposalAgreement: MeetingProposalAgreement) {}

  isBroken() {
    return (
      // @ts-ignore
      this.meetingProposalAgreement.studentDecision.isRejected() ||
      // @ts-ignore
      this.meetingProposalAgreement.studentDecision.isRejected()
    );
  }
}
