import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import PublicLayout from './layouts/PublicLayout.jsx'

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SurveyList from './pages/SurveyList.jsx'
import CreateSurvey from './pages/CreateSurvey.jsx'
import EditSurvey from './pages/EditSurvey.jsx'
import QuestionBuilder from './pages/QuestionBuilder.jsx'
import Analytics from './pages/Analytics.jsx'
import PublicSurvey from './pages/PublicSurvey.jsx'
import SubmissionSuccess from './pages/SubmissionSuccess.jsx'

export default function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Public survey-taking flow */}
      <Route element={<PublicLayout />}>
        <Route path="/s/:slug" element={<PublicSurvey />} />
        <Route path="/s/:slug/thank-you" element={<SubmissionSuccess />} />
      </Route>

      {/* Authenticated app */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/surveys" element={<SurveyList />} />
          <Route path="/surveys/new" element={<CreateSurvey />} />
          <Route path="/surveys/:id" element={<EditSurvey />} />
          <Route path="/surveys/:id/questions" element={<QuestionBuilder />} />
          <Route path="/surveys/:id/analytics" element={<Analytics />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
