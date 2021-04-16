import { BusinessRule } from '../../..';
import { MeetingProposalAgreement } from '../MeetingProposalAgreement';

export class MeetingProposalAgreementCannotBeChangedAfterRejectionRule implements BusinessRule {
  message = 'Meeting proposal agreement cannot be changed after it has been rejected by a party';

  constructor(private readonly meetingProposalAgreement: MeetingProposalAgreement) {}

  isBroken() {
    return (
      this.meetingProposalAgreement.studentDecision.isRejected() ||
      this.meetingProposalAgreement.studentDecision.isRejected()
    );
  }
}
