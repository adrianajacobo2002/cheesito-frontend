import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./forms/login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NoAccess from "./pages/NoAccess";

import AdminDashboard from "./pages/Admin/Dashboard";
import MeseroDashboard from "./pages/Mesero/Dashboard";
import CocineroDashboard from "./pages/Cocinero/Dashboard";

import AdminHome from "./pages/Admin/Home";
import AdminPlatillos from "./pages/Admin/Platillos";
import AdminMesas from "./pages/Admin/Mesas";
import AdminOrdenes from "./pages/Admin/Ordenes";
import AdminReportes from "./pages/Admin/Reportes";

import MeseroHome from "./pages/Mesero/Home";
import MeseroMesaDetalle from "./pages/Mesero/MesaDetalle";
import MeseroOrdenes from "./pages/Mesero/Ordenes";
import MeseroOrdenDetalle from "./pages/Mesero/OrdenDetalle";
import MeseroOrdenar from "./pages/Mesero/Ordenar";

import CocineroHome from './pages/Cocinero/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de inicio de sesión */}
        <Route path="/" element={<Login />} />

        {/* Dashboard ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="platillos" element={<AdminPlatillos />} />
          <Route path="mesas" element={<AdminMesas />} />
          <Route path="ordenes" element={<AdminOrdenes />} />
          <Route path="reportes" element={<AdminReportes />} />
        </Route>

        {/* Dashboard MESERO */}
        <Route
          path="/mesero"
          element={
            <ProtectedRoute allowedRoles={["mesero"]}>
              <MeseroDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<MeseroHome />} />
          <Route path="home" element={<MeseroHome />} />
          <Route path="mesa-detalle" element={<MeseroMesaDetalle />} />
          <Route path="ordenes" element={<MeseroOrdenes />} />
          <Route path="orden-detalle" element={<MeseroOrdenDetalle />} />
          <Route path="ordenar" element={<MeseroOrdenar />} />
        </Route>

        {/* Dashboard COCINERO */}
        <Route
          path="/cocinero"
          element={
            <ProtectedRoute allowedRoles={["cocinero"]}>
              <CocineroDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<CocineroHome />} />
          <Route path="home" element={<CocineroHome />} />
        </Route>

        {/* Página de acceso denegado */}
        <Route path="/no-access" element={<NoAccess />} />
      </Routes>
    </Router>
  );
}

export default App;
