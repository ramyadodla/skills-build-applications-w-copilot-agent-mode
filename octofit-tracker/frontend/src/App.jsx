import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import logoUrl from '../../../docs/octofitapp-small.png';
import { apiBaseUrl, usesLocalApiFallback } from './api';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-lockup">
          <img src={logoUrl} alt="OctoFit Tracker" className="app-logo" />
          <div>
            <p className="eyebrow">OctoFit Tracker</p>
            <h1>Activity Console</h1>
          </div>
        </div>
        <div className="api-status">
          <span className="status-dot" aria-hidden="true"></span>
          <span>{apiBaseUrl}</span>
        </div>
      </header>

      {usesLocalApiFallback && (
        <div className="alert alert-warning mb-0" role="status">
          VITE_CODESPACE_NAME is unset, so the frontend is using the local API fallback.
        </div>
      )}

      <nav className="navbar navbar-expand-lg app-nav" aria-label="OctoFit sections">
        <div className="container-fluid px-0">
          <div className="navbar-nav nav-pills flex-row flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
