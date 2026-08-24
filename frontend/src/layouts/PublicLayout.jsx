import { Outlet } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink-100 bg-paper-50 px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <span className="text-xl">🧭</span>
          <span className="font-display text-base font-semibold text-ink-800">SurviQuest</span>
        </div>
      </header>
      <main className="px-4 py-10 sm:py-16">
        <Outlet />
      </main>
    </div>
  )
}
