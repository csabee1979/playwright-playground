import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import type { APIRequestContext } from '@playwright/test';
import type { RestfulApiConfig } from '@config/index';
import type { LoginUser } from '@test-data/types/user.types';
import type { RestfulAuthState } from './auth-state.types';

type LoginResponse = {
  token: string;
  tokenType: string;
  expiresIn: number;
  user?: {
    email?: string;
  };
};

const AUTH_STATE_DIR = resolve(process.cwd(), 'playwright', '.auth');
const TOKEN_EXPIRY_BUFFER_MS = 60_000;

export function getAuthFilePath(userId: string, workerIndex: number): string {
  return resolve(AUTH_STATE_DIR, `${userId}-worker-${workerIndex}.json`);
}

export function isAuthStateValid(state: RestfulAuthState): boolean {
  const expiresAtMs = Date.parse(state.expiresAt);
  if (Number.isNaN(expiresAtMs)) {
    return false;
  }

  return expiresAtMs - TOKEN_EXPIRY_BUFFER_MS > Date.now();
}

export function toAuthHeaders(state: RestfulAuthState): Record<string, string> {
  return {
    'x-api-key': state.apiKey,
    Authorization: `${state.tokenType} ${state.token}`,
  };
}

export async function readAuthState(filePath: string): Promise<RestfulAuthState | null> {
  try {
    const fileContents = await readFile(filePath, 'utf-8');
    return JSON.parse(fileContents) as RestfulAuthState;
  } catch {
    return null;
  }
}

export async function writeAuthState(filePath: string, state: RestfulAuthState): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(state, null, 2), 'utf-8');
}

export async function login(
  request: APIRequestContext,
  restfulApi: RestfulApiConfig,
  loginUser: LoginUser,
): Promise<RestfulAuthState> {
  const response = await request.post(`${restfulApi.url.replace(/\/$/, '')}/login`, {
    headers: {
      'x-api-key': restfulApi.apiKey,
      'Content-Type': 'application/json',
    },
    data: {
      email: loginUser.email,
      password: loginUser.password,
    },
  });

  if (!response.ok()) {
    throw new Error(`Failed to authenticate with restful-api.dev. Status: ${response.status()}`);
  }

  const body = (await response.json()) as LoginResponse;
  if (!body.token || !body.tokenType || !body.expiresIn) {
    throw new Error('Unexpected login response from restful-api.dev');
  }

  const expiresAt = new Date(Date.now() + body.expiresIn * 1000).toISOString();

  return {
    apiKey: restfulApi.apiKey,
    token: body.token,
    tokenType: body.tokenType,
    expiresAt,
    email: body.user?.email ?? loginUser.email,
  };
}
