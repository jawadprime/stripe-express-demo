// ===== Branded Primitive Types =====
export type CustomerId = string & { readonly __brand: "CustomerId" };
export type Currency = string & { readonly __brand: "Currency" };
export type Amount = number & { readonly __brand: "Amount" };
export type Event = Buffer & { readonly __brand: "Event" };
export type RawEvent = Buffer & { readonly __brand: "RawEvent" };
export type RawEventVerificationSignature = string & { readonly __brand: "RawEventVerificationSignature" };


// ===== Payment ID =====
export abstract class PaymentId {}
export class HasPaymentId extends PaymentId {
  constructor(public readonly value: string) {
    super();
  }
}
export class NoPaymentId extends PaymentId {}


// ===== Payment Reference =====
export abstract class PaymentReference {}
export class HasPaymentReference extends PaymentReference {
  constructor(public readonly value: string) {
    super();
  }
}
export class NoPaymentReference extends PaymentReference {}