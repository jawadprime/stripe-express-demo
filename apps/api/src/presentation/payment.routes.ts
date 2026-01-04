import { Router } from "express";
import { PaymentOrchestrator } from "../application/payment-orchestrator.impl";
import { MockStripePaymentGateway} from "../infrastructure/mock-stripe-payment-gateway.impl";
import { PaymentController } from "./payment.controller";
import { asyncHandler } from "./middlewares/async-handler";
import { validateRequest } from './middlewares/validate-request';
import { CreateOneTimePaymentRequest } from "./contracts/create-onetime-payment/create-onetime-payment.request";
import { serviceBusClient } from "@stripe-express-demo/shared";
import { QueueMessageSender } from "../infrastructure/queue-message-sender.impl";
import { env } from "../config/env";
import { PaymentRepo } from "../infrastructure/payment-repo.impl";
import { UserRepo } from "../infrastructure/user-repo.impl";
const router = Router();

const gateway = new MockStripePaymentGateway();
const queueMessageSender = new QueueMessageSender(serviceBusClient(env.serviceBusConnectionString), env.queueName);
const paymentRepo = new PaymentRepo()
const userRepo = new UserRepo()
const orchestrator = new PaymentOrchestrator(gateway, paymentRepo, userRepo, queueMessageSender);
const controller = new PaymentController(orchestrator);

router.post(
  "/one-time",
  validateRequest(CreateOneTimePaymentRequest),
  asyncHandler(controller.createOneTimePayment)
);

export default router;