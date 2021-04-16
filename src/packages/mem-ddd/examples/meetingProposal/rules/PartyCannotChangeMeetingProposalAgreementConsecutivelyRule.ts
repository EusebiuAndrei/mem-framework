import { BusinessRule, UniqueEntityID } from '../../..';

export class PartyCannotChangeMeetingProposalAgreementConsecutivelyRule implements BusinessRule {
  message = 'A party cannot change a meeting two times consecutively';

  constructor(
    private readonly currentlyProposingPartyId: UniqueEntityID,
    private readonly lastProposingPartyId: UniqueEntityID,
  ) {}

  isBroken() {
    return this.currentlyProposingPartyId === this.lastProposingPartyId;
  }
}
