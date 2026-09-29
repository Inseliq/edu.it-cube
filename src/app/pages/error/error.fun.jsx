import {
  useEffect,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

export function useErrorPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title =
      'Страница не найдена'
  }, [])

  function goBack() {
    navigate(-1)
  }

  function goHome() {
    navigate('/')
  }

  return {
    goBack,
    goHome,
  }
}