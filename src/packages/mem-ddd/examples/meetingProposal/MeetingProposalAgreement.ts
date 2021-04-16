import { Entity, UniqueEntityID } from '../..';
import { MeetingProposalAgreementDecision } from './MeetingProposalAgreementDecision';
import { MeetingProposalAgreementStatus } from './MeetingProposalAgreementStatus';
import { MeetingProposalAgreementParty } from './MeetingProposalAgreementParty';
import { MeetingProposalAgreementCanBeChangedOnlyByPartyRule } from './rules/MeetingProposalAgreementCanBeChangedOnlyByPartyRule';
import { MeetingProposalAgreementProfessorParty } from './MeetingProposalAgreementProfessorParty';
import { MeetingProposalAgreementStudentParty } from './MeetingProposalAgreementStudentParty';
import { PartyCannotChangeMeetingProposalAgreementConsecutivelyRule } from './rules/PartyCannotChangeMeetingProposalAgreementConsecutivelyRule';
import { MeetingProposalAgreementCannotBeChangedAfterAcceptanceRule } from './rules/MeetingProposalAgreementCannotBeChangedAfterAcceptanceRule';
import { MeetingProposalAgreementCannotBeChangedAfterRejectionRule } from './rules/MeetingProposalAgreementCannotBeChangedAfterRejectionRule';

export interface MeetingAgreementProps {
  studentId: UniqueEntityID;
  professorId: UniqueEntityID;
  lastProposingPartyId: UniqueEntityID;
  studentDecision: MeetingProposalAgreementDecision;
  professorDecision: MeetingProposalAgreementDecision;
  status: MeetingProposalAgreementStatus;
}

export type MeetingAgreementFactoryProps = Pick<MeetingAgreementProps, 'studentId' | 'professorId'>;

export class MeetingProposalAgreement extends Entity<MeetingAgreementProps> {
  public get status() {
    return this.props.status;
  }

  public get studentDecision() {
    return this.props.studentDecision;
  }

  public get professorDecision() {
    return this.props.professorDecision;
  }

  private constructor(props: MeetingAgreementFactoryProps) {
    const constructorProps: MeetingAgreementProps = {
      ...props,
      lastProposingPartyId: props.studentId,
      studentDecision: MeetingProposalAgreementDecision.Accepted(),
      professorDecision: null,
      status: MeetingProposalAgreementStatus.InVerification(),
    };

    super(constructorProps);
  }

  public static create(props: MeetingAgreementFactoryProps) {
    return new MeetingProposalAgreement(props);
  }

  public changeTerm(partyId: UniqueEntityID) {
    this.checkMeetingProposalAgreementChangingRules(partyId);

    const party = this.getAgreementPartyFromId(partyId);
    party.changeTerm(this.props);

    this.props.lastProposingPartyId = partyId;
  }

  public accept(partyId: UniqueEntityID) {
    this.checkMeetingProposalAgreementChangingRules(partyId);

    const party = this.getAgreementPartyFromId(partyId);
    party.accept(this.props);

    this.props.lastProposingPartyId = partyId;
  }

  public reject(partyId: UniqueEntityID) {
    this.checkMeetingProposalAgreementChangingRules(partyId);

    const party = this.getAgreementPartyFromId(partyId);
    party.reject(this.props);

    this.props.lastProposingPartyId = partyId;
  }

  private checkMeetingProposalAgreementChangingRules(partyId: UniqueEntityID) {
    this.checkRule(new MeetingProposalAgreementCanBeChangedOnlyByPartyRule(this, partyId));
    this.checkRule(
      new PartyCannotChangeMeetingProposalAgreementConsecutivelyRule(
        partyId,
        this.props.lastProposingPartyId,
      ),
    );
    this.checkRule(new MeetingProposalAgreementCannotBeChangedAfterAcceptanceRule(this));
    this.checkRule(new MeetingProposalAgreementCannotBeChangedAfterRejectionRule(this));
  }

  private getAgreementPartyFromId(partyId: UniqueEntityID) {
    const party: MeetingProposalAgreementParty =
      partyId === this.props.studentId
        ? new MeetingProposalAgreementProfessorParty()
        : new MeetingProposalAgreementStudentParty();
    return party;
  }

  public hasParty(partyId: UniqueEntityID) {
    return partyId === this.props.studentId || partyId === this.props.professorId;
  }
}
