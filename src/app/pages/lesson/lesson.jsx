import { Navigate, Link } from 'react-router-dom'
import LessonAttachments from '../../components/lesson/LessonAttachments'
import { parseMarkdown } from '../../utils/parseMarkdown'
import { useLessonPage } from './lesson.fun'
import '../../styles/css/lesson.css'
export default function LessonPage(){const {exists,course,lessonInfo,lesson,presentationUrl,presentationName}=useLessonPage();if(!exists)return <Navigate to="/404" replace/>;return <div className="page-shell lesson-page"><Link className="lesson-back" to="/courses">← Все курсы</Link><header className="lesson-hero card"><div><span className="eyebrow">{course.code} · {course.level}</span><h1>{lesson.title}</h1><p>{lesson.description}</p></div><div className="lesson-hero__badge">repo{course.repo}</div></header><LessonAttachments lessonSlug={lessonInfo.slug} presentationUrl={presentationUrl} presentationName={presentationName} referenceUrl={lessonInfo.reference}/><article className="lesson-content card">{parseMarkdown(lesson.content)}</article><LessonAttachments lessonSlug={lessonInfo.slug} presentationUrl={presentationUrl} presentationName={presentationName} referenceUrl={lessonInfo.reference}/></div>}
