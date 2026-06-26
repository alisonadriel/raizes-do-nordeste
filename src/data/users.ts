import type { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'user_1',
    name: 'Maria Silva',
    email: 'maria@email.com',
    password: '123456',
    phone: '81999990001',
    points: 85,
    createdAt: '2025-01-15T10:00:00.000Z',
  },
  {
    id: 'user_2',
    name: 'João Santos',
    email: 'joao@email.com',
    password: '123456',
    phone: '81999990002',
    points: 150,
    createdAt: '2025-02-20T14:30:00.000Z',
  },
];

export const DEMO_CREDENTIALS = {
  email: 'maria@email.com',
  password: '123456',
};
