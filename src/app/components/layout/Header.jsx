import { NavLink } from 'react-router-dom'
import { headerLinks } from '../../data/header-link.map'

const baseUrl = import.meta.env.BASE_URL

export default function Header() {
  return <header className="site-header">
    <div className="site-header__inner">
      <a href="https://inseliq.github.io/it-cube/" className="brand" aria-label="IT-Куб – основной сайт">
        <img src={`${baseUrl}icons/logo_edu.svg`} alt="IT-Куб" />
      </a>
      <nav className="site-nav" aria-label="Основная навигация">
        {headerLinks.map((link) => /^https?:\/\//.test(link.path)
          ? <a key={link.id} className="site-nav__link" href={link.path}>{link.title}</a>
          : <NavLink key={link.id} to={link.path} end={link.path === '/'} className={({isActive}) => `site-nav__link${isActive ? ' site-nav__link--active' : ''}`}>{link.title}</NavLink>)}
      </nav>
      <span className="header-badge">Учебный год 26/27</span>
    </div>
  </header>
}
