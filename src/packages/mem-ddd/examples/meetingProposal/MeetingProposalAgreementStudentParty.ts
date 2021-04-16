import { MeetingAgreementProps } from './MeetingProposalAgreement';
import { MeetingProposalAgreementDecision } from './MeetingProposalAgreementDecision';
import { MeetingProposalAgreementStatus } from './MeetingProposalAgreementStatus';
import { MeetingProposalAgreementParty } from './MeetingProposalAgreementParty';

export class MeetingProposalAgreementStudentParty implements MeetingProposalAgreementParty {
  public changeTerm(props: MeetingAgreementProps) {
    props.studentDecision = MeetingProposalAgreementDecision.TermsChanged();
  }

  public accept(props: MeetingAgreementProps) {
    props.studentDecision = MeetingProposalAgreementDecision.Accepted();
  }

  public reject(props: MeetingAgreementProps) {
    props.studentDecision = MeetingProposalAgreementDecision.Rejected();
    props.status = MeetingProposalAgreementStatus.Rejected();
  }
}
