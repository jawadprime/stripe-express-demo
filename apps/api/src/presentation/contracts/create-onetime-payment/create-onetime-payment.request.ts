import { IsString, IsOptional, IsNumber } from "class-validator";
import { Amount, CreatedAt, Currency, CustomerId, IdempotencyKey, ModifiedAt, NoCustomerId, NoPaymentId, NoPaymentReference, Payment, PaymentStatus, UserId } from "@stripe-express-demo/shared";
export class CreateOneTimePaymentRequest {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  userId!: string;

  @IsNumber()
  amount!: number;

  @IsString()
  currency!: string;

   @IsString()
  idempotencyKey!: string;

  toDomain(): Payment {
    return new Payment({
      id: new NoPaymentId(),
      reference: new NoPaymentReference(),
      userId: this.userId as UserId,
      customerId: new NoCustomerId(),
      money: {
        amount: this.amount as Amount,
        currency: this.currency as Currency,
      },
      status: PaymentStatus.PENDING,
      createdAt: new Date() as CreatedAt,
      modifiedAt: new Date() as ModifiedAt

    });
  }
}