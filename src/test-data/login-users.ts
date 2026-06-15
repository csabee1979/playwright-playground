import { getEnv } from '@config/env';
import type { LoginUser } from '@test-data/types/user.types';
import { log } from '@utils/logger';

function loginUserFromEnv(prefix: string): LoginUser | undefined {
  const name = getEnv(`${prefix}_NAME`);
  const email = getEnv(`${prefix}_EMAIL`);
  const password = getEnv(`${prefix}_PASSWORD`);

  if (!name || !email || !password) {
    const missingEnvVars = [
      !name && `${prefix}_NAME`,
      !email && `${prefix}_EMAIL`,
      !password && `${prefix}_PASSWORD`,
    ].filter((envVar): envVar is string => Boolean(envVar));

    log(`Incomplete login user env for ${prefix}`, { missingEnvVars });
    return undefined;
  }

  return { name, email, password };
}

export const loginUsers = {
  regularUser: loginUserFromEnv('RESTFUL_API_USER'),
  adminUser: loginUserFromEnv('RESTFUL_API_ADMIN'),
} as const;

export type LoginUserKey = keyof typeof loginUsers;
