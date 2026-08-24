import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex items-center gap-2">
            <span className="text-2xl">🧭</span>
            <span className="font-display text-xl font-semibold text-ink-800">SurviQuest</span>
          </div>
          <Outlet />
        </div>
      </div>

      {/* Right: expedition-styled panel, signature visual */}
      <div className="trail-path relative hidden overflow-hidden bg-ink-800 lg:block">
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-compass-400">Field manual · 01</p>
            <h2 className="mt-6 max-w-md font-display text-4xl leading-tight text-paper-50">
              Chart the terrain of what people actually think.
            </h2>
          </div>

          <div className="flex items-end justify-between gap-6">
            <p className="max-w-xs text-sm text-ink-200">
              Build a survey, send it out like a scout, and watch the responses mark their way back to base camp.
            </p>
            <div className="flex h-24 w-24 flex-none items-center justify-center rounded-full border border-compass-400/40">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-compass-400/70 text-2xl">
                🧭
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
