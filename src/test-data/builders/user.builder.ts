import type { User } from '../types/user.types';

export class UserBuilder {
  private user: User = {
    id: 'generated-user',
    name: 'GeneratedUser',
    email: 'generated@example.com',
    displayName: 'Generated User',
    role: 'user',
  };

  withId(id: string): this {
    this.user = { ...this.user, id };
    return this;
  }

  withEmail(email: string): this {
    this.user = { ...this.user, email };
    return this;
  }

  withName(name: string): this {
    this.user = { ...this.user, name };
    return this;
  }

  withDisplayName(displayName: string): this {
    this.user = { ...this.user, displayName };
    return this;
  }

  withRole(role: User['role']): this {
    this.user = { ...this.user, role };
    return this;
  }

  asAdmin(): this {
    return this.withRole('admin');
  }

  build(): User {
    return { ...this.user };
  }
}
