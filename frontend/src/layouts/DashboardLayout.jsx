import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Basecamp', icon: '⛺' },
  { to: '/surveys', label: 'Surveys', icon: '🗺️' },
]

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const initials = user
    ? `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase() || user.email?.[0]?.toUpperCase()
    : ''

  return (
    <div className="min-h-screen bg-paper lg:flex">
      {/* Sidebar: a "trail" of quest stops connecting each section */}
      <aside className="sticky top-0 flex h-screen w-64 flex-none flex-col border-r border-ink-100 bg-paper-50 px-5 py-6 max-lg:hidden">
        <div className="mb-10 flex items-center gap-2 px-2">
          <span className="text-2xl">🧭</span>
          <span className="font-display text-lg font-semibold text-ink-800">SurviQuest</span>
        </div>

        <nav className="relative flex flex-1 flex-col gap-1">
          <div className="absolute left-[22px] top-2 bottom-2 w-px bg-ink-100" aria-hidden="true" />
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative z-10 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-ink-800 text-paper-50'
                    : 'text-ink-500 hover:bg-ink-100 hover:text-ink-800'
                }`
              }
            >
              <span className="flex h-6 w-6 items-center justify-center">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-3 border-t border-ink-100 pt-4">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-compass-500 font-display text-sm font-semibold text-ink-900">
            {initials || '?'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink-800">
              {user ? `${user.first_name} ${user.last_name}` : 'Explorer'}
            </p>
            <p className="truncate text-xs text-ink-400">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Log out"
            className="rounded-lg p-2 text-ink-400 hover:bg-ink-100 hover:text-coral-600"
          >
            ⎋
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-ink-100 bg-paper-50 px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧭</span>
          <span className="font-display text-base font-semibold text-ink-800">SurviQuest</span>
        </div>
        <div className="flex items-center gap-2">
          <NavLink to="/dashboard" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-ink-600 hover:bg-ink-100">
            Basecamp
          </NavLink>
          <NavLink to="/surveys" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-ink-600 hover:bg-ink-100">
            Surveys
          </NavLink>
          <button onClick={handleLogout} className="rounded-lg p-2 text-ink-400 hover:bg-ink-100 hover:text-coral-600">
            ⎋
          </button>
        </div>
      </header>

      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
