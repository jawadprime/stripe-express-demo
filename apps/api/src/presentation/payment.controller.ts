import { Request, Response } from "express";
import { CreateOneTimePaymentRequest } from "./contracts/create-onetime-payment/create-onetime-payment.request";
import { PaymentOrchestrator } from '../application/payment-orchestrator.impl';
import { CreateOneTimePaymentResponse } from "./contracts/create-onetime-payment/create-onetime-payment.response";
import { BaseController } from "./base.controller";
import { IdempotencyKey } from "@stripe-express-demo/shared";

export class PaymentController extends BaseController {
  constructor(private readonly orchestrator: PaymentOrchestrator){ super()}

  createOneTimePayment = async (req: Request, res: Response) =>{
    const dto = req.body as CreateOneTimePaymentRequest;
    const payment = dto.toDomain();
    const idempotencyKey = dto.idempotencyKey as IdempotencyKey;

    const createPaymentResult = await this.orchestrator.createOneTimePayment(payment, idempotencyKey);

    if (!createPaymentResult.ok) {
      return this.fromError(res, createPaymentResult.error);
    }

    const response = { clientSecret: createPaymentResult.value} as CreateOneTimePaymentResponse;

    res.status(201).json(response);
  }
}