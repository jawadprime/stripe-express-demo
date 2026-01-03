import { DomainEventType } from "./domain-event-type";

export abstract class DomainEvent {}
export type DomainEventTuple = readonly [DomainEvent, DomainEventType];