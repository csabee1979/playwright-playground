import type { User } from './types/user.types';

export const users = {
  demoUser: {
    id: 'user-001',
    name: 'DemoUser',
    email: 'demo.user@example.com',
    displayName: 'Demo User',
    role: 'user',
  },
  demoAdmin: {
    id: 'admin-001',
    name: 'DemoAdmin',
    email: 'demo.admin@example.com',
    displayName: 'Demo Admin',
    role: 'admin',
  },
} satisfies Record<string, User>;
