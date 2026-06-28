'use client';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { navLinks } from '@/data/portfolio';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      /* Determine active section */
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} id="navbar">
      <div className={styles.container}>
        {/* Logo */}
        <a href="#home" className={styles.logo} onClick={(e) => handleNavClick(e, '#home')}>
          <span className={styles.logoIcon}>M</span>
          <span className={styles.logoText}>Muhammad Ali</span>
        </a>

        {/* Desktop Links */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${styles.navLink} ${activeSection === link.href.replace('#', '') ? styles.active : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            id="theme-toggle"
          >
            <div className={styles.toggleIconWrap}>
              {theme === 'dark' ? (
                <HiOutlineSun className={styles.toggleIcon} />
              ) : (
                <HiOutlineMoon className={styles.toggleIcon} />
              )}
            </div>
          </button>

          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ''}`}>
          <ul className={styles.mobileLinks}>
            {navLinks.map((link, i) => (
              <li key={link.href} style={{ animationDelay: `${i * 0.08}s` }}>
                <a
                  href={link.href}
                  className={`${styles.mobileLink} ${activeSection === link.href.replace('#', '') ? styles.active : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
