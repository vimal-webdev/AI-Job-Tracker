import React, { useState } from 'react';
import { Edit2, Plus, Trash2, Globe, MapPin } from 'lucide-react';

export default function CompaniesView({ companies, onAddCompany, onUpdateCompany, onDeleteCompany, addToast }) {
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [formData, setFormData] = useState({ companyName: '', location: '', website: '' });

  const openAddModal = () => {
    setEditingCompany(null);
    setFormData({ companyName: '', location: '', website: '' });
    setShowModal(true);
  };

  const openEditModal = (company) => {
    setEditingCompany(company);
    setFormData({
      companyName: company.companyName || '',
      location: company.location || '',
      website: company.website || ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName.trim()) {
      addToast('Company Name is required', 'error');
      return;
    }

    if (editingCompany) {
      onUpdateCompany(editingCompany.id, formData);
    } else {
      onAddCompany(formData);
    }
    setShowModal(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={16} /> Add Company
        </button>
      </div>

      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {companies.length === 0 ? (
          <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            No companies registered. Add your first company above!
          </div>
        ) : (
          companies.map(company => (
            <div key={company.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>{company.companyName}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <MapPin size={14} />
                  <span>{company.location || 'Not Specified'}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <Globe size={14} />
                  {company.website ? (
                    <a href={company.website.startsWith('http') ? company.website : `https://${company.website}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                      {company.website}
                    </a>
                  ) : (
                    <span>No website</span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', flexGrow: 1 }} onClick={() => openEditModal(company)}>
                  <Edit2 size={12} /> Edit
                </button>
                <button className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => onDeleteCompany(company.id)}>
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 700 }}>
              {editingCompany ? 'Edit Company' : 'Add New Company'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Company Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Google"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Mountain View, CA"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Website URL</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. https://google.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingCompany ? 'Save Changes' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
