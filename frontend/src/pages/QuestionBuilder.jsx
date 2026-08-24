import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSurvey } from '../api/surveys'
import { createQuestion, listQuestionsForSurvey, QUESTION_TYPES } from '../api/questions'
import QuestionCard from '../components/surveys/QuestionCard.jsx'
import Button from '../components/ui/Button.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Alert from '../components/ui/Alert.jsx'

export default function QuestionBuilder() {
  const { id } = useParams()
  const [survey, setSurvey] = useState(null)
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    Promise.all([getSurvey(id), listQuestionsForSurvey(id)])
      .then(([surveyRes, questionsRes]) => {
        if (!isMounted) return
        setSurvey(surveyRes.data)
        const list = Array.isArray(questionsRes.data) ? questionsRes.data : questionsRes.data.results || []
        setQuestions(list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))
      })
      .catch(() => isMounted && setError('We could not load this survey.'))
      .finally(() => isMounted && setIsLoading(false))
    return () => {
      isMounted = false
    }
  }, [id])

  async function handleAddQuestion() {
    setIsAdding(true)
    setError('')
    try {
      const { data } = await createQuestion({
        survey: Number(id),
        question_text: '',
        question_type: QUESTION_TYPES[0].value,
        is_required: true,
        order: questions.length + 1,
      })
      setQuestions((prev) => [...prev, data])
    } catch (err) {
      setError('We could not add a new question.')
    } finally {
      setIsAdding(false)
    }
  }

  function handleDeleted(questionId) {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId))
  }

  function handleUpdated(updated) {
    setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-compass-600">Question builder</p>
          <h1 className="mt-1 font-display text-3xl text-ink-800">{survey?.title}</h1>
        </div>
        <Link to={`/surveys/${id}`}>
          <Button variant="ghost">← Back to survey</Button>
        </Link>
      </div>

      {error && <Alert tone="error" className="mb-6">{error}</Alert>}

      {questions.length === 0 ? (
        <EmptyState
          icon="📝"
          title="No questions yet"
          description="Add your first question to start building the survey."
          action={<Button variant="accent" onClick={handleAddQuestion} disabled={isAdding}>+ Add question</Button>}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              onDeleted={handleDeleted}
              onUpdated={handleUpdated}
            />
          ))}
        </div>
      )}

      {questions.length > 0 && (
        <Button variant="ghost" onClick={handleAddQuestion} isLoading={isAdding} className="mt-4 w-full border border-dashed border-ink-200">
          + Add another question
        </Button>
      )}
    </div>
  )
}
