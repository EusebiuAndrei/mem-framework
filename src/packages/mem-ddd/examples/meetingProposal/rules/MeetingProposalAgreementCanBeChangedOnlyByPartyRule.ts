import { BusinessRule } from '../../..';
import { MeetingProposalAgreement } from '../MeetingProposalAgreement';
import { MeetingProposalAgreementParty } from '../MeetingProposalAgreementParty';

export class MeetingProposalAgreementCanBeChangedOnlyByPartyRule implements BusinessRule {
  message = 'Meeting proposal agreement cannot be changed by a person who does not take part in it';

  constructor(
    private readonly meetingProposalAgreement: MeetingProposalAgreement,
    private readonly party: MeetingProposalAgreementParty,
  ) {}

  isBroken() {
    return !this.meetingProposalAgreement.hasParty(this.party);
  }
}
