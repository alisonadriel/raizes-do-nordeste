export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  points: number;
  createdAt: string;
}

export interface AuthSession {
  user: Omit<User, 'password'>;
  token: string;
}
