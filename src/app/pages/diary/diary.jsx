import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { controlColumns, diaryGroups } from '../../data/diary/groups.map'
import { getControlGrade } from '../../data/diary/controlGrades.map'
import { journalByGroup } from '../../data/diary/journal.map'
import HomeworkContent from '../../utils/homeworkLinks'
import '../../styles/css/diary.css'

const formatDate = (date) => {
  const [day, month, year] = date.split('.').map(Number)
  return new Date(year, month - 1, day).getTime()
}

function LessonDateLink({ lesson }) {
  return lesson.lessonUrl?.trim() ? (
    <a className="diary-date-link" href={lesson.lessonUrl} target="_blank"
       rel="noopener noreferrer" title={lesson.title}>
      {lesson.date} <span className="diary-link-icon" aria-hidden="true">↗</span>
    </a>
  ) : <span className="diary-date-static" title={lesson.title}>{lesson.date}</span>
}

function Grade({ value }) {
  const normalized = value == null ? '' : String(value).trim()
  if (!normalized) return <span className="grade grade--empty" title="Оценка не выставлена">—</span>
  const styles = {
    '2': 'grade--2', '3': 'grade--3', '4': 'grade--4', '5': 'grade--5',
    'н': 'grade--n', 'п': 'grade--p', 'з/с': 'grade--cancelled',
  }
  return <span className={`grade ${styles[normalized] ?? 'grade--other'}`} title={`Оценка: ${normalized}`}>{normalized}</span>
}

