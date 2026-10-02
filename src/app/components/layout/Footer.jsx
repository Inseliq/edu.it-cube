export default function Footer() {
  const handleEmptyLink = (event) => event.preventDefault()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__copyright">2026 г. © Educational Platform / IT-Cube.</p>
        <a className="site-footer__docs" href="" onClick={handleEmptyLink}>Документация</a>
        <p className="site-footer__rights">Все права защищены</p>
      </div>
    </footer>
  )
}
