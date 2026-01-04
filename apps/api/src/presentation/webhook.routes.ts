// presentation/routes/paymentRoutes.ts
import { Router } from "express";
import { PaymentOrchestrator } from "../application/payment-orchestrator.impl";
import { asyncHandler } from "./middlewares/async-handler";
import { WebHooksController } from "./webhooks.controller";
import express from 'express';
import { QueueMessageSender } from "../infrastructure/queue-message-sender.impl";
import { serviceBusClient } from "@stripe-express-demo/shared";
import { env } from "../config/env";
import { PaymentRepo } from "../infrastructure/payment-repo.impl";
import { MockStripePaymentGateway } from "../infrastructure/mock-stripe-payment-gateway.impl";
import { UserRepo } from "../infrastructure/user-repo.impl";
const router = Router();

const gateway = new MockStripePaymentGateway();
const queueMessageSender = new QueueMessageSender(serviceBusClient(env.serviceBusConnectionString), env.queueName);
const paymentRepo = new PaymentRepo()
const userRepo = new UserRepo()
const orchestrator = new PaymentOrchestrator(gateway, paymentRepo, userRepo, queueMessageSender);
const controller = new WebHooksController(orchestrator);

router.post(
  "/stripe",
  express.raw({ type: 'application/json' }), 
  asyncHandler(controller.handleStripeEvent)
);

export default router;
