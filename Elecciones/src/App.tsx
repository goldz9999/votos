import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ElectoralLanding from './pages/ElectoralLanding';
import AdminLogin from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ElectoralLanding />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;