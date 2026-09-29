import {
  useErrorPage,
} from './error.fun'

export default function ErrorPage() {
  const {
    goBack,
    goHome,
  } = useErrorPage()

  return (
    <main>

      <h1>
        Страница не найдена
      </h1>

      <p>
        Такой страницы не существует.
      </p>

      <div>

        <button
          type="button"
          onClick={goBack}
        >
          Назад
        </button>

        <button
          type="button"
          onClick={goHome}
        >
          На главную
        </button>

      </div>

    </main>
  )
}