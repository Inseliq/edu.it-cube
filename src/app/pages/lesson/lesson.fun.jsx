import { useParams } from 'react-router-dom'

import { courses } from '../../data/courses.map'

const lessonFiles = import.meta.glob(
  '../../data/course_*/*.map.js',
  {
    eager: true,
    import: 'default',
  },
)

const presentationFiles = import.meta.glob(
  '../../assets/uploads/repo*/*.pptx',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
)

export function useLessonPage() {
  const { lessonSlug } = useParams()

  let foundCourse = null
  let foundLesson = null

  for (const course of courses) {
    const lesson = course.lessons.find(
      (item) => item.slug === lessonSlug,
    )

    if (lesson) {
      foundCourse = course
      foundLesson = lesson
      break
    }
  }

  if (!foundCourse || !foundLesson) {
    return {
      exists: false,
      course: null,
      lessonInfo: null,
      lesson: null,
      presentationUrl: null,
      presentationName: null,
    }
  }

  const lessonSuffix =
    `/course_${foundCourse.repo}/lesson-${lessonSlug}.map.js`

  const lessonEntry = Object.entries(
    lessonFiles,
  ).find(([path]) =>
    path.endsWith(lessonSuffix),
  )

  if (!lessonEntry) {
    console.error(
      `Файл урока не найден: ${lessonSuffix}`,
    )

    console.log(
      'Доступные уроки:',
      Object.keys(lessonFiles),
    )

    return {
      exists: false,
      course: foundCourse,
      lessonInfo: foundLesson,
      lesson: null,
      presentationUrl: null,
      presentationName: null,
    }
  }

  const [, lesson] = lessonEntry

  const presentationName =
    `${lessonSlug}.pptx`

  const presentationSuffix =
    `/repo${foundCourse.repo}/${presentationName}`

  const presentationEntry =
    Object.entries(
      presentationFiles,
    ).find(([path]) =>
      path.endsWith(
        presentationSuffix,
      ),
    )

  return {
    exists: true,
    course: foundCourse,
    lessonInfo: foundLesson,
    lesson,

    presentationUrl:
      presentationEntry?.[1] ?? null,

    presentationName,
  }
}