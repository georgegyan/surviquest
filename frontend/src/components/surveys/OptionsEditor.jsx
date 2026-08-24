import { useEffect, useState } from 'react'
import { createOption, deleteOption, listOptionsForQuestion, updateOption } from '../../api/options'
import Button from '../ui/Button.jsx'
import Spinner from '../ui/Spinner.jsx'

export default function OptionsEditor({ questionId }) {
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [draft, setDraft] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    let isMounted = true
    listOptionsForQuestion(questionId)
      .then(({ data }) => isMounted && setOptions(Array.isArray(data) ? data : data.results || []))
      .finally(() => isMounted && setIsLoading(false))
    return () => {
      isMounted = false
    }
  }, [questionId])

  async function handleAdd(e) {
    e.preventDefault()
    if (!draft.trim()) return
    setIsAdding(true)
    try {
      const { data } = await createOption({
        question: questionId,
        option_text: draft.trim(),
        order: options.length + 1,
      })
      setOptions((prev) => [...prev, data])
      setDraft('')
    } finally {
      setIsAdding(false)
    }
  }

  async function handleUpdate(option, text) {
    setOptions((prev) => prev.map((o) => (o.id === option.id ? { ...o, option_text: text } : o)))
    await updateOption(option.id, { ...option, option_text: text })
  }

  async function handleDelete(optionId) {
    setOptions((prev) => prev.filter((o) => o.id !== optionId))
    await deleteOption(optionId)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Spinner size="sm" />
      </div>
    )
  }

  return (
    <div className="mt-3 rounded-xl bg-ink-50/60 p-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">Answer options</p>
      <ul className="flex flex-col gap-2">
        {options.map((option, i) => (
          <li key={option.id} className="flex items-center gap-2">
            <span className="w-5 flex-none text-center text-xs text-ink-300">{i + 1}</span>
            <input
              className="input py-1.5 text-sm"
              defaultValue={option.option_text}
              onBlur={(e) => {
                if (e.target.value !== option.option_text) handleUpdate(option, e.target.value)
              }}
            />
            <button
              onClick={() => handleDelete(option.id)}
              className="rounded-lg p-1.5 text-ink-300 hover:bg-coral-500/10 hover:text-coral-600"
              aria-label="Remove option"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd} className="mt-2 flex gap-2">
        <input
          className="input py-1.5 text-sm"
          placeholder="Add an option…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <Button type="submit" variant="ghost" isLoading={isAdding} className="flex-none px-3 py-1.5 text-xs">
          Add
        </Button>
      </form>
    </div>
  )
}
