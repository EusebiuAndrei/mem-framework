import { BusinessRule } from '../../..';
import { MeetingProposalAgreement } from '../MeetingProposalAgreement';

export class MeetingProposalAgreementCannotBeChangedAfterAcceptanceRule implements BusinessRule {
  message =
    'Meeting proposal agreement cannot be changed after it has been accepted by both parties';

  constructor(private readonly meetingProposalAgreement: MeetingProposalAgreement) {}

  isBroken() {
    return (
      this.meetingProposalAgreement.studentDecision.isAccepted() &&
      this.meetingProposalAgreement.studentDecision.isAccepted()
    );
  }
}
