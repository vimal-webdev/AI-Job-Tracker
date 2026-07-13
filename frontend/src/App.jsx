import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Briefcase, Building2, Users2, Sparkles, Terminal } from 'lucide-react';
import DashboardView from './components/DashboardView';
import ApplicationsView from './components/ApplicationsView';
import CompaniesView from './components/CompaniesView';
import HRContactsView from './components/HRContactsView';
import AISuiteView from './components/AISuiteView';
import './App.css';

const API_BASE = "http://localhost:8080/api";

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [hrContacts, setHrContacts] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Toast Notification Manager
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Fetch initial data
  const fetchData = async () => {
    try {
      const [jobsRes, compsRes, hrRes] = await Promise.all([
        fetch(`${API_BASE}/jobs`),
        fetch(`${API_BASE}/companies`),
        fetch(`${API_BASE}/hr`)
      ]);

      if (jobsRes.ok) setApplications(await jobsRes.json());
      if (compsRes.ok) setCompanies(await compsRes.json());
      if (hrRes.ok) setHrContacts(await hrRes.json());
    } catch (err) {
      console.error(err);
      addToast("Failed to sync data with server", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 1. Company Actions
  const handleAddCompany = async (dto) => {
    try {
      const res = await fetch(`${API_BASE}/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      });
      if (res.ok) {
        addToast("Company added successfully");
        fetchData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to add company");
      }
    } catch (e) {
      addToast(e.message, "error");
    }
  };

  const handleUpdateCompany = async (id, dto) => {
    try {
      const res = await fetch(`${API_BASE}/companies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      });
      if (res.ok) {
        addToast("Company updated successfully");
        fetchData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to update company");
      }
    } catch (e) {
      addToast(e.message, "error");
    }
  };

  const handleDeleteCompany = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;
    try {
      const res = await fetch(`${API_BASE}/companies/${id}`, { method: 'DELETE' });
      if (res.ok) {
        addToast("Company deleted successfully");
        fetchData();
      } else {
        throw new Error("Failed to delete company. Ensure it is not linked to any job applications.");
      }
    } catch (e) {
      addToast(e.message, "error");
    }
  };

  // 2. HR Actions
  const handleAddHRContact = async (dto) => {
    try {
      const res = await fetch(`${API_BASE}/hr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      });
      if (res.ok) {
        addToast("HR Contact added successfully");
        fetchData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to add contact");
      }
    } catch (e) {
      addToast(e.message, "error");
    }
  };

  const handleUpdateHRContact = async (id, dto) => {
    try {
      const res = await fetch(`${API_BASE}/hr/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      });
      if (res.ok) {
        addToast("HR Contact updated successfully");
        fetchData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to update contact");
      }
    } catch (e) {
      addToast(e.message, "error");
    }
  };

  const handleDeleteHRContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this HR Contact?")) return;
    try {
      const res = await fetch(`${API_BASE}/hr/${id}`, { method: 'DELETE' });
      if (res.ok) {
        addToast("HR Contact deleted successfully");
        fetchData();
      } else {
        throw new Error("Failed to delete HR Contact");
      }
    } catch (e) {
      addToast(e.message, "error");
    }
  };

  // 3. Job Actions
  const handleAddApplication = async (dto) => {
    try {
      const res = await fetch(`${API_BASE}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      });
      if (res.ok) {
        addToast("Job application registered");
        fetchData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to save job application");
      }
    } catch (e) {
      addToast(e.message, "error");
    }
  };

  const handleUpdateApplication = async (id, dto) => {
    try {
      const res = await fetch(`${API_BASE}/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      });
      if (res.ok) {
        addToast("Job application updated");
        fetchData();
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to update job application");
      }
    } catch (e) {
      addToast(e.message, "error");
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm("Delete this job application?")) return;
    try {
      const res = await fetch(`${API_BASE}/jobs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        addToast("Job application deleted");
        fetchData();
      } else {
        throw new Error("Failed to delete application");
      }
    } catch (e) {
      addToast(e.message, "error");
    }
  };

  const handleExportExcel = async () => {
    try {
      const res = await fetch(`${API_BASE}/jobs/export`);
      if (!res.ok) throw new Error("Excel generation failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "job_applications_report.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      addToast("Excel report downloaded!", "success");
    } catch (e) {
      addToast(e.message, "error");
    }
  };

  // Render Subviews
  const renderActiveView = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardView applications={applications} setActivePage={setActivePage} />;
      case 'applications':
        return (
          <ApplicationsView
            applications={applications}
            companies={companies}
            hrContacts={hrContacts}
            onAddApplication={handleAddApplication}
            onUpdateApplication={handleUpdateApplication}
            onDeleteApplication={handleDeleteApplication}
            onExportExcel={handleExportExcel}
            addToast={addToast}
          />
        );
      case 'companies':
        return (
          <CompaniesView
            companies={companies}
            onAddCompany={handleAddCompany}
            onUpdateCompany={handleUpdateCompany}
            onDeleteCompany={handleDeleteCompany}
            addToast={addToast}
          />
        );
      case 'hr':
        return (
          <HRContactsView
            hrContacts={hrContacts}
            onAddHRContact={handleAddHRContact}
            onUpdateHRContact={handleUpdateHRContact}
            onDeleteHRContact={handleDeleteHRContact}
            addToast={addToast}
          />
        );
      case 'ai':
        return <AISuiteView addToast={addToast} />;
      default:
        return <DashboardView applications={applications} setActivePage={setActivePage} />;
    }
  };

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard': return { main: 'Dashboard', sub: 'Overview of your job hunt status' };
      case 'applications': return { main: 'Job Applications', sub: 'Track and manage your target positions' };
      case 'companies': return { main: 'Company Directory', sub: 'Manage information about prospective companies' };
      case 'hr': return { main: 'Recruiter Contacts', sub: 'Direct directory of your HR connection points' };
      case 'ai': return { main: 'AI Analytics Suite', sub: 'Automated resume analysis, JD tagging, prep queries, and email drafting' };
      default: return { main: 'Job Tracker', sub: '' };
    }
  };

  const titleInfo = getPageTitle();

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <div className="logo-container">
          <Terminal size={26} style={{ color: 'var(--color-primary)' }} />
          <span className="logo-text">AI JOB TRACKER</span>
        </div>

        <ul className="nav-links">
          <li className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => setActivePage('dashboard')}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </li>
          <li className={`nav-item ${activePage === 'applications' ? 'active' : ''}`} onClick={() => setActivePage('applications')}>
            <Briefcase size={18} />
            <span>Applications</span>
          </li>
          <li className={`nav-item ${activePage === 'companies' ? 'active' : ''}`} onClick={() => setActivePage('companies')}>
            <Building2 size={18} />
            <span>Companies</span>
          </li>
          <li className={`nav-item ${activePage === 'hr' ? 'active' : ''}`} onClick={() => setActivePage('hr')}>
            <Users2 size={18} />
            <span>HR Contacts</span>
          </li>
          <li className={`nav-item ${activePage === 'ai' ? 'active' : ''}`} onClick={() => setActivePage('ai')}>
            <Sparkles size={18} />
            <span>AI Tool Suite</span>
          </li>
        </ul>
      </nav>

      {/* Main Panel Content */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-title">
            <h1>{titleInfo.main}</h1>
            <p>{titleInfo.sub}</p>
          </div>
        </header>

        {renderActiveView()}
      </main>

      {/* Toast Notification HUD */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="toast" style={{ borderLeft: `4px solid ${toast.type === 'error' ? 'var(--color-error)' : 'var(--color-success)'}` }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
