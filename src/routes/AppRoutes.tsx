import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Loading, ToastContainer } from '@/components/ui';
import { AuthLayout, CheckoutLayout, MainLayout } from '@/layouts';
import { GuestRoute, ProtectedRoute, UnitRequiredRoute } from './ProtectedRoute';

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const UnitsPage = lazy(() => import('@/pages/UnitsPage').then((m) => ({ default: m.UnitsPage })));
const MenuPage = lazy(() => import('@/pages/MenuPage').then((m) => ({ default: m.MenuPage })));
const ProductPage = lazy(() => import('@/pages/ProductPage').then((m) => ({ default: m.ProductPage })));
const CartPage = lazy(() => import('@/pages/CartPage').then((m) => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage })));
const PaymentPage = lazy(() => import('@/pages/PaymentPage').then((m) => ({ default: m.PaymentPage })));
const ConfirmationPage = lazy(() => import('@/pages/ConfirmationPage').then((m) => ({ default: m.ConfirmationPage })));
const OrderTrackingPage = lazy(() => import('@/pages/OrderTrackingPage').then((m) => ({ default: m.OrderTrackingPage })));
const HistoryPage = lazy(() => import('@/pages/HistoryPage').then((m) => ({ default: m.HistoryPage })));
const ProfilePage = lazy(() => import('@/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const LoyaltyPage = lazy(() => import('@/pages/LoyaltyPage').then((m) => ({ default: m.LoyaltyPage })));
const PromotionsPage = lazy(() => import('@/pages/PromotionsPage').then((m) => ({ default: m.PromotionsPage })));
const ErrorPage = lazy(() => import('@/pages/ErrorPage').then((m) => ({ default: m.ErrorPage })));
const NotFoundPage = lazy(() => import('@/pages/ErrorPage').then((m) => ({ default: m.NotFoundPage })));

function PageLoader() {
  return <Loading fullScreen />;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <LoginPage />
                </GuestRoute>
              }
            />
            <Route
              path="/cadastro"
              element={
                <GuestRoute>
                  <RegisterPage />
                </GuestRoute>
              }
            />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/unidades" element={<UnitsPage />} />
            <Route
              path="/cardapio"
              element={
                <UnitRequiredRoute>
                  <MenuPage />
                </UnitRequiredRoute>
              }
            />
            <Route path="/produto/:id" element={<ProductPage />} />
            <Route path="/carrinho" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmacao/:orderId" element={<ConfirmationPage />} />
            <Route path="/pedido/:orderId" element={<OrderTrackingPage />} />
            <Route path="/historico" element={<HistoryPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/fidelidade" element={<LoyaltyPage />} />
            <Route path="/promocoes" element={<PromotionsPage />} />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <CheckoutLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/pagamento" element={<PaymentPage />} />
          </Route>

          <Route path="/erro" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
}
