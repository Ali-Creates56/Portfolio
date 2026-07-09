'use client';
import { useEffect, useRef, useState } from 'react';
import { personalInfo } from '@/data/portfolio';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheck } from 'react-icons/fi';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); /* idle | sending | sent | error */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch("https://formsubmit.co/ajax/learner12you@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(form)
      });
      
      if (response.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error("Form submission failed.");
        setStatus('idle');
        alert("Something went wrong. Please try again later.");
        return;
      }
    } catch (error) {
      console.error(error);
      setStatus('idle');
      alert("Something went wrong. Please try again later.");
      return;
    }
    setTimeout(() => setStatus('idle'), 3000);
  };

  const contactCards = [
    {
      icon: <FiMail />,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: <FiMapPin />,
      label: 'Location',
      value: personalInfo.location,
      href: null,
    },
    {
      icon: <FiGithub />,
      label: 'GitHub',
      value: 'Ali-Creates56',
      href: personalInfo.github,
    },
    {
      icon: <FiLinkedin />,
      label: 'LinkedIn',
      value: 'Muhammad Ali',
      href: personalInfo.linkedin,
    },
  ];

  return (
    <section className="section section-alt" id="contact" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${visible ? 'reveal active' : 'reveal'}`}>
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let&apos;s Work Together</h2>
          <p className="section-subtitle">Feel free to reach out for collaborations, freelance work, or just a friendly hello!</p>
        </div>

        <div className={styles.grid}>
          {/* Contact Info */}
          <div className={`${styles.infoColumn} ${visible ? 'reveal-left active' : 'reveal-left'}`}>
            <h3 className={styles.infoTitle}>Get In Touch</h3>
            <p className={styles.infoText}>
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className={styles.contactCards}>
              {contactCards.map((card, i) => (
                <div key={i} className={styles.contactCard}>
                  <div className={styles.contactIcon}>{card.icon}</div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>{card.label}</span>
                    {card.href ? (
                      <a href={card.href} target="_blank" rel="noopener noreferrer" className={styles.contactValue}>
                        {card.value}
                      </a>
                    ) : (
                      <span className={styles.contactValue}>{card.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${styles.formColumn} ${visible ? 'reveal-right active' : 'reveal-right'}`}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder=" "
                  />
                  <label htmlFor="contact-name" className={styles.label}>Your Name</label>
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder=" "
                  />
                  <label htmlFor="contact-email" className={styles.label}>Your Email</label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="subject"
                  id="contact-subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder=" "
                />
                <label htmlFor="contact-subject" className={styles.label}>Subject</label>
              </div>

              <div className={styles.formGroup}>
                <textarea
                  name="message"
                  id="contact-message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder=" "
                />
                <label htmlFor="contact-message" className={styles.label}>Your Message</label>
              </div>

              <button
                type="submit"
                className={`btn btn-primary ${styles.submitBtn} ${status === 'sent' ? styles.sent : ''}`}
                disabled={status === 'sending' || status === 'sent'}
              >
                {status === 'idle' && <><FiSend /> Send Message</>}
                {status === 'sending' && <><span className={styles.spinner} /> Sending...</>}
                {status === 'sent' && <><FiCheck /> Message Sent!</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
