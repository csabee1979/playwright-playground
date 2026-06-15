import { getConfig } from '@config/index';
import type { EnvironmentName } from '@config/types';
import { users as usersDev } from './users.dev';
import { users as usersLocal } from './users.local';
import { users as usersProduction } from './users.production';
import { users as usersStaging } from './users.staging';

const usersByEnvironment: Record<EnvironmentName, typeof usersLocal> = {
  local: usersLocal,
  dev: usersDev,
  staging: usersStaging,
  production: usersProduction,
};

export const users = usersByEnvironment[getConfig().name];
