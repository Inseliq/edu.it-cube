import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function usePageTitle() {
  const location = useLocation()

  useEffect(() => {
    const group = location.pathname.startsWith('/diary/')
      ? decodeURIComponent(location.pathname.split('/').pop())
      : null

    document.title = group
      ? `${group} – Журнал – IT-Куб`
      : 'Электронный журнал – IT-Куб'

    window.scrollTo(0, 0)
  }, [location.pathname])
}
