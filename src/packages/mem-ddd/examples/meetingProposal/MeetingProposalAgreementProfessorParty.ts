import { MeetingAgreementProps } from './MeetingProposalAgreement';
import { MeetingProposalAgreementDecision } from './MeetingProposalAgreementDecision';
import { MeetingProposalAgreementStatus } from './MeetingProposalAgreementStatus';
import { MeetingProposalAgreementParty } from './MeetingProposalAgreementParty';

export class MeetingProposalAgreementProfessorParty implements MeetingProposalAgreementParty {
  public changeTerm(props: MeetingAgreementProps) {
    props.professorDecision = MeetingProposalAgreementDecision.TermsChanged();
    props.status = MeetingProposalAgreementStatus.InDiscussion();
  }

  public accept(props: MeetingAgreementProps) {
    props.professorDecision = MeetingProposalAgreementDecision.Accepted();
    props.status = MeetingProposalAgreementStatus.Accepted();
  }

  public reject(props: MeetingAgreementProps) {
    props.professorDecision = MeetingProposalAgreementDecision.Rejected();
    props.status = MeetingProposalAgreementStatus.Rejected();
  }
}
