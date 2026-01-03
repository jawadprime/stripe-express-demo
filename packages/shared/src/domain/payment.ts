
import { Money } from "./money";
import { PaymentStatus } from "./payment-status";
import { PaymentId, CustomerId, PaymentReference, HasPaymentId } from "./value-objects";

export class Payment {
  readonly id: PaymentId;
  readonly customerId: CustomerId;
  readonly money: Money;
  readonly status: PaymentStatus;
  readonly reference: PaymentReference;

  constructor(props: {
    id: PaymentId;
    customerId: CustomerId;
    money: Money;
    status: PaymentStatus;
    reference: PaymentReference;
  }) {
    this.id = props.id;
    this.customerId = props.customerId;
    this.money = props.money;
    this.status = props.status;
    this.reference = props.reference;
  }

  withUpdatedId(newId: HasPaymentId): Payment {
    return new Payment({
      ...this,
      id: newId,
    });
  }
}