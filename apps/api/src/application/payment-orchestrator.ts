import { Payment, Result,RawEvent, RawEventVerificationSignature, IdempotencyKey, PaymentConfirmationSecret } from "@stripe-express-demo/shared";

export interface IPaymentOrchestrator{
    createOneTimePayment(payment: Payment, idempotencyKey: IdempotencyKey): Promise<Result<PaymentConfirmationSecret>>
    handleWebhookEvent(RawEvent:RawEvent, rawEventVerificationSignature: RawEventVerificationSignature): Promise<Result>;
}