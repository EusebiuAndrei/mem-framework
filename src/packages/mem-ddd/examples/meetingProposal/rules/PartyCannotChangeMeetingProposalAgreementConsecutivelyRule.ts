import { BusinessRule } from '../../..';
import { MeetingProposalAgreementParty } from '../MeetingProposalAgreementParty';

export class PartyCannotChangeMeetingProposalAgreementConsecutivelyRule implements BusinessRule {
  message = 'A party cannot change a meeting two times consecutively';

  constructor(
    private readonly currentlyProposingPartyId: MeetingProposalAgreementParty,
    private readonly lastProposingPartyId: MeetingProposalAgreementParty,
  ) {}

  isBroken() {
    return this.currentlyProposingPartyId.equals(this.lastProposingPartyId);
  }
}
