import { Link, Navigate, useParams } from 'react-router-dom'

import { controlColumns, diaryGroups } from '../../data/diary/groups.map'
import { journalByGroup } from '../../data/diary/journal.map'
import '../../styles/css/diary.css'

function LessonDateLink({ lesson }) {
  const handleEmptyLink = (event) => {
    if (!lesson.lessonUrl) event.preventDefault()
  };

  return (
    <a
      className="diary-date-link"
      href={lesson.lessonUrl}
      onClick={handleEmptyLink}
      title={lesson.title}
      aria-label={`${lesson.date}: ${lesson.title}`}
    >
      {lesson.date}
    </a>
  )
}

function Grade({ value }) {
  if (!value) return <span className="grade grade--empty">—</span>

  const className = `grade grade--${String(value).replace('/', '-')}`
  return <span className={className}>{value}</span>
}

export default function DiaryPage() {
  const { groupCode } = useParams()
  const group = diaryGroups.find((item) => item.id === groupCode)

  if (!group) return <Navigate to="/404" replace />

  const parseDate = (date) => {
    const [day, month, year] = date.split('.');
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const lessons = journalByGroup[group.id] ?? []

  return (
    <div className="diary-page page-shell">
      <div className="diary-heading">
        <div>
          <Link className="diary-back" to="/diary">↶ Все группы</Link>
          <span className="eyebrow">Курс {group.course}</span>
          <h1>{group.title}</h1>
        </div>
        <div className="diary-meta">
          <span>{lessons.length} занятия</span>
          <span>2026 - 2027</span>
          <span className={group.messenger}>{group.messenger}</span>
        </div>
      </div>

      <section className="diary-section">
        <div className="diary-section__title">
          <div>
            <span className="eyebrow">Журнал</span>
            <h2>Оценки и посещаемость</h2>
          </div>
          <div className="grade-legend" aria-label="Обозначения">
            <span><b>2–5</b> оценка</span>
            <span><b>н</b> отсутствовал уважительно</span>
            <span><b>п</b> отсутствовал неуважительно</span>
            <span><b>з/с</b> занятия сняты</span>
          </div>
        </div>

        <div className="diary-table-wrap">
          <table className="diary-table">
            <thead>
              <tr>
                <th className="student-column" rowSpan="2">ФИО</th>
                <th colSpan={controlColumns.length}>Контрольные точки</th>
                <th colSpan={lessons.length}>Занятия</th>
              </tr>
              <tr>
                {controlColumns.map((column) => <th key={column}>{column}</th>)}
                {lessons.map((lesson) => (
                  <th className="lesson-column" key={lesson.id}>
                    <LessonDateLink lesson={lesson} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {group.students.map((student) => (
                <tr key={student.id}>
                  <th className="student-column" scope="row">{student.name}</th>
                  {controlColumns.map((column) => (
                    <td key={`${student.id}-${column}`}><Grade value="" /></td>
                  ))}
                  {lessons.map((lesson) => (
                    <td key={`${student.id}-${lesson.id}`}>
                      <Grade value={lesson.grades?.[student.id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="diary-section homework-section">
        <div className="diary-section__title">
          <div>
            <span className="eyebrow">Домашняя работа</span>
            <h2>Задания по датам</h2>
          </div>
        </div>

        <div className="homework-list">
          {[...lessons]
            .sort((a, b) => parseDate(b.date) - parseDate(a.date))
            .map((lesson) => (
              <article className="homework-card" key={lesson.id}>
                <div className="homework-card__date">
                  <LessonDateLink lesson={lesson} />
                </div>

                <div className="homework-card__body">
                  <h3>{lesson.title}</h3>

                  <p className={lesson.homework ? '' : 'homework-card__empty'}>
                    {lesson.homework || 'Домашнего задания нет'}
                  </p>
                </div>
              </article>
            ))}
        </div>
      </section>
    </div>
  )
}
