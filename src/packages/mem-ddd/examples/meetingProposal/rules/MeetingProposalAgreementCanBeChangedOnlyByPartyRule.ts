import { BusinessRule, UniqueEntityID } from '../../..';
import { MeetingProposalAgreement } from '../MeetingProposalAgreement';

export class MeetingProposalAgreementCanBeChangedOnlyByPartyRule implements BusinessRule {
  message = 'Meeting proposal agreement cannot be changed by a person who does not take part in it';

  constructor(
    private readonly meetingProposalAgreement: MeetingProposalAgreement,
    private readonly issuerId: UniqueEntityID,
  ) {}

  isBroken() {
    return !this.meetingProposalAgreement.hasParty(this.issuerId);
  }
}
