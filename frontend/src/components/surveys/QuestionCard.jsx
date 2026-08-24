import { useState } from 'react'
import { QUESTION_TYPES } from '../../api/questions'
import { deleteQuestion, updateQuestion } from '../../api/questions'
import Select from '../ui/Select.jsx'
import Button from '../ui/Button.jsx'
import OptionsEditor from './OptionsEditor.jsx'

const CHOICE_TYPES = new Set(['multiple_choice', 'checkbox', 'dropdown'])

export default function QuestionCard({ question, index, onDeleted, onUpdated }) {
  const [text, setText] = useState(question.question_text)
  const [type, setType] = useState(question.question_type)
  const [isRequired, setIsRequired] = useState(!!question.is_required)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const hasOptions = CHOICE_TYPES.has(type)

  async function persist(patch) {
    setIsSaving(true)
    try {
      const { data } = await updateQuestion(question.id, {
        survey: question.survey,
        question_text: text,
        question_type: type,
        is_required: isRequired,
        order: question.order,
        ...patch,
      })
      onUpdated?.(data)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    setIsDeleting(true)
    try {
      await deleteQuestion(question.id)
      onDeleted?.(question.id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="card p-5">
      <div className="flex items-start gap-3">
        <div className="mt-2 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-ink-800 font-mono text-xs font-semibold text-paper-50">
          {index + 1}
        </div>
        <div className="min-w-0 flex-1">
          <textarea
            className="input resize-none border-none bg-transparent px-0 py-1 font-display text-base focus:ring-0"
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => persist({ question_text: text })}
            placeholder="Question text"
          />

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Select
              className="w-48"
              value={type}
              onChange={(e) => {
                setType(e.target.value)
                persist({ question_type: e.target.value })
              }}
            >
              {QUESTION_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </Select>

            <label className="flex items-center gap-2 text-sm text-ink-500">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-ink-300 text-compass-500 focus:ring-compass-500"
                checked={isRequired}
                onChange={(e) => {
                  setIsRequired(e.target.checked)
                  persist({ is_required: e.target.checked })
                }}
              />
              Required
            </label>

            {isSaving && <span className="text-xs text-ink-300">Saving…</span>}

            <Button
              variant="ghost"
              onClick={handleDelete}
              isLoading={isDeleting}
              className="ml-auto px-3 py-1.5 text-xs text-coral-600 hover:bg-coral-500/10"
            >
              Remove
            </Button>
          </div>

          {hasOptions && <OptionsEditor questionId={question.id} />}
        </div>
      </div>
    </div>
  )
}
