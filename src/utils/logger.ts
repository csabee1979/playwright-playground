export function log(message: string, context?: Record<string, unknown>): void {
  const prefix = '[playwright-playground]';
  if (context) {
    console.log(prefix, message, context);
  } else {
    console.log(prefix, message);
  }
}
