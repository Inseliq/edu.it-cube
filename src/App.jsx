import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './app/components/layout/Layout'

import MainPage from './app/pages/main'
import DiaryPage from './app/pages/diary/diary'
import ErrorPage from './app/pages/error/error'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/diary" element={<MainPage />} />
        <Route path="/diary/:groupCode" element={<DiaryPage />} />
      </Route>

      <Route path="/404" element={<ErrorPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
