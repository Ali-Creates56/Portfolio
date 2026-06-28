'use client';
import { useEffect, useRef, useState } from 'react';
import { education } from '@/data/portfolio';
import { FiBookOpen } from 'react-icons/fi';
import styles from './EducationSection.module.css';

export default function EducationSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="education" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${visible ? 'reveal active' : 'reveal'}`}>
          <span className="section-label">Education</span>
          <h2 className="section-title">Academic Journey</h2>
          <p className="section-subtitle">My educational background and qualifications</p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineLine}>
            <div
              className={styles.timelineProgress}
              style={{ height: visible ? '100%' : '0%' }}
            />
          </div>

          {education.map((edu, i) => (
            <div
              key={i}
              className={`${styles.timelineItem} ${i % 2 === 0 ? styles.left : styles.right} ${visible ? 'reveal active' : 'reveal'}`}
              style={{ transitionDelay: `${i * 0.25}s` }}
            >
              <div className={styles.timelineDot}>
                <FiBookOpen />
              </div>

              <div className={styles.timelineCard}>
                <span className={styles.period}>{edu.period}</span>
                <h3 className={styles.degree}>{edu.degree}</h3>
                <h4 className={styles.institution}>{edu.institution}</h4>
                {edu.cgpa && (
                  <span className={styles.cgpa}>CGPA: {edu.cgpa}</span>
                )}
                <p className={styles.description}>{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
