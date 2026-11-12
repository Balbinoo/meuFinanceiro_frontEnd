import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../router/routes";

export function ProtectedRoute() {
  const location = useLocation();
  const token = sessionStorage.getItem("access_token");

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }
  return <Outlet />;
}
