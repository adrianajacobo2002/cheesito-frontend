import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './forms/login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NoAccess from './pages/NoAccess';

// Dashboards simples por rol
import AdminDashboard from './pages/Admin/Dashboard';
import MeseroDashboard from './pages/Mesero/Dashboard';
import CocineroDashboard from './pages/Cocinero/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de inicio de sesión */}
        <Route path="/" element={<Login />} />

        {/* Dashboard ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Dashboard MESERO */}
        <Route
          path="/mesero/dashboard"
          element={
            <ProtectedRoute allowedRoles={['mesero']}>
              <MeseroDashboard />
            </ProtectedRoute>
          }
        />

        {/* Dashboard COCINERO */}
        <Route
          path="/cocinero/dashboard"
          element={
            <ProtectedRoute allowedRoles={['cocinero']}>
              <CocineroDashboard />
            </ProtectedRoute>
          }
        />

        {/* Página de acceso denegado */}
        <Route path="/no-access" element={<NoAccess />} />
      </Routes>
    </Router>
  );
}

export default App;
