import { Result, DomainEventTuple, Payment, PaymentConfirmationSecret, IdempotencyKey } from "@stripe-express-demo/shared";

export interface IPaymentGateway{
    createOneTimePayment(payment: Payment, idempotencyKey: IdempotencyKey): Promise<Result<{ payment: Payment; clientSecret: PaymentConfirmationSecret }>>;
    constructEvent(rawBody: Buffer, signature: string): Promise<Result<DomainEventTuple>>;
}