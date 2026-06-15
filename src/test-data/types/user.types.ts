export interface User {
  id: string;
  name: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user' | 'guest';
}

export interface LoginUser {
  name: string;
  email: string;
  password: string;
}
