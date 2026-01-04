import { PaymentConfirmationSecret } from "@stripe-express-demo/shared";
export interface CreateOneTimePaymentResponse{
  clientSecret: PaymentConfirmationSecret
}