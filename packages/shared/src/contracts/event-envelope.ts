import { DomainEvent } from "../domain/events/domain-event";
import { DomainEventType } from "../domain/events/domain-event-type";

export interface EventEnvelope {
  eventType: DomainEventType;
  event: DomainEvent;
}