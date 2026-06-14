import { getEnv } from '@config/env';
import type { LoginUser } from '@test-data/types/user.types';
import { log } from '@utils/logger';

function buildLoginUserFromEnv(prefix: string): LoginUser | null {
  const id = getEnv(`${prefix}_ID`);
  const name = getEnv(`${prefix}_NAME`);
  const email = getEnv(`${prefix}_EMAIL`);
  const password = getEnv(`${prefix}_PASSWORD`);

  if (!id || !name || !email || !password) {
    const missingEnvVars = [
      !id && `${prefix}_ID`,
      !name && `${prefix}_NAME`,
      !email && `${prefix}_EMAIL`,
      !password && `${prefix}_PASSWORD`,
    ].filter((envVar): envVar is string => Boolean(envVar));

    log(`Incomplete login user env for ${prefix}`, { missingEnvVars });
    return null;
  }

  return { id, name, email, password };
}

function buildLoginUsersFromEnv(): LoginUser[] {
  return [
    buildLoginUserFromEnv('RESTFUL_API_USER'),
    buildLoginUserFromEnv('RESTFUL_API_ADMIN'),
  ].filter((user): user is LoginUser => user !== null);
}

class LoginUserRepository {
  constructor(private readonly loginUsers: LoginUser[]) {}

  findById(id: string): LoginUser | undefined {
    return this.loginUsers.find((user) => user.id === id);
  }
}

export const loginUserRepository = new LoginUserRepository(buildLoginUsersFromEnv());
