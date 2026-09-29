import { Link } from 'react-router-dom'
import { useCoursesPage } from './courses.fun'
import '../../styles/css/courses.css'

export default function CoursesPage() {
  const { courses, selectedCourse, selectedLessons, selectCourse } = useCoursesPage()

  return (
    <div className="page-shell courses-page">
      <span className="eyebrow">Программа обучения</span>
      <h1 className="page-title">Курсы</h1>
      <p className="page-lead">Выберите группу, чтобы посмотреть соответствующую программу и материалы курса.</p>

      <section className="course-picker">
        {courses.map((course) => (
          <button
            type="button"
            key={course.id}
            className={`course-card card course-card--${course.accent} ${selectedCourse?.id === course.id ? 'course-card--selected' : ''}`}
            onClick={() => selectCourse(course.id)}
          >
            <span className="course-card__level">{course.level}</span>
            <strong>{course.code}</strong>
            <h2>{course.description}</h2>
            <span className="course-card__repo">repo{course.repo} · {course.lessons.length} доступных урока</span>
            <span className="course-card__arrow">→</span>
          </button>
        ))}
      </section>

      {selectedCourse && (
        <section className="course-content card">
          <div className="course-content__head">
            <div>
              <span className="eyebrow">Загружен репозиторий repo{selectedCourse.repo}</span>
              <h2>{selectedCourse.code}</h2>
            </div>
            <span className="course-content__count">{selectedLessons.length} урока</span>
          </div>

          <div className="lesson-list">
            {selectedLessons.map((lesson, index) => (
              <article className="lesson-row" key={lesson.id}>
                <span className="lesson-row__number">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                </div>
                <Link className="btn" to={lesson.path}>Открыть →</Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
