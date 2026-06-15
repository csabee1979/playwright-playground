export function getEnv(name: string): string | undefined {
  return process.env[name];
}

export function getRequiredEnv(name: string): string {
  const value = getEnv(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
