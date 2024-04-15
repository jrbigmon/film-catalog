import { IDomainEvent } from './domain-event.interface';
import { Entity } from './entity';

export abstract class AggregateRoot extends Entity {
  private events: Set<IDomainEvent> = new Set<IDomainEvent>();
  private dispatchedEvents: Set<IDomainEvent> = new Set<IDomainEvent>();

  addEvent(event: IDomainEvent) {
    this.events.add(event);
  }

  marEventAsDispatched(event: IDomainEvent) {
    this.dispatchedEvents.add(event);
    this.events.delete(event);
  }

  getUncommittedEvents(): IDomainEvent[] {
    return Array.from(this.events);
  }

  getCommittedEvents(): IDomainEvent[] {
    return Array.from(this.dispatchedEvents);
  }

  clearEvents() {
    this.events.clear();
    this.dispatchedEvents.clear();
  }
}
