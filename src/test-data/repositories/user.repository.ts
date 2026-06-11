import users from '@test-data/users.json';
import type { User } from '@test-data/types/user.types';

const userRoles: readonly User['role'][] = ['admin', 'user', 'guest'];

function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.displayName === 'string' &&
    typeof candidate.role === 'string' &&
    userRoles.includes(candidate.role as User['role'])
  );
}

function parseUsers(value: unknown): User[] {
  if (!Array.isArray(value) || !value.every(isUser)) {
    throw new Error('Invalid user test data. Expected an array of User objects.');
  }
  return value;
}

class UserRepository {
  constructor(private readonly seedUsers: User[]) {}

  getAll(): User[] {
    return [...this.seedUsers];
  }

  findById(id: string): User | undefined {
    return this.seedUsers.find((user) => user.id === id);
  }

  findByName(name: string): User | undefined {
    return this.seedUsers.find((user) => user.name === name);
  }

  findByEmail(email: string): User | undefined {
    return this.seedUsers.find((user) => user.email === email);
  }
}

export const userRepository = new UserRepository(parseUsers(users));
