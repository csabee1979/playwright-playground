import { request as apiRequest, test as base } from '@playwright/test';
import { getConfig } from '@config/index';
import type { TestConfig } from '@config/index';
import { RestfulApiClient } from '@api/clients/restful-api.client';
import type { RestfulAuthState } from '@auth/auth-state.types';
import type { LoginUser } from '@test-data/types/user.types';
import { loginUsers, type LoginUserKey } from '@test-data/login-users';
import {
  getAuthFilePath,
  isAuthStateValid,
  readAuthState,
  writeAuthState,
} from '@auth/auth-state-cache.util';
import { login, RESTFUL_API_AUTH_PROVIDER, toAuthHeaders } from '@auth/restful-api.auth';

type AuthTestFixtures = {
  restfulApiAsUser: RestfulApiClient;
  restfulApiAsAdmin: RestfulApiClient;
};

type AuthWorkerFixtures = {
  workerUserAuthState: RestfulAuthState;
  workerAdminAuthState: RestfulAuthState;
};

async function resolveAuthState(
  loginUser: LoginUser,
  testConfig: TestConfig,
  workerIndex: number,
): Promise<RestfulAuthState> {
  const authFilePath = getAuthFilePath(RESTFUL_API_AUTH_PROVIDER, loginUser.id, workerIndex);
  const cachedState = await readAuthState<RestfulAuthState>(authFilePath);
  if (
    cachedState &&
    cachedState.apiKey === testConfig.restfulApi.apiKey &&
    isAuthStateValid(cachedState, testConfig.restfulApi.tokenExpiryBufferMs)
  ) {
    return cachedState;
  }

  const request = await apiRequest.newContext({ ignoreHTTPSErrors: testConfig.ignoreHTTPSErrors });
  const authState = await login(request, testConfig.restfulApi, loginUser);
  await request.dispose();

  await writeAuthState<RestfulAuthState>(authFilePath, authState);
  return authState;
}

function requireLoginUser(key: LoginUserKey): LoginUser {
  const loginUser = loginUsers[key];
  if (!loginUser) {
    throw new Error(
      `Missing login user "${key}". Check RESTFUL_API_*_ID/NAME/EMAIL/PASSWORD env vars.`,
    );
  }
  return loginUser;
}

async function resolveWorkerAuthState(
  key: LoginUserKey,
  workerIndex: number,
): Promise<RestfulAuthState> {
  const testConfig = getConfig();
  if (!testConfig.restfulApi.apiKey) {
    throw new Error('Missing RESTFUL_API_KEY.');
  }
  const loginUser = requireLoginUser(key);
  return resolveAuthState(loginUser, testConfig, workerIndex);
}

export const test = base.extend<AuthTestFixtures, AuthWorkerFixtures>({
  workerUserAuthState: [
    async ({}, use, workerInfo) => {
      await use(await resolveWorkerAuthState('regularUser', workerInfo.parallelIndex));
    },
    { scope: 'worker' },
  ],

  workerAdminAuthState: [
    async ({}, use, workerInfo) => {
      await use(await resolveWorkerAuthState('adminUser', workerInfo.parallelIndex));
    },
    { scope: 'worker' },
  ],

  restfulApiAsUser: async ({ workerUserAuthState }, use) => {
    const testConfig = getConfig();
    const request = await apiRequest.newContext({
      ignoreHTTPSErrors: testConfig.ignoreHTTPSErrors,
      extraHTTPHeaders: toAuthHeaders(workerUserAuthState),
    });
    await use(new RestfulApiClient(request, testConfig));
    await request.dispose();
  },

  restfulApiAsAdmin: async ({ workerAdminAuthState }, use) => {
    const testConfig = getConfig();
    const request = await apiRequest.newContext({
      ignoreHTTPSErrors: testConfig.ignoreHTTPSErrors,
      extraHTTPHeaders: toAuthHeaders(workerAdminAuthState),
    });
    await use(new RestfulApiClient(request, testConfig));
    await request.dispose();
  },
});
