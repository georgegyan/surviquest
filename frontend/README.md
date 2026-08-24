# SurviQuest — Frontend

React + Tailwind frontend for the SurviQuest survey platform.

## Stack
- React 18 + Vite
- React Router v6
- Axios (with JWT access/refresh interceptors)
- Tailwind CSS
- Recharts
- Context API for auth state

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL to your backend
npm run dev
```

## Folder structure

```
src/
├── api/          Axios client + one module per resource (auth, surveys, questions, options, publicSurveys, analytics, exports)
├── components/   ui/ (Button, Input, Card...), surveys/ (SurveyCard, QuestionCard, OptionsEditor), charts/ (Recharts wrappers)
├── context/      AuthContext — login/register/logout, profile loading
├── hooks/        useAuth
├── layouts/      DashboardLayout (authenticated app shell), AuthLayout, PublicLayout
├── pages/        One file per route (see below)
├── routes/       ProtectedRoute guard
└── utils/        formatters.js
```

## Pages / routes

| Route | Page | Notes |
|---|---|---|
| `/login` | Login | |
| `/register` | Register | |
| `/dashboard` | Dashboard | Stats + recent surveys |
| `/surveys` | SurveyList | Search/filter |
| `/surveys/new` | CreateSurvey | |
| `/surveys/:id` | EditSurvey | Details, public link, export, delete |
| `/surveys/:id/questions` | QuestionBuilder | Add/edit/reorder questions + options |
| `/surveys/:id/analytics` | Analytics | Recharts line/bar/pie + export buttons |
| `/s/:slug` | PublicSurvey | Public-facing form, no auth |
| `/s/:slug/thank-you` | SubmissionSuccess | |

## Auth

JWT access + refresh tokens are stored in `localStorage`. The Axios response
interceptor in `src/api/axiosClient.js` catches `401`s, calls
`/api/auth/refresh/` once, retries the original request, and queues any
requests that arrive while a refresh is in flight. If the refresh itself
fails, tokens are cleared and the user is redirected to `/login`.

## Analytics data shape

`GET /api/surveys/{id}/analytics/` fields (`responses_per_day`,
`question_breakdown`, `rating_summary`, `option_statistics`) are normalized
in `src/pages/Analytics.jsx` to tolerate a couple of reasonable key-naming
variants from the backend (e.g. `date` vs `day`, `count` vs `value`). Adjust
`normalizeSeries()` there if your serializer uses different field names.
