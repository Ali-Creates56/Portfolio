'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { defaultProjects } from '@/data/portfolio';
import { FiPlus, FiEdit2, FiTrash2, FiArrowLeft, FiLogOut } from 'react-icons/fi';
import styles from '../admin.module.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    techStack: '',
    liveUrl: '',
    githubUrl: '',
  });

  useEffect(() => {
    /* Check auth */
    const auth = localStorage.getItem('portfolio-admin-auth');
    if (auth !== 'true') {
      router.push('/admin');
      return;
    }

    /* Load projects */
    try {
      const stored = localStorage.getItem('portfolio-projects');
      if (stored) {
        setProjects(JSON.parse(stored));
      } else {
        setProjects(defaultProjects);
        localStorage.setItem('portfolio-projects', JSON.stringify(defaultProjects));
      }
    } catch {
      setProjects(defaultProjects);
    }
  }, [router]);

  const saveProjects = (updated) => {
    setProjects(updated);
    localStorage.setItem('portfolio-projects', JSON.stringify(updated));
  };

  const openAddModal = () => {
    setEditingProject(null);
    setForm({ title: '', description: '', techStack: '', liveUrl: '', githubUrl: '' });
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
    });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const projectData = {
      id: editingProject ? editingProject.id : Date.now().toString(),
      title: form.title,
      description: form.description,
      techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean),
      liveUrl: form.liveUrl,
      githubUrl: form.githubUrl,
      featured: true,
    };

    if (editingProject) {
      const updated = projects.map((p) => (p.id === editingProject.id ? projectData : p));
      saveProjects(updated);
    } else {
      saveProjects([...projects, projectData]);
    }

    setShowModal(false);
    setEditingProject(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter((p) => p.id !== id);
      saveProjects(updated);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio-admin-auth');
    router.push('/admin');
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashContainer}>
        {/* Header */}
        <div className={styles.dashHeader}>
          <h1 className={styles.dashTitle}>📋 Manage Projects</h1>
          <div className={styles.dashActions}>
            <button className={`${styles.dashBtn} ${styles.btnAdd}`} onClick={openAddModal}>
              <FiPlus /> Add Project
            </button>
            <a href="/" className={`${styles.dashBtn} ${styles.btnBack}`}>
              <FiArrowLeft /> Portfolio
            </a>
            <button className={`${styles.dashBtn} ${styles.btnLogout}`} onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className={styles.projectsList}>
          {projects.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No projects yet. Click &quot;Add Project&quot; to get started!</p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className={styles.projectItem}>
                <div className={styles.projectInfo}>
                  <h3>{project.title}</h3>
                  <p>{project.description.substring(0, 100)}...</p>
                  <div className={styles.projectTags}>
                    {project.techStack.map((tech) => (
                      <span key={tech} className={styles.projectTag}>{tech}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.projectActions}>
                  <button className={styles.actionBtn} onClick={() => openEditModal(project)} aria-label="Edit">
                    <FiEdit2 />
                  </button>
                  <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(project.id)} aria-label="Delete">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleSave} className={styles.modalForm}>
              <div>
                <label className={styles.modalLabel} htmlFor="proj-title">Project Name *</label>
                <input
                  id="proj-title"
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className={styles.modalInput}
                  placeholder="e.g. My Awesome Project"
                />
              </div>
              <div>
                <label className={styles.modalLabel} htmlFor="proj-desc">Description *</label>
                <textarea
                  id="proj-desc"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  className={`${styles.modalInput} ${styles.modalTextarea}`}
                  placeholder="Brief description of the project..."
                />
              </div>
              <div>
                <label className={styles.modalLabel} htmlFor="proj-tech">Tech Stack (comma-separated) *</label>
                <input
                  id="proj-tech"
                  type="text"
                  value={form.techStack}
                  onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                  required
                  className={styles.modalInput}
                  placeholder="e.g. HTML, CSS, JavaScript, React"
                />
              </div>
              <div>
                <label className={styles.modalLabel} htmlFor="proj-live">Live Demo URL (optional)</label>
                <input
                  id="proj-live"
                  type="url"
                  value={form.liveUrl}
                  onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                  className={styles.modalInput}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className={styles.modalLabel} htmlFor="proj-github">GitHub URL (optional)</label>
                <input
                  id="proj-github"
                  type="url"
                  value={form.githubUrl}
                  onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                  className={styles.modalInput}
                  placeholder="https://github.com/..."
                />
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  {editingProject ? 'Save Changes' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
