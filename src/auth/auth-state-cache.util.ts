import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import type { CachedAuthState } from './auth-state.types';

const AUTH_STATE_DIR = resolve(process.cwd(), 'playwright', '.auth');

export function getAuthFilePath(provider: string, userId: string, workerIndex: number): string {
  return resolve(AUTH_STATE_DIR, provider, `${userId}-worker-${workerIndex}.json`);
}

export function isAuthStateValid(state: CachedAuthState, tokenExpiryBufferMs: number): boolean {
  const expiresAtMs = Date.parse(state.expiresAt);
  if (Number.isNaN(expiresAtMs)) {
    return false;
  }

  return expiresAtMs - tokenExpiryBufferMs > Date.now();
}

export async function readAuthState<T>(filePath: string): Promise<T | null> {
  try {
    const fileContents = await readFile(filePath, 'utf-8');
    return JSON.parse(fileContents) as T;
  } catch {
    return null;
  }
}

export async function writeAuthState<T>(filePath: string, state: T): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(state, null, 2), 'utf-8');
}
