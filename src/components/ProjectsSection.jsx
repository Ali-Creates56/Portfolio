'use client';
import { useEffect, useRef, useState } from 'react';
import { defaultProjects } from '@/data/portfolio';
import { FiExternalLink, FiGithub, FiFolder } from 'react-icons/fi';
import styles from './ProjectsSection.module.css';

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    /* Check localStorage for admin-added projects */
    try {
      const stored = localStorage.getItem('portfolio-projects');
      if (stored) {
        const parsed = JSON.parse(stored);
        setProjects(parsed);
      }
    } catch { /* use defaults */ }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section section-alt" id="projects" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${visible ? 'reveal active' : 'reveal'}`}>
          <span className="section-label">Projects</span>
          <h2 className="section-title">Featured Works</h2>
          <p className="section-subtitle">A showcase of my recent web development projects</p>
        </div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`${styles.card} ${visible ? 'reveal active' : 'reveal'}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Card Top Decoration */}
              <div className={styles.cardTop}>
                <div className={styles.folderIcon}><FiFolder /></div>
                <div className={styles.cardLinks}>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className={styles.cardLink} aria-label="GitHub">
                      <FiGithub />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className={styles.cardLink} aria-label="Live Demo">
                      <FiExternalLink />
                    </a>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDesc}>{project.description}</p>

              {/* Tech Stack Tags */}
              <div className={styles.tags}>
                {project.techStack.map((tech) => (
                  <span key={tech} className={styles.tag}>{tech}</span>
                ))}
              </div>

              {/* Hover glow */}
              <div className={styles.cardGlow} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
