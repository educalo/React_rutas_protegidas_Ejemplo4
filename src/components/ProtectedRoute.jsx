//el componente Outlet va a ir muchos componentes de React route
//children son los hijos de de las ruta actual
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
  isAllowed,
  redirectTo = "/landing",
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }
  //si children existe devuelve children sino que devuelva un Outlet
  return children ? children : <Outlet />;
};
