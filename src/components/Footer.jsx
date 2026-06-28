'use client';
import { personalInfo } from '@/data/portfolio';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiHeart } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          {/* Logo */}
          <div className={styles.brand}>
            <span className={styles.logoIcon}>M</span>
            <span className={styles.logoText}>{personalInfo.name}</span>
          </div>

          {/* Social */}
          <div className={styles.socials}>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="GitHub">
              <FiGithub />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href={`mailto:${personalInfo.email}`} className={styles.social} aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} {personalInfo.name}. Built with{' '}
            <FiHeart className={styles.heart} /> and passion
          </p>

          <button className={styles.backToTop} onClick={scrollToTop} aria-label="Back to top">
            <FiArrowUp />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
