import { Payment, Result,  ok, RawEventVerificationSignature, RawEvent, okEmpty, IdempotencyKey, PaymentConfirmationSecret, HasCustomerId } from '@stripe-express-demo/shared';
import { IPaymentGateway } from './payment-gateway';
import { IPaymentOrchestrator } from './payment-orchestrator';
import { IQueueMessageSender } from './queue-message-sender';
import { IPaymentRepo } from './payment-repo';
import { IUserRepo } from './user-repo';

export class PaymentOrchestrator implements IPaymentOrchestrator{
    constructor(
        private readonly gateway: IPaymentGateway, 
        private readonly paymentRepo: IPaymentRepo, 
        private readonly userRepo: IUserRepo, 
        private readonly queueMessageSender: IQueueMessageSender
    ) {}
    
    async handleWebhookEvent(rawEvent: RawEvent, rawEventVerificationSignature: RawEventVerificationSignature): Promise<Result> {
        const eventResult = await this.gateway.constructEvent(rawEvent, rawEventVerificationSignature);
        if (!eventResult.ok) return eventResult;

        const [event, eventType] = eventResult.value
        await this.queueMessageSender.send({ eventType: eventType, event: event})

        return okEmpty();
    }

    async createOneTimePayment(payment: Payment, idempotencyKey: IdempotencyKey): Promise<Result<PaymentConfirmationSecret>> {
        const customerIdResult = await this.userRepo.FindUserCustomerId(payment.userId);
        if(!customerIdResult.ok) return customerIdResult;

        const paymentWithCustomerId = payment.withCustomerId(customerIdResult.value as HasCustomerId); 
        const createPaymentResult = await this.gateway.createOneTimePayment(paymentWithCustomerId, idempotencyKey);
        if (!createPaymentResult.ok) return createPaymentResult;

        const persistPaymentResult = await this.paymentRepo.persistPayment(createPaymentResult.value.payment, idempotencyKey);
        if(!persistPaymentResult.ok) return persistPaymentResult;

        return ok(createPaymentResult.value.clientSecret);
    }
}