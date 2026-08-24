export default function StatCard({ label, value, icon, accent = false }) {
  return (
    <div className={`card flex items-center gap-4 p-5 ${accent ? 'bg-ink-800' : ''}`}>
      <div
        className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl text-xl ${
          accent ? 'bg-compass-500/20' : 'bg-compass-100'
        }`}
      >
        {icon}
      </div>
      <div>
        <p className={`text-2xl font-display font-semibold ${accent ? 'text-paper-50' : 'text-ink-800'}`}>{value}</p>
        <p className={`text-xs font-medium uppercase tracking-wide ${accent ? 'text-ink-200' : 'text-ink-400'}`}>{label}</p>
      </div>
    </div>
  )
}
