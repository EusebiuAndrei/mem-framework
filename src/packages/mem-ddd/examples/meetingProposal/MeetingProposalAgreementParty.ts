import { Entity } from '../..';
import { MeetingProposalAgreementDecision } from './MeetingProposalAgreementDecision';
import { MeetingProposalAgreementPartyRole } from './MeetingProposalAgreementPartyRole';

interface MeetingProposalAgreementPartyProps {
  decision: MeetingProposalAgreementDecision;
  role: MeetingProposalAgreementPartyRole;
}

export class MeetingProposalAgreementParty extends Entity<MeetingProposalAgreementPartyProps> {
  get id() {
    return this._id;
  }

  get role() {
    return this.props.role;
  }

  get decision() {
    return this.props.decision;
  }

  private constructor(props: MeetingProposalAgreementPartyProps) {
    super(props);
  }

  public static create(props: MeetingProposalAgreementPartyProps) {
    return new MeetingProposalAgreementParty(props);
  }

  public changeTerm() {
    this.props.decision = MeetingProposalAgreementDecision.TermsChanged();
  }

  public accept() {
    this.props.decision = MeetingProposalAgreementDecision.Accepted();
  }

  public reject() {
    this.props.decision = MeetingProposalAgreementDecision.Rejected();
  }

  public hasProfessorRole = () => this.role === MeetingProposalAgreementPartyRole.Professor();
  public hasStudentRole = () => this.role === MeetingProposalAgreementPartyRole.Student();
}
