import { mockUsers } from '@/data/users';
import type { AuthSession, User } from '@/types';
import { generateId } from '@/utils/format';
import { getItem, setItem, shouldSimulateError, STORAGE_KEYS } from '@/utils';
import { isValidEmail, isValidPassword, isValidPhone } from '@/utils/validators';
import { AppError, simulateRequest } from './api';

function getUsers(): User[] {
  return getItem<User[]>(STORAGE_KEYS.USERS, mockUsers);
}

function saveUsers(users: User[]): void {
  setItem(STORAGE_KEYS.USERS, users);
}

function toSession(user: User): AuthSession {
  const { password: _, ...safeUser } = user;
  return { user: safeUser, token: generateId('token') };
}

export const authService = {
  async login(email: string, password: string): Promise<AuthSession> {
    return simulateRequest(undefined, 800, shouldSimulateError()).then(() => {
      const users = getUsers();
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
      );

      if (!user) {
        throw new AppError('E-mail ou senha incorretos.', 'AUTH');
      }

      const session = toSession(user);
      setItem(STORAGE_KEYS.SESSION, session);
      return session;
    });
  },

  async register(data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    acceptTerms: boolean;
  }): Promise<AuthSession> {
    return simulateRequest(undefined, 900, shouldSimulateError()).then(() => {
      const errors: string[] = [];

      if (!data.name.trim()) errors.push('Nome é obrigatório.');
      if (!isValidEmail(data.email)) errors.push('E-mail inválido.');
      if (!isValidPassword(data.password)) errors.push('Senha deve ter no mínimo 6 caracteres.');
      if (!isValidPhone(data.phone)) errors.push('Telefone inválido.');
      if (!data.acceptTerms) errors.push('Aceite os termos para continuar.');

      if (errors.length) {
        throw new AppError(errors.join(' '), 'VALIDATION');
      }

      const users = getUsers();
      if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
        throw new AppError('Este e-mail já está cadastrado.', 'VALIDATION');
      }

      const newUser: User = {
        id: generateId('user'),
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        password: data.password,
        phone: data.phone.replace(/\D/g, ''),
        points: 0,
        createdAt: new Date().toISOString(),
      };

      saveUsers([...users, newUser]);
      const session = toSession(newUser);
      setItem(STORAGE_KEYS.SESSION, session);
      return session;
    });
  },

  getSession(): AuthSession | null {
    return getItem<AuthSession | null>(STORAGE_KEYS.SESSION, null);
  },

  logout(): void {
    setItem(STORAGE_KEYS.SESSION, null);
  },

  updateUserPoints(userId: string, points: number): void {
    const users = getUsers();
    const updated = users.map((u) => (u.id === userId ? { ...u, points } : u));
    saveUsers(updated);

    const session = authService.getSession();
    if (session?.user.id === userId) {
      setItem(STORAGE_KEYS.SESSION, {
        ...session,
        user: { ...session.user, points },
      });
    }
  },

  getUserById(userId: string): User | undefined {
    return getUsers().find((u) => u.id === userId);
  },
};
