import { Link } from 'react-router-dom'

import { diaryGroups } from '../../data/diary/groups.map'
import '../../styles/css/edu-main.css'

export default function MainPage() {
  return (
    <div className="edu-home">
      <div className="edu-home__inner">
        <section className="edu-home__intro">
          <span className="eyebrow">Educational Platform</span>
          <h1>Журнал и домашние задания</h1>
          <p>
            Выберите учебную группу, чтобы открыть журнал посещаемости и оценок,
            посмотреть темы занятий и домашние задания.
          </p>
        </section>

        <section className="edu-group-grid" aria-label="Учебные группы">
          {diaryGroups.map((group) => (
            <Link className="edu-group-card" to={`/diary/${group.id}`} key={group.id}>
              <div>
                <span className="edu-group-card__course">Курс {group.course}</span>
                <h2>{group.title}</h2>
                <p>{group.totalStudents} учеников в группе</p>
              </div>
              <span className="edu-group-card__arrow">→</span>
            </Link>
          ))}
        </section>
      </div>
    </div>
  )
}
