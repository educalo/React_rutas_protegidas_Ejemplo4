import { useState } from "react";
//me permite crear multiples rutas
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Admin, Analytics, Dashboard, Home, Landing } from "./pages";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  //vamos a simular una llamada al backend user
  const [user, setUser] = useState(null);

  //peticion hacia el backend simulada
  //roles y permisos: puedo cambiarlo para comprobar si tengo acceso
  const login = () =>
    setUser({
      id: 1,
      name: "John",
      permissions: ["analize"],
      roles: ["admin"],
    });
  const logout = () => setUser(null);


  //<Route path="/landing" element={<Landing />} /> son equivalentes //<Route index element={<Landing />} />
  //el componente Navagation lo tengo definido mas abajo
  //si el user existe muestre logout sino el login
  //ProtectedRoute componente para comprobar la validación guardado en la carpeta componentes
  //Home y dashboard es un hijo del componente ProtectedRoute y tiene que pasar por este último antes
  //Ejemplo de ProtectedRoute para varios componentes o para uno solo
  //{!!user} es lo mismo que indicar {user?true:false}
  return (
    <BrowserRouter>
      <Navigation />

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}

      <Routes>
        <Route index element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="/analytics"
          element={
            <ProtectedRoute
              redirectTo="/home"
              isAllowed={!!user && user.permissions.includes("analize")}
            >
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              redirectTo="/home"
              isAllowed={!!user && user.roles.includes("admin")}
            >
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

//enlaces en la pagina principal
function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/landing">Landing</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
