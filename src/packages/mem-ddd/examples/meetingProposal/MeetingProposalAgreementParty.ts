import { MeetingAgreementProps } from './MeetingProposalAgreement';

export interface MeetingProposalAgreementParty {
  changeTerm(props: MeetingAgreementProps): void;
  accept(props: MeetingAgreementProps): void;
  reject(props: MeetingAgreementProps): void;
}
