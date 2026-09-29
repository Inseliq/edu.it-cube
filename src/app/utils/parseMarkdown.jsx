import { Fragment } from 'react'
import { Link } from 'react-router-dom'

function isInternalUrl(url) {
  return (
    url.startsWith('/') &&
    !url.startsWith('//')
  )
}

function renderSmartLink(
  url,
  label,
  key,
) {
  if (isInternalUrl(url)) {
    return (
      <Link
        key={key}
        to={url}
      >
        {label}
      </Link>
    )
  }

  return (
    <a
      key={key}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      {label}
    </a>
  )
}

function parseInline(
  text,
  keyPrefix,
) {
  const tokenPattern =
    /(\*\*[^*]+\*\*|\*[^*]+\*|!\[ссылка:\s*[^\]]+\]\(название:\s*[^)]+\))/g

  const parts =
    text
      .split(tokenPattern)
      .filter(Boolean)

  return parts.map(
    (part, index) => {
      const key =
        `${keyPrefix}-${index}`

      if (
        part.startsWith('**') &&
        part.endsWith('**')
      ) {
        return (
          <b key={key}>
            {part.slice(2, -2)}
          </b>
        )
      }

      if (
        part.startsWith('*') &&
        part.endsWith('*')
      ) {
        return (
          <i key={key}>
            {part.slice(1, -1)}
          </i>
        )
      }

      const linkMatch =
        part.match(
          /^!\[ссылка:\s*([^\]]+)\]\(название:\s*([^)]+)\)$/,
        )

      if (linkMatch) {
        return renderSmartLink(
          linkMatch[1].trim(),
          linkMatch[2].trim(),
          key,
        )
      }

      return (
        <Fragment key={key}>
          {part}
        </Fragment>
      )
    },
  )
}

function InfoIcon({ type }) {
  if (type === 'warn') {
    return (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        aria-hidden="true"
      >
        <path
          d="M12 3 2 21h20L12 3Zm0 5v6m0 3v1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    )
  }

  if (type === 'danger') {
    return (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />

        <path
          d="M12 7v7m0 3v1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M12 11v6m0-10v1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

export function parseMarkdown(
  markdown = '',
) {
  const lines =
    markdown
      .replace(/\r\n/g, '\n')
      .split('\n')

  const elements = []

  for (
    let index = 0;
    index < lines.length;
    index += 1
  ) {
    const line =
      lines[index].trim()

    if (!line) {
      continue
    }

    // ---

    if (line === '---') {
      elements.push(
        <hr key={`hr-${index}`} />,
      )

      continue
    }

    // ?[info](...)

    const infoMatch =
      line.match(
        /^\?\[(info|warn|danger)\]\((.*)\)$/,
      )

    if (infoMatch) {
      const [, type, text] =
        infoMatch

      elements.push(
        <div
          key={`info-${index}`}
          className={
            `lesson-info lesson-info--${type}`
          }
          data-type={type}
        >
          <InfoIcon type={type} />

          <p>
            {parseInline(
              text,
              `info-${index}`,
            )}
          </p>
        </div>,
      )

      continue
    }

    // Картинка

    const imageMatch =
      line.match(
        /^\[путь до картинки:\s*([^\]]+)\]\(название картинки:\s*([^)]+)\)$/,
      )

    if (imageMatch) {
      elements.push(
        <img
          key={`image-${index}`}
          src={imageMatch[1].trim().startsWith('/') ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${imageMatch[1].trim()}` : imageMatch[1].trim()}
          alt={imageMatch[2].trim()}
        />,
      )

      continue
    }

    // Список

    if (line.startsWith('>')) {
      const items = []

      let listIndex = index

      while (
        listIndex <
        lines.length
      ) {
        const listLine =
          lines[listIndex].trim()

        if (
          !listLine.startsWith('>')
        ) {
          break
        }

        items.push(
          listLine.replace(
            /^>\s*/,
            '',
          ),
        )

        listIndex += 1
      }

      elements.push(
        <ul key={`list-${index}`}>
          {items.map(
            (
              item,
              itemIndex,
            ) => (
              <li
                key={
                  `list-${index}-${itemIndex}`
                }
              >
                {parseInline(
                  item,
                  `list-${index}-${itemIndex}`,
                )}
              </li>
            ),
          )}
        </ul>,
      )

      index = listIndex - 1

      continue
    }

    // Заголовки

    const headingMatch =
      line.match(
        /^(#{1,4})\s+(.+)$/,
      )

    if (headingMatch) {
      const level =
        headingMatch[1].length

      const content =
        parseInline(
          headingMatch[2],
          `heading-${index}`,
        )

      if (level === 1) {
        elements.push(
          <h1 key={`h-${index}`}>
            {content}
          </h1>,
        )
      }

      if (level === 2) {
        elements.push(
          <h2 key={`h-${index}`}>
            {content}
          </h2>,
        )
      }

      if (level === 3) {
        elements.push(
          <h3 key={`h-${index}`}>
            {content}
          </h3>,
        )
      }

      if (level === 4) {
        elements.push(
          <h4 key={`h-${index}`}>
            {content}
          </h4>,
        )
      }

      continue
    }

    // Обычный текст

    elements.push(
      <p key={`p-${index}`}>
        {parseInline(
          line,
          `paragraph-${index}`,
        )}
      </p>,
    )
  }

  return elements
}