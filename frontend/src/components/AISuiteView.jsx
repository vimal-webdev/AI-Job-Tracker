import React, { useState } from 'react';
import { Sparkles, FileSearch, Mail, Compass, HelpCircle, Loader2, Copy, AlertTriangle } from 'lucide-react';

const API_BASE = "http://localhost:8080/api/ai";

export default function AISuiteView({ addToast }) {
  const [activeTab, setActiveTab] = useState('resume'); // 'resume', 'jd', 'email', 'interview'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // States for Resume Analyzer
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeJd, setResumeJd] = useState('');
  const [resumeResult, setResumeResult] = useState(null);

  // States for JD Analyzer
  const [jdText, setJdText] = useState('');
  const [jdResult, setJdResult] = useState(null);

  // States for Email Generator
  const [emailForm, setEmailForm] = useState({
    templateType: 'Cold Email',
    role: '',
    companyName: '',
    recruiterName: ''
  });
  const [emailResult, setEmailResult] = useState(null);

  // States for Interview Prep
  const [prepRole, setPrepRole] = useState('');
  const [prepResult, setPrepResult] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addToast('Copied to clipboard!', 'success');
  };

  const handleAIRequest = async (endpoint, body, onSuccess, isMultipart = false) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const headers = {};
      let requestBody;

      if (isMultipart) {
        requestBody = body; // FormData determines its own boundaries & headers
      } else {
        headers['Content-Type'] = 'application/json';
        requestBody = JSON.stringify(body);
      }

      const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers,
        body: requestBody
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred during AI processing.');
      }
      onSuccess(data);
      addToast('AI Generation Complete!', 'success');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
      addToast('AI generation failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (< 2MB)
    if (file.size > 2 * 1024 * 1024) {
      addToast('File size must be less than 2MB', 'error');
      e.target.value = null; // reset input
      setResumeFile(null);
      return;
    }

    // Validate type
    const filename = file.name.toLowerCase();
    if (!filename.endsWith('.pdf') && !filename.endsWith('.doc') && !filename.endsWith('.docx')) {
      addToast('Only PDF, DOC, and DOCX formats are allowed', 'error');
      e.target.value = null; // reset input
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
    addToast('File selected successfully!', 'success');
  };

  // Trigger Resume Analysis
  const analyzeResume = () => {
    if (!resumeFile) {
      addToast('Please upload your Resume file first', 'error');
      return;
    }
    if (!resumeJd.trim()) {
      addToast('Please enter the target Job Description', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', resumeFile);
    formData.append('jobDescription', resumeJd);

    handleAIRequest('resume-analysis', formData, (data) => {
      setResumeResult(data);
    }, true);
  };

  // Trigger JD Analysis
  const analyzeJd = () => {
    if (!jdText.trim()) {
      addToast('Please paste a Job Description', 'error');
      return;
    }
    handleAIRequest('job-description', { jobDescription: jdText }, (data) => {
      setJdResult(data);
    });
  };

  // Trigger Email Generation
  const generateEmail = () => {
    if (!emailForm.role.trim() || !emailForm.companyName.trim()) {
      addToast('Role and Company Name are required', 'error');
      return;
    }
    handleAIRequest('email', emailForm, (data) => {
      setEmailResult(data);
    });
  };

  // Trigger Interview Prep
  const generatePrep = () => {
    if (!prepRole.trim()) {
      addToast('Please specify a Job Role', 'error');
      return;
    }
    handleAIRequest('interview', { role: prepRole }, (data) => {
      setPrepResult(data);
    });
  };

  return (
    <div>
      {/* Tab navigation */}
      <div className="ai-tabs">
        <button className={`ai-tab ${activeTab === 'resume' ? 'active' : ''}`} onClick={() => setActiveTab('resume')}>
          <FileSearch size={16} style={{ marginRight: '0.5rem', display: 'inline' }} /> Resume Analyzer
        </button>
        <button className={`ai-tab ${activeTab === 'jd' ? 'active' : ''}`} onClick={() => setActiveTab('jd')}>
          <Compass size={16} style={{ marginRight: '0.5rem', display: 'inline' }} /> JD Details Extractor
        </button>
        <button className={`ai-tab ${activeTab === 'email' ? 'active' : ''}`} onClick={() => setActiveTab('email')}>
          <Mail size={16} style={{ marginRight: '0.5rem', display: 'inline' }} /> AI Email Writer
        </button>
        <button className={`ai-tab ${activeTab === 'interview' ? 'active' : ''}`} onClick={() => setActiveTab('interview')}>
          <HelpCircle size={16} style={{ marginRight: '0.5rem', display: 'inline' }} /> Interview Prep Guide
        </button>
      </div>

      {/* Error display */}
      {errorMsg && (
        <div className="glass-card" style={{ borderLeft: '4px solid var(--color-error)', backgroundColor: 'rgba(239, 68, 68, 0.05)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <AlertTriangle size={24} style={{ color: 'var(--color-error)', flexShrink: 0 }} />
          <div>
            <h4 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>AI Service Error</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
          <Loader2 size={40} className="animate-spin" style={{ color: 'var(--color-primary)', animation: 'spin 1.5s linear infinite', marginBottom: '1rem' }} />
          <span>Generating AI Insights... Please wait.</span>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {!loading && (
        <div>
          {/* 1. Resume Tab */}
          {activeTab === 'resume' && (
            <div style={{ display: 'grid', gridTemplateColumns: resumeResult ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
              <div className="glass-card">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Upload & Match Details</h3>
                
                <div className="form-group">
                  <label>Upload Your Resume (PDF, DOC, DOCX - Under 2MB)</label>
                  <input
                    type="file"
                    className="form-input"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ padding: '0.5rem 0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}
                  />
                  {resumeFile && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', display: 'block', marginTop: '0.5rem' }}>
                      Selected: {resumeFile.name} ({(resumeFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>Target Job Description</label>
                  <textarea
                    className="form-input"
                    rows={6}
                    placeholder="Paste details of the target job description..."
                    value={resumeJd}
                    onChange={(e) => setResumeJd(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={analyzeResume}>
                  <Sparkles size={16} /> Compute ATS Score & Match
                </button>
              </div>

              {resumeResult && (
                <div className="glass-card">
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', textAlign: 'center' }}>Analysis Results</h3>

                  <div className="ats-gauge">
                    <span style={{ fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {resumeResult.atsScore}%
                    </span>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Missing Skills / Keywords</h4>
                    <div>
                      {resumeResult.missingSkills && resumeResult.missingSkills.length > 0 ? (
                        resumeResult.missingSkills.map((s, idx) => <span key={idx} className="ai-skill-tag" style={{ borderColor: 'rgba(239, 68, 68, 0.3)', color: 'var(--color-error)' }}>{s}</span>)
                      ) : (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>None detected! Great alignment.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Resume Suggestions</h4>
                    <ul style={{ paddingLeft: '1.2rem', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {resumeResult.suggestions && resumeResult.suggestions.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. JD Tab */}
          {activeTab === 'jd' && (
            <div style={{ display: 'grid', gridTemplateColumns: jdResult ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
              <div className="glass-card">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Paste Job Posting</h3>
                
                <div className="form-group">
                  <label>Full Job Description Text</label>
                  <textarea
                    className="form-input"
                    rows={12}
                    placeholder="Paste the full job post details to extract key parameters..."
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={analyzeJd}>
                  <Sparkles size={16} /> Analyze Job Description
                </button>
              </div>

              {jdResult && (
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Extracted Details</h3>

                  <div>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block' }}>Experience Level Required</span>
                    <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>{jdResult.experienceLevel || 'Not specified'}</strong>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Extracted Skill Tags</h4>
                    <div>
                      {jdResult.skills && jdResult.skills.map((s, idx) => <span key={idx} className="ai-skill-tag" style={{ color: 'var(--color-secondary)' }}>{s}</span>)}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Core Responsibilities</h4>
                    <ul style={{ paddingLeft: '1.2rem', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {jdResult.responsibilities && jdResult.responsibilities.map((r, idx) => <li key={idx}>{r}</li>)}
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Search / SEO Keywords</h4>
                    <div>
                      {jdResult.keywords && jdResult.keywords.map((k, idx) => <span key={idx} className="ai-skill-tag" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>{k}</span>)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. Email Tab */}
          {activeTab === 'email' && (
            <div style={{ display: 'grid', gridTemplateColumns: emailResult ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
              <div className="glass-card">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Compose Email Template</h3>

                <div className="form-group">
                  <label>Template Type</label>
                  <select
                    className="form-input"
                    value={emailForm.templateType}
                    onChange={(e) => setEmailForm({ ...emailForm, templateType: e.target.value })}
                  >
                    <option value="Cold Email">Cold Email Outreach</option>
                    <option value="Referral Request">Referral Request</option>
                    <option value="Interview Follow-up">Interview Follow-up</option>
                    <option value="Thank You">Post-Interview Thank You</option>
                    <option value="Confirm Schedule">Schedule Confirmation</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Job Role / Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Java Backend Engineer"
                    value={emailForm.role}
                    onChange={(e) => setEmailForm({ ...emailForm, role: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Company Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Amazon"
                    value={emailForm.companyName}
                    onChange={(e) => setEmailForm({ ...emailForm, companyName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Recruiter Name (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. John Doe"
                    value={emailForm.recruiterName}
                    onChange={(e) => setEmailForm({ ...emailForm, recruiterName: e.target.value })}
                  />
                </div>

                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={generateEmail}>
                  <Sparkles size={16} /> Generate Email Text
                </button>
              </div>

              {emailResult && (
                <div className="glass-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Draft Email</h3>
                    <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => copyToClipboard(`Subject: ${emailResult.subject}\n\n${emailResult.body}`)}>
                      <Copy size={12} /> Copy Draft
                    </button>
                  </div>

                  <div className="ai-output-box">
                    <p style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Subject:</span><br />
                      <strong>{emailResult.subject}</strong>
                    </p>
                    <p style={{ whiteSpace: 'pre-line', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      {emailResult.body}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. Interview Prep Tab */}
          {activeTab === 'interview' && (
            <div style={{ display: 'grid', gridTemplateColumns: prepResult ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
              <div className="glass-card">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Interview Preparation</h3>

                <div className="form-group">
                  <label>Target Job Role</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Senior Java Spring Boot Developer"
                    value={prepRole}
                    onChange={(e) => setPrepRole(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={generatePrep}>
                  <Sparkles size={16} /> Generate Prep Guide
                </button>
              </div>

              {prepResult && (
                <div className="glass-card" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem' }}>Role-Specific Prep Guide</h3>

                  {/* Render Java Questions */}
                  {prepResult.javaQuestions && prepResult.javaQuestions.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ color: 'var(--color-primary)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Core Java Tech Questions</h4>
                      {prepResult.javaQuestions.map((q, idx) => (
                        <div key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                          <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Q: {q.question || q}</p>
                          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>A: {q.answer || 'Review Java details for this question.'}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render Spring Boot Questions */}
                  {prepResult.springQuestions && prepResult.springQuestions.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ color: 'var(--color-secondary)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Spring Boot & REST Questions</h4>
                      {prepResult.springQuestions.map((q, idx) => (
                        <div key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                          <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Q: {q.question || q}</p>
                          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>A: {q.answer || 'Review Spring framework details.'}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render SQL Questions */}
                  {prepResult.sqlQuestions && prepResult.sqlQuestions.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ color: 'var(--color-warning)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}>SQL Database Questions</h4>
                      {prepResult.sqlQuestions.map((q, idx) => (
                        <div key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                          <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Q: {q.question || q}</p>
                          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>A: {q.answer || 'Review MySQL queries.'}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render Coding Challenges */}
                  {prepResult.codingQuestions && prepResult.codingQuestions.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ color: 'var(--color-purple)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Coding & Algorithmic Challenges</h4>
                      {prepResult.codingQuestions.map((q, idx) => (
                        <div key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                          <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Q: {q.question || q}</p>
                          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>A: {q.answer || 'Review algorithmic approaches.'}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render HR Questions */}
                  {prepResult.hrQuestions && prepResult.hrQuestions.length > 0 && (
                    <div>
                      <h4 style={{ color: 'var(--color-success)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}>HR & Behavioral Questions</h4>
                      {prepResult.hrQuestions.map((q, idx) => (
                        <div key={idx} style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                          <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Q: {q.question || q}</p>
                          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>A: {q.answer || 'Review behavioral strategies.'}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
