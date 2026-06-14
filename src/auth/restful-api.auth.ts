import type { APIRequestContext } from '@playwright/test';
import type { RestfulApiConfig } from '@config/index';
import type { LoginUser } from '@test-data/types/user.types';
import type { RestfulAuthState } from './auth-state.types';

export const RESTFUL_API_AUTH_PROVIDER = 'restful-api';

type LoginResponse = {
  token: string;
  tokenType: string;
  expiresIn: number;
  user?: {
    email?: string;
  };
};

export function toAuthHeaders(state: RestfulAuthState): Record<string, string> {
  return {
    'x-api-key': state.apiKey,
    Authorization: `${state.tokenType} ${state.token}`,
  };
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
