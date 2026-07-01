'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTheme } from './ThemeProvider';
import { personalInfo } from '@/data/portfolio';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown } from 'react-icons/fi';
import styles from './HeroSection.module.css';

const Scene3D = dynamic(() => import('./3d/Scene3D'), {
  ssr: false,
  loading: () => null,
});

const roles = ['Software Engineer', 'Frontend Developer', 'UI/UX Enthusiast', 'Problem Solver'];

export default function HeroSection() {
  const { theme } = useTheme();
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const timeoutRef = useRef(null);

  /* Typing effect */
  useEffect(() => {
    const current = roles[currentRole];
    const typeSpeed = isDeleting ? 40 : 80;

    timeoutRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.substring(0, displayText.length + 1));
        if (displayText.length === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(current.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
          setLoopNum(loopNum + 1);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, currentRole, loopNum]);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={styles.hero} id="home">
      {/* 3D Background */}
      <Scene3D theme={theme} />

      {/* Gradient overlays */}
      <div className={styles.overlay} />
      <div className={styles.overlayBottom} />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.profileWrap}>
          <div className={styles.profileGlow} />
          <div className={styles.profileRing}>
            <Image
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              className={styles.profileImg}
              width={160}
              height={160}
              priority
            />
          </div>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            Open to work
          </div>
        </div>

        <div className={styles.textContent}>
          <p className={styles.greeting}>Hello, I&apos;m</p>
          <h1 className={styles.name}>
            {personalInfo.name.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? styles.nameAccent : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <div className={styles.roleWrap}>
            <span className={styles.rolePrefix}>I&apos;m a </span>
            <span className={styles.roleText}>{displayText}</span>
            <span className={styles.cursor}>|</span>
          </div>
          <p className={styles.tagline}>{personalInfo.tagline}</p>

          {/* CTA Buttons */}
          <div className={styles.ctas}>
            <a href={personalInfo.resumeUrl} className={`btn btn-primary ${styles.ctaBtn}`} download>
              <FiDownload /> Download CV
            </a>
            <a href="#contact" className={`btn btn-secondary ${styles.ctaBtn}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <FiMail /> Contact Me
            </a>
          </div>

          {/* Social Links — between CTAs and Scroll Down */}
          <div className={styles.socials}>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
              <FiGithub />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href={`mailto:${personalInfo.email}`} className={styles.socialLink} aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button className={styles.scrollDown} onClick={scrollToAbout} aria-label="Scroll down">
        <span className={styles.scrollText}>Scroll Down</span>
        <FiArrowDown className={styles.scrollIcon} />
      </button>
    </section>
  );
}
