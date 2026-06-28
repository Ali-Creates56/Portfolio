'use client';
import { useEffect, useRef, useState } from 'react';
import { skills } from '@/data/portfolio';
import { FiCode, FiCpu, FiTool, FiLayers } from 'react-icons/fi';
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiBootstrap, SiCplusplus, SiGit
} from 'react-icons/si';
import { TbApi, TbMap, TbBinaryTree, TbPackages } from 'react-icons/tb';
import styles from './SkillsSection.module.css';

const iconMap = {
  html: <SiHtml5 />,
  css: <SiCss />,
  js: <SiJavascript />,
  react: <SiReact />,
  bootstrap: <SiBootstrap />,
  cpp: <SiCplusplus />,
  dsa: <TbBinaryTree />,
  oop: <TbPackages />,
  api: <TbApi />,
  map: <TbMap />,
  git: <SiGit />,
};

const categoryInfo = {
  frontend: { label: 'Frontend', icon: <FiCode /> },
  language: { label: 'Languages', icon: <FiCpu /> },
  cs: { label: 'CS Fundamentals', icon: <FiLayers /> },
  tools: { label: 'Tools & APIs', icon: <FiTool /> },
};

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    cardEl.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = (cardEl) => {
    if (!cardEl) return;
    cardEl.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  const categories = Object.keys(categoryInfo);

  return (
    <section className="section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${visible ? 'reveal active' : 'reveal'}`}>
          <span className="section-label">Skills</span>
          <h2 className="section-title">Technologies I Work With</h2>
          <p className="section-subtitle">Constantly learning and expanding my technical toolkit</p>
        </div>

        {categories.map((cat, catIndex) => {
          const catSkills = skills.filter((s) => s.category === cat);
          if (catSkills.length === 0) return null;
          return (
            <div key={cat} className={`${styles.category} ${visible ? 'reveal active' : 'reveal'}`}
              style={{ transitionDelay: `${catIndex * 0.15}s` }}>
              <div className={styles.catHeader}>
                <span className={styles.catIcon}>{categoryInfo[cat].icon}</span>
                <h3 className={styles.catTitle}>{categoryInfo[cat].label}</h3>
              </div>
              <div className={styles.skillsGrid}>
                {catSkills.map((skill, i) => (
                  <div
                    key={skill.name}
                    className={styles.skillCard}
                    onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    onMouseEnter={() => setHoveredIndex(`${cat}-${i}`)}
                    style={{ animationDelay: `${(catIndex * 4 + i) * 0.08}s` }}
                  >
                    <div className={styles.skillIcon}>
                      {iconMap[skill.icon] || <FiCode />}
                    </div>
                    <span className={styles.skillName}>{skill.name}</span>
                    <div className={styles.progressWrap}>
                      <div
                        className={styles.progressBar}
                        style={{
                          width: visible ? `${skill.level}%` : '0%',
                          transitionDelay: `${(catIndex * 4 + i) * 0.1 + 0.5}s`
                        }}
                      />
                    </div>
                    <span className={styles.skillLevel}>{skill.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
