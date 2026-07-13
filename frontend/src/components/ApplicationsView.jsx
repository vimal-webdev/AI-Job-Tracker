import React, { useState } from 'react';
import { Edit2, Plus, Trash2, Download, List, Kanban, Eye, Calendar, DollarSign, MapPin, ExternalLink } from 'lucide-react';

const STATUS_COLUMNS = [
  'Applied',
  'Resume Viewed',
  'Shortlisted',
  'Technical Round',
  'HR Round',
  'Manager Round',
  'Offer Received',
  'Rejected',
  'Joined'
];

export default function ApplicationsView({
  applications,
  companies,
  hrContacts,
  onAddApplication,
  onUpdateApplication,
  onDeleteApplication,
  onExportExcel,
  addToast
}) {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [editingApp, setEditingApp] = useState(null);

  const [formData, setFormData] = useState({
    jobId: '',
    role: '',
    companyId: '',
    hrContactId: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    resumeVersion: '',
    jobDescription: '',
    salary: '',
    location: '',
    jobPortal: '',
    notes: ''
  });

  const getStatusClass = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('offer')) return 'badge-offer';
    if (s.includes('reject')) return 'badge-rejected';
    if (s.includes('shortlist')) return 'badge-shortlisted';
    if (s.includes('viewed')) return 'badge-viewed';
    if (s.includes('round')) return 'badge-round';
    if (s.includes('join')) return 'badge-joined';
    return 'badge-applied';
  };

  const openAddModal = () => {
    setEditingApp(null);
    setFormData({
      jobId: '',
      role: '',
      companyId: companies.length > 0 ? companies[0].id.toString() : '',
      hrContactId: '',
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      resumeVersion: '',
      jobDescription: '',
      salary: '',
      location: 'Remote',
      jobPortal: 'LinkedIn',
      notes: ''
    });
    setShowFormModal(true);
  };

  const openEditModal = (app, e) => {
    if (e) e.stopPropagation();
    setEditingApp(app);
    setFormData({
      jobId: app.jobId || '',
      role: app.role || '',
      companyId: app.company?.id ? app.company.id.toString() : '',
      hrContactId: app.hrContact?.id ? app.hrContact.id.toString() : '',
      status: app.status || 'Applied',
      appliedDate: app.appliedDate || '',
      resumeVersion: app.resumeVersion || '',
      jobDescription: app.jobDescription || '',
      salary: app.salary || '',
      location: app.location || '',
      jobPortal: app.jobPortal || '',
      notes: app.notes || ''
    });
    setShowFormModal(true);
  };

  const openDetailModal = (app) => {
    setSelectedApp(app);
    setShowDetailModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role.trim()) {
      addToast('Job Role is required', 'error');
      return;
    }
    if (!formData.companyId) {
      addToast('Please select a Company', 'error');
      return;
    }

    const payload = {
      ...formData,
      companyId: parseInt(formData.companyId, 10),
      hrContactId: formData.hrContactId ? parseInt(formData.hrContactId, 10) : null
    };

    if (editingApp) {
      onUpdateApplication(editingApp.id, payload);
    } else {
      onAddApplication(payload);
    }
    setShowFormModal(false);
  };

  // Filter logic
  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company?.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus ? app.status === filterStatus : true;
    const matchesCompany = filterCompany ? app.company?.id.toString() === filterCompany : true;

    return matchesSearch && matchesStatus && matchesCompany;
  });

  return (
    <div>
      {/* Control Bar */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-primary)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', backgroundColor: viewMode === 'list' ? 'var(--bg-tertiary)' : 'transparent', border: 'none' }} onClick={() => setViewMode('list')}>
              <List size={16} /> List View
            </button>
            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', backgroundColor: viewMode === 'kanban' ? 'var(--bg-tertiary)' : 'transparent', border: 'none' }} onClick={() => setViewMode('kanban')}>
              <Kanban size={16} /> Kanban
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={onExportExcel}>
              <Download size={16} /> Export Excel
            </button>
            <button className="btn btn-primary" onClick={openAddModal}>
              <Plus size={16} /> Add Application
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search role, company, job id..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select className="form-input" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {STATUS_COLUMNS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select className="form-input" value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)}>
            <option value="">All Companies</option>
            {companies.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
          </select>
        </div>
      </div>

      {/* Main Layout Area */}
      {viewMode === 'list' ? (
        <div className="glass-card">
          {filteredApps.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              No applications match your filters.
            </div>
          ) : (
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Job ID</th>
                    <th>Role</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Applied Date</th>
                    <th>Salary</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map(app => (
                    <tr key={app.id} style={{ cursor: 'pointer' }} onClick={() => openDetailModal(app)}>
                      <td><span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{app.jobId || 'N/A'}</span></td>
                      <td style={{ fontWeight: 500 }}>{app.role}</td>
                      <td>{app.company?.companyName || 'N/A'}</td>
                      <td>
                        <span className={`badge ${getStatusClass(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td>{app.appliedDate || 'N/A'}</td>
                      <td>{app.salary || 'N/A'}</td>
                      <td>{app.location || 'Remote'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }} onClick={e => e.stopPropagation()}>
                          <button className="btn btn-secondary" style={{ padding: '0.35rem 0.6rem' }} onClick={() => openDetailModal(app)}>
                            <Eye size={12} />
                          </button>
                          <button className="btn btn-secondary" style={{ padding: '0.35rem 0.6rem' }} onClick={(e) => openEditModal(app, e)}>
                            <Edit2 size={12} />
                          </button>
                          <button className="btn btn-danger" style={{ padding: '0.35rem 0.6rem' }} onClick={() => onDeleteApplication(app.id)}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* Kanban Board */
        <div className="kanban-board">
          {STATUS_COLUMNS.map(column => {
            const columnApps = filteredApps.filter(app => app.status === column);
            return (
              <div key={column} className="kanban-column">
                <div className="column-header">
                  <h3>{column}</h3>
                  <span className="column-count">{columnApps.length}</span>
                </div>
                
                <div className="kanban-cards-container">
                  {columnApps.map(app => (
                    <div key={app.id} className="kanban-card" onClick={() => openDetailModal(app)}>
                      <div className="card-role">{app.role}</div>
                      <div className="card-company">{app.company?.companyName}</div>
                      
                      <div className="card-footer">
                        <span>{app.appliedDate || 'N/A'}</span>
                        <div style={{ display: 'flex', gap: '0.25rem' }} onClick={e => e.stopPropagation()}>
                          <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => openEditModal(app)}>
                            <Edit2 size={10} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details View Modal */}
      {showDetailModal && selectedApp && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="glass-card modal-content" style={{ maxWidth: '650px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{selectedApp.role}</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  {selectedApp.company?.companyName} &bull; <span style={{ fontFamily: 'monospace' }}>{selectedApp.jobId || 'No Job ID'}</span>
                </p>
              </div>
              <span className={`badge ${getStatusClass(selectedApp.status)}`} style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>
                {selectedApp.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Calendar size={14} />
                  <span>Applied: <strong style={{ color: 'var(--text-primary)' }}>{selectedApp.appliedDate || 'N/A'}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <DollarSign size={14} />
                  <span>Salary: <strong style={{ color: 'var(--text-primary)' }}>{selectedApp.salary || 'N/A'}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={14} />
                  <span>Location: <strong style={{ color: 'var(--text-primary)' }}>{selectedApp.location || 'N/A'}</strong></span>
                </div>
              </div>
              
              <div>
                <p style={{ marginBottom: '0.5rem' }}>Portal: <strong style={{ color: 'var(--text-primary)' }}>{selectedApp.jobPortal || 'N/A'}</strong></p>
                <p style={{ marginBottom: '0.5rem' }}>Resume: <strong style={{ color: 'var(--text-primary)' }}>{selectedApp.resumeVersion || 'N/A'}</strong></p>
                <p>HR: <strong style={{ color: 'var(--text-primary)' }}>{selectedApp.hrContact?.hrName || 'None assigned'}</strong></p>
              </div>
            </div>

            {selectedApp.jobDescription && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Job Description</h4>
                <div style={{ maxHeight: '150px', overflowY: 'auto', padding: '0.75rem', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', whiteSpace: 'pre-line' }}>
                  {selectedApp.jobDescription}
                </div>
              </div>
            )}

            {selectedApp.notes && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Application Notes</h4>
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', whiteSpace: 'pre-line' }}>
                  {selectedApp.notes}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem' }}>
              <button className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setShowDetailModal(false); openEditModal(selectedApp); }}>Edit details</button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Form Modal */}
      {showFormModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content" style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 700 }}>
              {editingApp ? 'Edit Job Application' : 'Add New Job Application'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Job Role / Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Software Engineer"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Company *</label>
                  <select
                    className="form-input"
                    value={formData.companyId}
                    onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                    required
                  >
                    {companies.length === 0 && <option value="">-- Add a company first --</option>}
                    {companies.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Job ID / Code</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. REQ-9922"
                    value={formData.jobId}
                    onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Status *</label>
                  <select
                    className="form-input"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                  >
                    {STATUS_COLUMNS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>HR Recruiter Contact</label>
                  <select
                    className="form-input"
                    value={formData.hrContactId}
                    onChange={(e) => setFormData({ ...formData, hrContactId: e.target.value })}
                  >
                    <option value="">No Contact Selected</option>
                    {hrContacts.map(hr => <option key={hr.id} value={hr.id}>{hr.hrName}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>Applied Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.appliedDate}
                    onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Remote, San Francisco"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Salary Package</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. $120,000 / year"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Job Portal</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. LinkedIn, Indeed"
                    value={formData.jobPortal}
                    onChange={(e) => setFormData({ ...formData, jobPortal: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Resume Version</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Java-Developer-v2"
                    value={formData.resumeVersion}
                    onChange={(e) => setFormData({ ...formData, resumeVersion: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Job Description</label>
                <textarea
                  className="form-input"
                  placeholder="Paste the job requirements description here..."
                  rows={4}
                  style={{ resize: 'vertical' }}
                  value={formData.jobDescription}
                  onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Application Notes</label>
                <textarea
                  className="form-input"
                  placeholder="e.g. Followed up on email, technical test scheduled..."
                  rows={3}
                  style={{ resize: 'vertical' }}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowFormModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingApp ? 'Save Changes' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
