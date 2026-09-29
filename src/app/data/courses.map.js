export const courses = [
  {
    id: 1,
    code: '1WEB-26',
    title: '1WEB-26',
    repo: 1,
    level: '1 курс',
    description: 'Первый год обучения: web-дизайн, HTML, CSS и JavaScript.',
    accent: 'blue',
    lessons: [
      { id: 1, title: 'Дизайн', slug: 'design', path: '/lesson/design', description: 'Форматы файлов, Photoshop, изображения для web и основы визуального оформления.', reference: '' },
      { id: 2, title: 'HTML', slug: 'html', path: '/lesson/html', description: 'Основы HTML и создание структуры web-страницы.', reference: '' },
    ],
  },
  {
    id: 2,
    code: '2WEB-25',
    title: '2WEB-25',
    repo: 2,
    level: '2 курс',
    description: 'Второй год обучения: PHP, базы данных, SQL и системы управления контентом.',
    accent: 'violet',
    lessons: [
      { id: 1, title: 'Клиент-сервер', slug: 'server', path: '/lesson/server', description: 'Технология клиент-сервер и первые шаги в серверной разработке.', reference: '' },
    ],
  },
]
