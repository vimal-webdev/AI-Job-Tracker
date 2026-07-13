import React from 'react';
import { Briefcase, Calendar, CheckCircle2, UserCheck, XCircle } from 'lucide-react';

export default function DashboardView({ applications, setActivePage }) {
  const total = applications.length;
  
  const shortlisted = applications.filter(a => 
    a.status?.toLowerCase() === 'shortlisted'
  ).length;

  const interviews = applications.filter(a => 
    a.status?.toLowerCase().includes('round')
  ).length;

  const offers = applications.filter(a => 
    a.status?.toLowerCase().includes('offer')
  ).length;

  const rejected = applications.filter(a => 
    a.status?.toLowerCase() === 'rejected'
  ).length;

  // Recent 5 applications
  const recentApps = [...applications]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

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

  return (
    <div>
      <div className="metrics-grid">
        <div className="glass-card metric-card">
          <div className="metric-info">
            <h3>Total Applied</h3>
            <div className="metric-value">{total}</div>
          </div>
          <div className="metric-icon" style={{color: '#4facfe'}}>
            <Briefcase size={24} />
          </div>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-info">
            <h3>Shortlisted</h3>
            <div className="metric-value">{shortlisted}</div>
          </div>
          <div className="metric-icon" style={{color: '#00f2fe'}}>
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-info">
            <h3>Interviews</h3>
            <div className="metric-value">{interviews}</div>
          </div>
          <div className="metric-icon" style={{color: '#f59e0b'}}>
            <Calendar size={24} />
          </div>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-info">
            <h3>Offers Received</h3>
            <div className="metric-value">{offers}</div>
          </div>
          <div className="metric-icon" style={{color: '#10b981'}}>
            <UserCheck size={24} />
          </div>
        </div>
      </div>

      <div className="glass-card" style={{marginTop: '2rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
          <h2 style={{fontSize: '1.25rem', fontWeight: 600}}>Recent Applications</h2>
          <button className="btn btn-secondary" onClick={() => setActivePage('applications')}>View All</button>
        </div>

        {recentApps.length === 0 ? (
          <div style={{textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)'}}>
            No applications recorded yet. Go to "Applications" to add one!
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
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {recentApps.map(app => (
                  <tr key={app.id}>
                    <td><span style={{fontFamily: 'monospace', fontWeight: 600}}>{app.jobId || 'N/A'}</span></td>
                    <td style={{fontWeight: 500}}>{app.role}</td>
                    <td>{app.company?.companyName || 'N/A'}</td>
                    <td>
                      <span className={`badge ${getStatusClass(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>{app.appliedDate || 'N/A'}</td>
                    <td>{app.location || 'Remote'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
