// Result
export type Result<T = void> =
  | { ok: true; value: T }
  | { ok: false; error: Failure };

  
// Failure
export abstract class Failure {
  constructor(message: string) {
    this.message = message;
  }
  readonly message: string;
}

export class ValidationFailure extends Failure {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundFailure extends Failure {
  constructor(message: string) {
    super(message);
  }
}

export class QueueMessageSendingFailure extends Failure {
  constructor(message: string) {
    super(message);
  }
}



// Helpers
export const ok = <T>(value: T): Result<T> => ({ ok: true, value });
export const okEmpty = (): Result<void> => ({ ok: true, value: undefined });
export const err = (error: Failure): Result => ({ ok: false, error });