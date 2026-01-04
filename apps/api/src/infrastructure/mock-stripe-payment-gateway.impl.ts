import { Payment, Result, HasPaymentReference, ok, DomainEventType, Amount, CustomerId, Currency, PaymentCreatedEvent, DomainEventTuple, PaymentConfirmationSecret, StripeEvent, HasCustomerId } from '@stripe-express-demo/shared';
import { IPaymentGateway } from "../application/payment-gateway";
import { mapStripePaymentStatusToDomain, StripePaymentStatus } from "./stripe-payment-status";
import { HasPaymentId } from "@stripe-express-demo/shared";

export class MockStripePaymentGateway implements IPaymentGateway {
  async constructEvent(
    rawBody: Buffer,
    signature: string
  ): Promise<Result<DomainEventTuple>> {
    const stripeEvent = StripeEvent.PaymentIntentCreated;
    let domainEvent: DomainEventTuple;

    switch (stripeEvent) {
      case StripeEvent.PaymentIntentCreated:
        domainEvent = [
          new PaymentCreatedEvent(
            new HasPaymentId("pi_3MtwBwLkdIwHu7ix28a3tqPa"),
            new HasCustomerId("cus_NffrFeUfNV2Hib"),
            { amount: 100 as Amount, currency: "usd" as Currency }
          ),
          DomainEventType.PaymentCreated
        ] as const;
        break;

      default:
        throw new Error(`Unhandled stripe event: ${stripeEvent}`);
    }

    return ok(domainEvent);
  }

  async createOneTimePayment(
    payment: Payment
  ): Promise<Result<{ payment: Payment; clientSecret: PaymentConfirmationSecret }>> {
    return ok({
      payment: new Payment({
        ...payment,
        reference: new HasPaymentReference("pi_3MtwBwLkdIwHu7ix28a3tqPa"),
        money: {
          amount: 2000 as Amount,
          currency: "usd" as Currency
        },
        status: mapStripePaymentStatusToDomain(StripePaymentStatus.PaymentRequiresAction)
      }),
      clientSecret: "pi_3MtwBwLkdIwHu7ix28a3tqPa_secret_3MtwBwLkdIwHu7ix28a3tqPa" as PaymentConfirmationSecret
    });
  }
}