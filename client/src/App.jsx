import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import Violations from './pages/Violations';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', color: '#f1f5f9' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/violations" element={<Violations />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}