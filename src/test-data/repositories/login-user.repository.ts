import { getEnv } from '@config/env';
import type { LoginUser } from '@test-data/types/user.types';

function buildLoginUserFromEnv(prefix: string): LoginUser | null {
  const id = getEnv(`${prefix}_ID`);
  const name = getEnv(`${prefix}_NAME`);
  const email = getEnv(`${prefix}_EMAIL`);
  const password = getEnv(`${prefix}_PASSWORD`);

  if (!id || !name || !email || !password) {
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
