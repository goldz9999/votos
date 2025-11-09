import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ElectoralLanding from './pages/ElectoralLanding';
import AdminLogin from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

// Componente para proteger rutas
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ElectoralLanding />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;