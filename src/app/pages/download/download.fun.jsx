import { useEffect } from 'react'
import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import { courses } from '../../data/courses.map'

const presentationFiles = import.meta.glob(
  '../../assets/uploads/repo*/*.pptx',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
)

export function useDownloadPage() {
  const { lessonSlug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    let foundCourse = null

    for (const course of courses) {
      const lesson = course.lessons.find(
        (item) => item.slug === lessonSlug,
      )

      if (lesson) {
        foundCourse = course
        break
      }
    }

    if (!foundCourse) {
      navigate('/404', {
        replace: true,
      })
      return
    }

    const presentationName =
      `${lessonSlug}.pptx`

    const presentationSuffix =
      `/repo${foundCourse.repo}/${presentationName}`

    const presentationEntry =
      Object.entries(
        presentationFiles,
      ).find(([path]) =>
        path.endsWith(presentationSuffix),
      )

    if (!presentationEntry) {
      navigate('/404', {
        replace: true,
      })
      return
    }

    const presentationUrl =
      presentationEntry[1]

    const link =
      document.createElement('a')

    link.href = presentationUrl
    link.download = presentationName

    document.body.appendChild(link)

    link.click()
    link.remove()

    setTimeout(() => {
      window.close()
    }, 500)
  }, [lessonSlug])
}