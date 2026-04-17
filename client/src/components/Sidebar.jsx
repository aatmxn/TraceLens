import { NavLink } from 'react-router-dom';
import { Shield, Image, AlertTriangle, LayoutDashboard } from 'lucide-react';

const links = [
  { to: '/', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/assets', icon: <Image size={18} />, label: 'Protected Assets' },
  { to: '/violations', icon: <AlertTriangle size={18} />, label: 'Violations' }
];

export default function Sidebar() {
  return (
    <aside style={{ width: '220px', background: '#1e293b', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <Shield color="#6366f1" />
        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>AssetGuard</span>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {links.map(l => (
          <NavLink
            key={l.to} to={l.to}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.6rem 1rem', borderRadius: '8px', textDecoration: 'none',
              color: isActive ? '#6366f1' : '#94a3b8',
              background: isActive ? '#312e81' : 'transparent'
            })}
          >
            {l.icon} {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}