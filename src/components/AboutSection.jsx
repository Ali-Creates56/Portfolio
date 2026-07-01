'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { personalInfo, achievements } from '@/data/portfolio';
import { FiAward, FiCode, FiBookOpen, FiTarget } from 'react-icons/fi';
import styles from './AboutSection.module.css';

const stats = [
  { icon: <FiCode />, value: '5+', label: 'Projects' },
  { icon: <FiTarget />, value: '8+', label: 'Technologies' },
  { icon: <FiAward />, value: '1st', label: 'SRE Position' },
  { icon: <FiBookOpen />, value: '3.33', label: 'CGPA' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section section-alt`} id="about" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${visible ? 'reveal active' : 'reveal'}`}>
          <span className="section-label">About Me</span>
          <h2 className="section-title">Passionate About Building The Web</h2>
          <p className="section-subtitle">Get to know more about me, my background, and what drives me</p>
        </div>

        <div className={styles.grid}>
          {/* Bio Column */}
          <div className={`${styles.bioColumn} ${visible ? 'reveal-left active' : 'reveal-left'}`}>
            <div className={styles.bioCard}>
              <div className={styles.bioImgWrap}>
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className={styles.bioImg}
                  width={300}
                  height={300}
                />
                <div className={styles.bioImgDecor} />
              </div>
            </div>
          </div>

          {/* Info Column */}
          <div className={`${styles.infoColumn} ${visible ? 'reveal-right active' : 'reveal-right'}`}>
            <p className={styles.bioText}>{personalInfo.bio}</p>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Name</span>
                <span className={styles.detailValue}>{personalInfo.name}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Email</span>
                <span className={styles.detailValue}>{personalInfo.email}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>{personalInfo.location}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Languages</span>
                <span className={styles.detailValue}>Urdu (Native), English (Professional)</span>
              </div>
            </div>

            {/* Stats */}
            <div className={styles.stats}>
              {stats.map((stat, i) => (
                <div key={i} className={styles.statCard} style={{ animationDelay: `${i * 0.15}s` }}>
                  <span className={styles.statIcon}>{stat.icon}</span>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className={`${styles.achievements} ${visible ? 'reveal active' : 'reveal'}`} style={{ transitionDelay: '0.4s' }}>
          <h3 className={styles.achieveTitle}>Achievements & Certifications</h3>
          <div className={styles.achieveGrid}>
            {achievements.map((a, i) => (
              <div key={i} className={styles.achieveCard} style={{ animationDelay: `${i * 0.15}s` }}>
                <div className={styles.achieveIcon}><FiAward /></div>
                <h4 className={styles.achieveName}>{a.title}</h4>
                <p className={styles.achieveDesc}>{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
