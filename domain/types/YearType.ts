export enum PaymentMethodENUM {
  pix = "PIX",
  paypal = "PayPal",
  other = "Outro",
}

export enum VoteChoicesENUM {
  ag = "AG",
  ocbGathering = "OCB Gathering",
  other = "Outro",
  none = "Nenhum",
}

export interface EntriesType {
  id: string;
  date: Date;
  rightToVote: VoteChoicesENUM[];
  otherChoiceRightToVote: string | null;
  voted: [];
  annualFeeValue: number;
  receipt: boolean;
  paymentMethod: PaymentMethodENUM;
  otherPaymentMethod: string | null;
}

export interface YearType {
  year: number;
  entries: EntriesType[];
}
