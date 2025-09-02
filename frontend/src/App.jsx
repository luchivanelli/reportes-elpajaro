import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import AddIncome from './pages/AddIncome.jsx';
import AddExpense from './pages/AddExpense.jsx';
import Reports from './pages/Reports.jsx';
import UpdateIncome from './pages/UpdateIncome.jsx';
import UpdateExpense from './pages/UpdateExpense.jsx';
import Login from './pages/Login.jsx';

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  if (!token) {
    // Redirige al login y guarda la ubicación actual
    return <Navigate to="/inicio-sesion" state={{ from: location }} replace />;
  }
  
  return children;
};

// Layout con navegación para rutas protegidas
const AuthenticatedLayout = ({ children }) => (
  <div className="flex">
    <Nav />
    {children}
  </div>
);

const AppContent = () => {
  return (
    <div>
      <Routes>
        {/* Ruta pública - Login */}
        <Route path="/inicio-sesion" element={<Login />} />
        
        {/* Rutas protegidas */}
        <Route path="/" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Home />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/reportes" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Reports />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/agregar-ingreso" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <AddIncome />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/ingreso/:id" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <UpdateIncome />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/agregar-egreso" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <AddExpense />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/egreso/:id" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <UpdateExpense />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />

        {/* Ruta catch-all para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App
