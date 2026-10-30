import { Link } from 'react-router-dom'

// Поддерживаем стандартные Markdown-ссылки, старый формат сайта и простые URL.
const LINK_PATTERN = /!\[ссылка:\s*([^\]]+)\]\(название:\s*([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|https?:\/\/[^\s<>]+/g

function validUrl(raw) {
  const url = raw.trim()
  if (url.startsWith('/') && !url.startsWith('//')) return url
  try {
    const parsed = new URL(url)
    return ['https:', 'http:'].includes(parsed.protocol) ? url : null
  } catch {
    return null
  }
}

function SmartLink({ url, children }) {
  if (url.startsWith('/') && !url.startsWith('//')) return <Link to={url}>{children}</Link>
  return <a href={url} target="_blank" rel="noopener noreferrer">{children}</a>
}

export default function HomeworkContent({ text }) {
  const result = []
  const source = String(text ?? '')
  let lastIndex = 0
  let count = 0

  for (const match of source.matchAll(LINK_PATTERN)) {
    if (match.index > lastIndex) result.push(source.slice(lastIndex, match.index))
    const raw = match[1] ?? match[4] ?? match[0]
    const label = match[2] ?? match[3] ?? match[0]
    // Точка или запятая после голой ссылки не должна попадать внутрь href.
    const auto = !match[1] && !match[4]
    const clean = auto ? raw.replace(/[.,;!?]+$/, '') : raw
    const punctuation = auto ? raw.slice(clean.length) : ''
    const url = validUrl(clean)
    result.push(url ? <SmartLink key={count++} url={url}>{auto ? clean : label}</SmartLink> : match[0])
    if (punctuation) result.push(punctuation)
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < source.length) result.push(source.slice(lastIndex))
  return <>{result}</>
}
