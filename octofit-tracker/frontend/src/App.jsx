import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigation = [
  ['/', 'Overview'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Athletes'],
  ['/workouts', 'Workouts'],
]

function Overview() {
  return (
    <section className="page-section overview-section">
      <p className="eyebrow">Your movement, in one place</p>
      <h1>Make progress visible.</h1>
      <p className="intro-copy">Log the work, find your people, and keep the next good decision close at hand.</p>
      <div className="overview-links">
        <NavLink className="primary-action" to="/workouts">Browse workouts</NavLink>
        <NavLink className="text-action" to="/leaderboard">View the leaderboard</NavLink>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">
          <img src="/octofitapp-small.png" alt="" />
          <span>OctoFit <strong>Tracker</strong></span>
        </NavLink>
        <nav aria-label="Main navigation">
          {navigation.map(([path, label]) => (
            <NavLink key={path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={path}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}