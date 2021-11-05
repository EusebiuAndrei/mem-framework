import { Entity, UniqueEntityID } from '../..';
import { MeetingProposalAgreementDecision } from './MeetingProposalAgreementDecision';
import { MeetingProposalAgreementStatus } from './MeetingProposalAgreementStatus';
import { MeetingProposalAgreementParty } from './MeetingProposalAgreementParty';
import { MeetingProposalAgreementCanBeChangedOnlyByPartyRule } from './rules/MeetingProposalAgreementCanBeChangedOnlyByPartyRule';
import { PartyCannotChangeMeetingProposalAgreementConsecutivelyRule } from './rules/PartyCannotChangeMeetingProposalAgreementConsecutivelyRule';
import { MeetingProposalAgreementCannotBeChangedAfterAcceptanceRule } from './rules/MeetingProposalAgreementCannotBeChangedAfterAcceptanceRule';
import { MeetingProposalAgreementCannotBeChangedAfterRejectionRule } from './rules/MeetingProposalAgreementCannotBeChangedAfterRejectionRule';
import { MeetingProposalAgreementPartyRole } from './MeetingProposalAgreementPartyRole';

export interface MeetingAgreementProps {
  professor: MeetingProposalAgreementParty;
  student: MeetingProposalAgreementParty;
  lastProposingParty: MeetingProposalAgreementParty;
  status: MeetingProposalAgreementStatus;
}

export type MeetingAgreementFactoryProps = {
  studentId: UniqueEntityID;
  professorId: UniqueEntityID;
};

export class MeetingProposalAgreement extends Entity<MeetingAgreementProps> {
  public get status() {
    return this.props.status;
  }

  private constructor(props: MeetingAgreementFactoryProps) {
    const student = MeetingProposalAgreementParty.create({
      decision: MeetingProposalAgreementDecision.Accepted(),
      role: MeetingProposalAgreementPartyRole.Student(),
    });

    const professor = MeetingProposalAgreementParty.create({
      decision: null,
      role: MeetingProposalAgreementPartyRole.Professor(),
    });

    const constructorProps: MeetingAgreementProps = {
      lastProposingParty: student,
      student,
      professor,
      status: MeetingProposalAgreementStatus.InVerification(),
    };

    super(constructorProps);
  }

  public static create(props: MeetingAgreementFactoryProps) {
    return new MeetingProposalAgreement(props);
  }

  public changeTerm(party: MeetingProposalAgreementParty) {
    this.checkMeetingProposalAgreementChangingRules(party);

    party.changeTerm();
    if (party.hasProfessorRole()) {
      this.props.status = MeetingProposalAgreementStatus.InDiscussion();
    }

    this.props.lastProposingParty = party;
  }

  public accept(party: MeetingProposalAgreementParty) {
    this.checkMeetingProposalAgreementChangingRules(party);

    party.accept();
    if (party.hasProfessorRole()) {
      this.props.status = MeetingProposalAgreementStatus.Accepted();
    }

    this.props.lastProposingParty = party;
  }

  public reject(party: MeetingProposalAgreementParty) {
    this.checkMeetingProposalAgreementChangingRules(party);

    party.reject();
    this.props.status = MeetingProposalAgreementStatus.Rejected();

    this.props.lastProposingParty = party;
  }

  private checkMeetingProposalAgreementChangingRules(party: MeetingProposalAgreementParty) {
    this.checkRule(new MeetingProposalAgreementCanBeChangedOnlyByPartyRule(this, party));
    this.checkRule(
      new PartyCannotChangeMeetingProposalAgreementConsecutivelyRule(
        party,
        this.props.lastProposingParty,
      ),
    );
    this.checkRule(new MeetingProposalAgreementCannotBeChangedAfterAcceptanceRule(this));
    this.checkRule(new MeetingProposalAgreementCannotBeChangedAfterRejectionRule(this));
  }

  public hasParty(party: MeetingProposalAgreementParty) {
    return party.equals(this.props.student) || party.equals(this.props.professor);
  }
}
