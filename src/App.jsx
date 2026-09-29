import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import Layout from './app/components/layout/Layout'

import MainPage from './app/pages/main'
import CoursesPage from './app/pages/courses/courses'
import LessonPage from './app/pages/lesson/lesson'
import RoadmapPage from './app/pages/roadmap/roadmap'
import DownloadPage from './app/pages/download/download'
import ErrorPage from './app/pages/error/error'

export default function App() {
  return (
    <Routes>

      {/* Страницы с общим Layout */}
      <Route element={<Layout />}>

        <Route
          path="/"
          element={<MainPage />}
        />

        <Route
          path="/main"
          element={<MainPage />}
        />

        <Route
          path="/courses"
          element={<CoursesPage />}
        />

        <Route
          path="/lesson"
          element={
            <Navigate
              to="/courses"
              replace
            />
          }
        />

        <Route
          path="/lessons"
          element={
            <Navigate
              to="/courses"
              replace
            />
          }
        />

        <Route
          path="/lesson/:lessonSlug"
          element={<LessonPage />}
        />

        <Route
          path="/roadmap"
          element={<RoadmapPage />}
        />

      </Route>

      {/* ErrorPage специально находится вне Layout */}
      <Route
        path="/404"
        element={<ErrorPage />}
      />

      <Route
        path="/download/:lessonSlug"
        element={<DownloadPage />}
      />

      {/* Любой неизвестный URL */}
      <Route
        path="*"
        element={
          <Navigate
            to="/404"
            replace
          />
        }
      />

    </Routes>
  )
}