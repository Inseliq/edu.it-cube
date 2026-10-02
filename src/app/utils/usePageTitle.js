import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const pageTitles = {
  '/': 'Educational Platform — IT-Cube',
  '/diary': 'Дневник — IT-Cube',
}

export function usePageTitle() {
  const location = useLocation()

  useEffect(() => {
    const pathname = location.pathname

    if (pathname.startsWith('/diary/')) {
      document.title = `${decodeURIComponent(pathname.split('/').pop())} — Дневник`
      return
    }

    if (pathname.startsWith('/lesson/')) {
      document.title = 'Урок — IT-Cube'
      return
    }

    document.title = pageTitles[pathname] ?? 'Educational Platform — IT-Cube'
  }, [location.pathname])
}
