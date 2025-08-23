import { ReactNode } from 'react';
import { Navigate, useLocation } from "react-router";
import { useAuth } from "src/context/AuthContext";

/**
 * Guard component dùng để bảo vệ các route cần xác thực đăng nhập.
 * @param children - Nội dung (component) sẽ được render nếu đủ điều kiện
 * @param requiresAuth - Có yêu cầu xác thực hay không
 * @returns JSX: children nếu đủ điều kiện, ngược lại chuyển về trang đăng nhập
 */
export const RequireAuth = ({ children, requiresAuth = false }: { children: ReactNode, requiresAuth?: boolean }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated && requiresAuth) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};