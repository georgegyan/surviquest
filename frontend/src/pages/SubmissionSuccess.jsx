export default function SubmissionSuccess() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-compass-400/40 bg-compass-50 text-4xl">
        🏁
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-compass-600">Journey complete</p>
      <h1 className="font-display text-3xl text-ink-800">Thanks for your response</h1>
      <p className="text-sm text-ink-400">
        Your answers have been logged. The survey's creator will use them to chart what comes next.
      </p>
    </div>
  )
}
