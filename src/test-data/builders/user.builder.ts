import type { User } from '../types/user.types';

export class UserBuilder {
  private user: User = {
    id: 'generated-user',
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
