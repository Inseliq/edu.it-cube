import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const pageTitles = {
  '/': 'Главная страница',
  '/main': 'Главная страница',
  '/courses': 'Все курсы',
  '/roadmap': 'Дорожная карта',
}

export function usePageTitle() {
  const location = useLocation()

  useEffect(() => {
    const pathname = location.pathname

    if (pathname.startsWith('/lesson/')) {
      document.title = 'Урок'
      return
    }

    document.title =
      pageTitles[pathname] ?? 'IT-Cube'
  }, [location.pathname])
}