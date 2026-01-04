
import { Money } from "./money";
import { PaymentStatus } from "./payment-status";
import { PaymentId, CustomerId, PaymentReference, HasPaymentId, IdempotencyKey, CreatedAt, ModifiedAt, HasCustomerId, UserId } from './value-objects';

export class Payment {
  readonly id: PaymentId;
  readonly customerId: CustomerId;
  readonly userId: UserId;
  readonly money: Money;
  readonly status: PaymentStatus;
  readonly reference: PaymentReference;
  readonly createdAt: CreatedAt;
  readonly modifiedAt: ModifiedAt;

  constructor(props: {
    id: PaymentId;
    customerId: CustomerId;
    userId: UserId;
    money: Money;
    status: PaymentStatus;
    reference: PaymentReference;
    createdAt: CreatedAt; 
    modifiedAt: ModifiedAt; 
  }) {
    this.id = props.id;
    this.customerId = props.customerId;
    this.userId = props.userId;
    this.money = props.money;
    this.status = props.status;
    this.reference = props.reference;
    this.createdAt = props.createdAt;
    this.modifiedAt = props.modifiedAt;
  }

  withCustomerId(customerId: HasCustomerId): Payment {
    return new Payment({
      ...this,
      customerId: customerId,
    });
  }
}