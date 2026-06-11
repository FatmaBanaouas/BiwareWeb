import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

export default function QuoteForm({ onClose, isOpen }) {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', telephone: '',
    societe: '', secteur: '', besoin: '', message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setSuccess(false); setError(false)
    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => data.append(k, v))
    try {
      const res = await axios.post('/api/devis', data)
      if (res.data.status === 'ok') {
        setSuccess(true)
        setForm({ nom: '', prenom: '', email: '', telephone: '', societe: '', secteur: '', besoin: '', message: '' })
        setTimeout(() => { onClose(); setSuccess(false) }, 2000)
      } else { setError(true) }
    } catch (err) { console.error('Erreur:', err); setError(true) }
    finally { setLoading(false) }
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
      zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', animation: 'fadeIn 0.3s ease',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bw-darker)', border: '1px solid rgba(242,101,34,0.2)',
        borderRadius: 24, maxWidth: 600, width: '100%', maxHeight: '90vh',
        overflowY: 'auto', padding: '2rem', position: 'relative',
        animation: 'slideUp 0.3s ease',
      }} onClick={(e) => e.stopPropagation()}>

        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%',
          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '1.2rem', transition: 'all 0.2s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(242,101,34,0.2)'; e.currentTarget.style.color = 'var(--bw-orange)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
        >✕</button>

        <h2 style={{ fontFamily: 'var(--font)', fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          {t('quote_form.title').split(' ').slice(0, -1).join(' ')}{' '}
          <span style={{ color: 'var(--bw-orange)' }}>{t('quote_form.title').split(' ').slice(-1)}</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          {t('quote_form.subtitle')}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-two-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" name="prenom" placeholder={t('quote_form.prenom')} value={form.prenom} onChange={handleChange} required style={inputStyle} />
            <input type="text" name="nom" placeholder={t('quote_form.nom')} value={form.nom} onChange={handleChange} required style={inputStyle} />
          </div>
          <input type="email" name="email" placeholder={t('quote_form.email')} value={form.email} onChange={handleChange} required style={inputStyle} />
          <input type="tel" name="telephone" placeholder={t('quote_form.telephone')} value={form.telephone} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="societe" placeholder={t('quote_form.societe')} value={form.societe} onChange={handleChange} style={inputStyle} />

          <select name="secteur" value={form.secteur} onChange={handleChange} required style={inputStyle}>
            <option value="">{t('quote_form.secteur')}</option>
            <option value="Banque/Finance">{t('quote_form.secteurs.bank')}</option>
            <option value="Télécommunication">{t('quote_form.secteurs.telecom')}</option>
            <option value="Assurance">{t('quote_form.secteurs.insurance')}</option>
            <option value="Industrie">{t('quote_form.secteurs.industry')}</option>
            <option value="Grande distribution">{t('quote_form.secteurs.retail')}</option>
            <option value="Énergie">{t('quote_form.secteurs.energy')}</option>
            <option value="Tech/Logiciel">{t('quote_form.secteurs.tech')}</option>
            <option value="Autre">{t('quote_form.secteurs.other')}</option>
          </select>

          <select name="besoin" value={form.besoin} onChange={handleChange} required style={inputStyle}>
            <option value="">{t('quote_form.besoin')}</option>
            <option value="Business Intelligence">{t('quote_form.besoins.bi')}</option>
            <option value="Risk Management">{t('quote_form.besoins.risk')}</option>
            <option value="Customer Intelligence">{t('quote_form.besoins.customer')}</option>
            <option value="Advanced Analytics">{t('quote_form.besoins.analytics')}</option>
            <option value="Data Management">{t('quote_form.besoins.data_mgmt')}</option>
            <option value="Formation Power BI">{t('quote_form.besoins.powerbi')}</option>
            <option value="Formation SAS">{t('quote_form.besoins.sas')}</option>
            <option value="Solution Synapse">{t('quote_form.besoins.synapse')}</option>
            <option value="Solution Credit Squares">{t('quote_form.besoins.credit')}</option>
            <option value="Autre">{t('quote_form.besoins.other')}</option>
          </select>

          <textarea name="message" placeholder={t('quote_form.message')} rows="4" value={form.message} onChange={handleChange} style={inputStyle} />

          <button type="submit" disabled={loading} className="btn-primary" style={{
            width: '100%', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, marginTop: '0.5rem',
          }}>
            {loading ? t('quote_form.sending') : t('quote_form.send')}
          </button>

          {success && (
            <p style={{ color: '#6EE7B7', textAlign: 'center', padding: '0.75rem', background: 'rgba(110,231,183,0.1)', borderRadius: 8, marginTop: '1rem' }}>
              {t('quote_form.success')}
            </p>
          )}
          {error && (
            <p style={{ color: '#FCA5A5', textAlign: 'center', padding: '0.75rem', background: 'rgba(252,165,165,0.1)', borderRadius: 8, marginTop: '1rem' }}>
              {t('quote_form.error')}
            </p>
          )}
        </form>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        input:hover, select:hover, textarea:hover { border-color: rgba(242,101,34,0.5) !important; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: var(--bw-orange) !important; box-shadow: 0 0 0 2px rgba(242,101,34,0.2) !important; }
      `}</style>
    </div>
  )
}

const inputStyle = {
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8, padding: '0.8rem 1rem', color: 'rgba(255,255,255,0.8)',
  fontSize: '0.9rem', fontFamily: 'inherit', transition: 'all 0.2s',
  width: '100%', boxSizing: 'border-box',
}