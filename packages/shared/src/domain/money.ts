import { Amount, Currency } from "./value-objects";

export interface Money {
  readonly amount: Amount;
  readonly currency: Currency;
}
