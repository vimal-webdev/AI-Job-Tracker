import React, { useState } from 'react';
import { Edit2, Plus, Trash2, Mail, Phone, Linkedin, FileText } from 'lucide-react';

export default function HRContactsView({ hrContacts, onAddHRContact, onUpdateHRContact, onDeleteHRContact, addToast }) {
  const [showModal, setShowModal] = useState(false);
  const [editingHR, setEditingHR] = useState(null);
  const [formData, setFormData] = useState({ hrName: '', email: '', phone: '', linkedin: '', notes: '' });

  const openAddModal = () => {
    setEditingHR(null);
    setFormData({ hrName: '', email: '', phone: '', linkedin: '', notes: '' });
    setShowModal(true);
  };

  const openEditModal = (hr) => {
    setEditingHR(hr);
    setFormData({
      hrName: hr.hrName || '',
      email: hr.email || '',
      phone: hr.phone || '',
      linkedin: hr.linkedin || '',
      notes: hr.notes || ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.hrName.trim()) {
      addToast('HR Contact Name is required', 'error');
      return;
    }

    if (editingHR) {
      onUpdateHRContact(editingHR.id, formData);
    } else {
      onAddHRContact(formData);
    }
    setShowModal(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={16} /> Add HR Contact
        </button>
      </div>

      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {hrContacts.length === 0 ? (
          <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            No HR contacts registered. Add your first recruiter contact above!
          </div>
        ) : (
          hrContacts.map(hr => (
            <div key={hr.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.75rem' }}>{hr.hrName}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={14} />
                    {hr.email ? <a href={`mailto:${hr.email}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>{hr.email}</a> : <span>No email</span>}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone size={14} />
                    <span>{hr.phone || 'No phone'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Linkedin size={14} />
                    {hr.linkedin ? (
                      <a href={hr.linkedin.startsWith('http') ? hr.linkedin : `https://${hr.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                        LinkedIn Profile
                      </a>
                    ) : (
                      <span>No LinkedIn</span>
                    )}
                  </div>
                </div>

                {hr.notes && (
                  <div style={{ marginTop: '0.75rem', padding: '0.5rem', backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: '4px', fontSize: '0.8rem', display: 'flex', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                    <FileText size={14} style={{ flexShrink: 0 }} />
                    <span>{hr.notes}</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', flexGrow: 1 }} onClick={() => openEditModal(hr)}>
                  <Edit2 size={12} /> Edit
                </button>
                <button className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => onDeleteHRContact(hr.id)}>
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
              {editingHR ? 'Edit HR Contact' : 'Add New HR Contact'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Recruiter Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. John Doe"
                  value={formData.hrName}
                  onChange={(e) => setFormData({ ...formData, hrName: e.target.value })}
                  required
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="e.g. johndoe@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 123-456-7890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>LinkedIn URL</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. https://linkedin.com/in/johndoe"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Notes / Comments</label>
                <textarea
                  className="form-input"
                  placeholder="e.g. Recruiter for frontend roles, prefers email communication"
                  rows={3}
                  style={{ resize: 'vertical' }}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingHR ? 'Save Changes' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