export default function DiaryPage() {
  const { groupCode } = useParams()
  const group = diaryGroups.find((item) => item.id === groupCode)
  const journalRef = useRef(null)
  const controlsRef = useRef(null)
  const lessonStartRef = useRef(null)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const lessons = journalByGroup[group?.id] ?? []
  const homework = useMemo(() => [...lessons].sort((a, b) => formatDate(b.date) - formatDate(a.date)), [lessons])

  const updateScroll = () => {
    const node = journalRef.current
    if (!node) return
    const overflow = node.scrollWidth > node.clientWidth + 2
    setHasOverflow(overflow)
    setAtStart(node.scrollLeft < 4)
    setAtEnd(node.scrollLeft + node.clientWidth >= node.scrollWidth - 4)
  }

  useEffect(() => {
    const node = journalRef.current
    if (!node) return undefined
    const observer = new ResizeObserver(updateScroll)
    observer.observe(node)
    const table = node.querySelector('table')
    if (table) observer.observe(table)
    updateScroll()
    return () => observer.disconnect()
  }, [group?.id, lessons.length])

  const scrollToSection = (section) => {
    const node = journalRef.current
    if (!node) return
    // Первая колонка закреплена. Заголовок нужного раздела остаётся рядом с ФИО.
    const studentWidth = node.querySelector('.student-column')?.getBoundingClientRect().width ?? 0
    const target = section === 'controls' ? controlsRef.current : lessonStartRef.current
    if (!target) return
    const targetLeft = target.getBoundingClientRect().left - node.getBoundingClientRect().left + node.scrollLeft
    node.scrollTo({ left: Math.max(0, targetLeft - studentWidth - 2), behavior: 'smooth' })
  }

  if (!group) return <Navigate to="/404" replace />

  return (
    <div className="diary-page page-shell">
      <div className="diary-heading">
        <div className='diary-heading_flex'>
          <Link className="diary-back" to="/diary">← Все группы</Link>
          <p className="eyebrow">{group.course} курс · Электронный журнал</p>
          <h1>{group.title}</h1>
          <p>Оценки, посещаемость и домашние задания в одном месте.</p>
        </div>
        <div className="diary-meta" aria-label="О группе">
          <span>{group.students.length} учащихся</span>
          <span>{lessons.length} занятий</span>
          <span>2026–2027</span>
        </div>
      </div>

      <section className="diary-section" aria-labelledby="grades-title">
        <div className="diary-section__title">
          <div><span className="eyebrow">Успеваемость</span><h2 id="grades-title">Журнал оценок</h2></div>
          <div className="grade-legend" aria-label="Обозначения оценок">
            <span><b>2–5</b> оценка</span>
            <span><b>н</b> уважительная причина</span>
            <span><b>п</b> пропуск</span>
            <span><b>з/с</b> занятие снято</span>
          </div>
        </div>

        <div className="diary-table-tools">
          <p className="diary-table-hint">{hasOverflow ? 'Листайте таблицу влево и вправо. ФИО закреплены.' : 'Контрольные точки и оценки за занятия'}</p>
          {hasOverflow && <div className="diary-table-jumps" aria-label="Быстрый переход по журналу">
            <button type="button" onClick={() => scrollToSection('controls')}>А1 – Итог</button>
            <button type="button" onClick={() => scrollToSection('lessons')}>Занятия →</button>
          </div>}
        </div>

        <div className={`diary-table-frame${hasOverflow && !atEnd ? ' diary-table-frame--more' : ''}${hasOverflow && !atStart ? ' diary-table-frame--back' : ''}`}>
          <div className="diary-table-wrap" ref={journalRef} onScroll={updateScroll} aria-label={`Журнал группы ${group.id}`} role="region" tabIndex={0}>
            <table className="diary-table">
              <thead>
                <tr>
                  <th className="student-column" rowSpan="2" scope="col">Ученик</th>
                  <th className="diary-group-heading" colSpan={controlColumns.length} ref={controlsRef} scope="colgroup">Контрольные точки</th>
                  {lessons.length > 0 && <th className="diary-group-heading diary-group-heading--lessons" colSpan={lessons.length} scope="colgroup">Занятия</th>}
                </tr>
                <tr>
                  {controlColumns.map((column, index) => <th key={column} className={`diary-control-column${index === controlColumns.length - 1 ? ' diary-control-column--final' : ''}`} scope="col" title={column === 'Итог' ? 'Итоговая оценка' : `Контрольная точка ${column}`}>{column}</th>)}
                  {lessons.map((lesson, index) => <th className="lesson-column" key={lesson.id} ref={index === 0 ? lessonStartRef : undefined} scope="col"><LessonDateLink lesson={lesson} /></th>)}
                </tr>
              </thead>
              <tbody>
                {group.students.map((student) => <tr key={student.id}>
                  <th className="student-column" scope="row" title={student.name}>{student.name}</th>
                  {controlColumns.map((column, index) => <td className={`diary-control-column${index === controlColumns.length - 1 ? ' diary-control-column--final' : ''}`} key={`${student.id}-${column}`}><Grade value={getControlGrade(group.id, student.id, column)} /></td>)}
                  {lessons.map((lesson) => <td key={`${student.id}-${lesson.id}`}><Grade value={lesson.grades?.[student.id]} /></td>)}
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="diary-section homework-section" aria-labelledby="homework-title">
        <div className="diary-section__title">
          <div><span className="eyebrow">Домашняя работа</span><h2 id="homework-title">Задания по датам</h2></div>
          <span className="homework-section__count">Новые сверху</span>
        </div>
        <div className="homework-list">
          {homework.map((lesson) => <article className="homework-card" key={lesson.id}>
            <div className="homework-card__date"><LessonDateLink lesson={lesson} /></div>
            <div className="homework-card__body">
              <h3>{lesson.title}</h3>
              {lesson.homework ? <p><HomeworkContent text={lesson.homework} /></p> : <p className="homework-card__empty">Домашнее задание не задано</p>}
              {lesson.homeworkUrl && <a className="homework-card__link" href={lesson.homeworkUrl} target="_blank" rel="noopener noreferrer">Материалы задания ↗</a>}
            </div>
          </article>)}
        </div>
      </section>
    </div>
  )
}
