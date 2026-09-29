import { useState } from 'react'
import { courses } from '../../data/courses.map'

const lessonFiles = import.meta.glob(
  '../../data/course_*/*.map.js',
  { eager: true, import: 'default' },
)

export function useCoursesPage() {
  const [selectedId, setSelectedId] = useState(null)
  const selectedCourse = courses.find((course) => course.id === selectedId) ?? null

  const selectedLessons = selectedCourse
    ? selectedCourse.lessons.map((lesson) => {
        const suffix = `/course_${selectedCourse.repo}/lesson-${lesson.slug}.map.js`
        const entry = Object.entries(lessonFiles).find(([path]) => path.endsWith(suffix))
        return { ...lesson, material: entry?.[1] ?? null }
      })
    : []

  return {
    courses,
    selectedCourse,
    selectedLessons,
    selectCourse: setSelectedId,
  }
}
