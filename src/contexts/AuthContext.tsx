import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { authService } from '@/services/authService';
import type { AuthSession } from '@/types';

export interface AuthContextValue {
  session: AuthSession | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthSession>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    acceptTerms: boolean;
  }) => Promise<AuthSession>;
  logout: () => void;
  refreshSession: () => void;
  updatePoints: (points: number) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => authService.getSession());
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const newSession = await authService.login(email, password);
      setSession(newSession);
      return newSession;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (data: {
      name: string;
      email: string;
      password: string;
      phone: string;
      acceptTerms: boolean;
    }) => {
      setLoading(true);
      try {
        const newSession = await authService.register(data);
        setSession(newSession);
        return newSession;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    authService.logout();
    setSession(null);
  }, []);

  const refreshSession = useCallback(() => {
    setSession(authService.getSession());
  }, []);

  const updatePoints = useCallback(
    (points: number) => {
      if (!session) return;
      authService.updateUserPoints(session.user.id, points);
      refreshSession();
    },
    [session, refreshSession],
  );

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: !!session,
      loading,
      login,
      register,
      logout,
      refreshSession,
      updatePoints,
    }),
    [session, loading, login, register, logout, refreshSession, updatePoints],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
