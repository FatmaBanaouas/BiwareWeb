import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

export default function ContactForm({ onClose, isOpen }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ nom: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError(false)

    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => data.append(k, v))

    try {
      const res = await axios.post('/api/contact', data)
      if (res.data.status === 'ok') {
        setSuccess(true)
        setForm({ nom: '', email: '', message: '' })
        setTimeout(() => { onClose(); setSuccess(false) }, 2000)
      } else {
        setError(true)
      }
    } catch (err) {
      console.error('Erreur:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        animation: 'fadeIn 0.3s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bw-darker)',
          border: '1px solid rgba(242,101,34,0.2)',
          borderRadius: 24,
          maxWidth: 480,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          animation: 'slideUp 0.3s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem', right: '1rem',
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            borderRadius: '50%',
            width: 32, height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            fontSize: '1.2rem',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(242,101,34,0.2)'
            e.currentTarget.style.color = 'var(--bw-orange)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
          }}
        >
          ✕
        </button>

        <h2 style={{
          fontFamily: 'var(--font)',
          fontSize: '1.8rem',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}>
          {t('contact_form.title')}
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.9rem',
          marginBottom: '2rem',
        }}>
          {t('contact_form.subtitle')}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            name="nom"
            placeholder={t('contact_form.name')}
            value={form.nom}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder={t('contact_form.email')}
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="message"
            placeholder={t('contact_form.message')}
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: '100%',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginTop: '0.5rem',
            }}
          >
            {loading ? t('contact_form.sending') : t('contact_form.send')}
          </button>

          {success && (
            <p style={{
              color: '#6EE7B7',
              textAlign: 'center',
              padding: '0.75rem',
              background: 'rgba(110,231,183,0.1)',
              borderRadius: 8,
              marginTop: '1rem',
            }}>
              {t('contact_form.success')}
            </p>
          )}

          {error && (
            <p style={{
              color: '#FCA5A5',
              textAlign: 'center',
              padding: '0.75rem',
              background: 'rgba(252,165,165,0.1)',
              borderRadius: 8,
              marginTop: '1rem',
            }}>
              {t('contact_form.error')}
            </p>
          )}
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .contact-input:hover {
          border-color: rgba(242,101,34,0.5) !important;
        }
        .contact-input:focus {
          outline: none;
          border-color: var(--bw-orange) !important;
          box-shadow: 0 0 0 2px rgba(242,101,34,0.2) !important;
        }
      `}</style>
    </div>
  )
}

const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  padding: '0.8rem 1rem',
  color: 'rgba(255,255,255,0.7)',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  transition: 'all 0.2s',
  width: '100%',
  boxSizing: 'border-box',
}