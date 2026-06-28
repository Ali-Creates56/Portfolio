'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      /* Default password: admin123 — change this! */
      if (password === 'admin123') {
        localStorage.setItem('portfolio-admin-auth', 'true');
        router.push('/admin/dashboard');
      } else {
        setError('Incorrect password. Try again.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div className={styles.loginIcon}>🔐</div>
          <h1 className={styles.loginTitle}>Admin Panel</h1>
          <p className={styles.loginSubtitle}>Enter password to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className={styles.input}
              id="admin-password"
              autoFocus
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Verifying...' : 'Login'}
          </button>
        </form>

        <a href="/" className={styles.backLink}>← Back to Portfolio</a>
      </div>
    </div>
  );
}
