import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUnit } from '@/contexts/UnitContext';
import { Loading } from '@/components/ui';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading fullScreen />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export function UnitRequiredRoute({ children }: ProtectedRouteProps) {
  const { unit } = useUnit();

  if (!unit) {
    return <Navigate to="/unidades" replace />;
  }

  return <>{children}</>;
}

export function GuestRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/unidades" replace />;
  }

  return <>{children}</>;
}
