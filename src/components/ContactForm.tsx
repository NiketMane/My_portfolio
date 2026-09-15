import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, MailCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const SUBJECT_OPTIONS = [
  { value: '', label: '-- Select Subject --' },
  { value: 'Job Opportunities', label: 'Job Opportunities' },
  { value: 'General Message', label: 'General Message' },
  { value: 'Collaboration', label: 'Collaboration' },
  { value: 'Project Enquiry', label: 'Project Enquiry' },
];

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.subject) {
      setStatus({ type: 'error', message: 'Please select a subject from the dropdown.' });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    // 1. If Web3Forms is configured, use it directly (instant & reliable)
    if (web3FormsKey && web3FormsKey !== 'YOUR_FREE_WEB3FORMS_KEY') {
      try {
        await submitToWeb3Forms(web3FormsKey);
      } finally {
        setLoading(false);
      }
      return;
    }

    // 2. Fallback to /api/contact (Serverless / SMTP)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          message: data.message || 'Thank you! Your message has been delivered to my inbox.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message:
            data.message ||
            'Unable to send message. Please ensure email settings are configured or email directly at developer.niket@gmail.com.',
        });
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        message:
          'Network error sending message. Please reach out directly to developer.niket@gmail.com.',
      });
    } finally {
      setLoading(false);
    }
  };

  const submitToWeb3Forms = async (key: string) => {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key,
          name: formData.name,
          email: formData.email,
          subject: `[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: "Thank you for reaching out! Your message has been sent successfully. I'll get back to you within 24 hours.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Failed to send message via Web3Forms. Please email me directly.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Could not reach contact service. Please email me directly at developer.niket@gmail.com.',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card"
      style={{ padding: '32px' }}
    >
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <MailCheck size={20} color="var(--accent-emerald)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>Send Me a Message</h3>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Fill out the form below to deliver your inquiry directly to my email inbox.
        </p>
      </div>

      {status.type && (
        <div
          style={{
            padding: '16px',
            marginBottom: '24px',
            borderRadius: 'var(--radius-md)',
            border: `1px solid ${status.type === 'success' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)'}`,
            background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
            color: status.type === 'success' ? 'var(--accent-emerald-light)' : '#fca5a5',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.9rem',
          }}
        >
          {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name <span style={{ color: 'var(--accent-rose)' }}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g. Alex Morgan"
            className="form-input"
          />
        </div>

        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address <span style={{ color: 'var(--accent-rose)' }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="e.g. alex@company.com"
            className="form-input"
          />
        </div>

        {/* Subject Select Dropdown */}
        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            Subject <span style={{ color: 'var(--accent-rose)' }}>*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="form-select"
          >
            {SUBJECT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message Input */}
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message <span style={{ color: 'var(--accent-rose)' }}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Describe your job opportunity, project inquiry, or collaboration..."
            className="form-textarea"
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', marginTop: '8px' }}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};
