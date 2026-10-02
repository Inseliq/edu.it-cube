import { NavLink } from 'react-router-dom'
import { headerLinks } from '../../data/header-link.map'

const baseUrl = import.meta.env.BASE_URL

export default function Header() { return <header className="site-header"><div className="site-header__inner"><NavLink to="https://inseliq.github.io/it-cube/" className="brand" aria-label="IT-Куб Пенза"><img src={`${baseUrl}icons/logo_edu.svg`} alt="IT-Куб Пенза"/></NavLink><nav className="site-nav">{headerLinks.map(link=><NavLink key={link.id} to={link.path} end={link.path === '/'} className={({isActive})=>isActive?'site-nav__link site-nav__link--active':'site-nav__link'}>{link.title}</NavLink>)}</nav><div className="header-badge">2026</div></div></header>}
