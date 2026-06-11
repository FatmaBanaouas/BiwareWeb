import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CandidatureSpontanee() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    domaine: '',
    message: '',
    cv: null
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const domaines = [
    t('candidature.domaines.bi'),
    t('candidature.domaines.data_eng'),
    t('candidature.domaines.data_science'),
    t('candidature.domaines.risk'),
    t('candidature.domaines.customer'),
    t('candidature.domaines.analytics'),
    t('candidature.domaines.data_mgmt'),
    t('candidature.domaines.powerbi'),
    t('candidature.domaines.sas'),
    t('candidature.domaines.stage'),
    t('candidature.domaines.alternance'),
    t('candidature.domaines.autre')
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (
      file.type === 'application/pdf' ||
      file.type === 'application/msword' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )) {
      setFormData(prev => ({ ...prev, cv: file }));
      setError('');
    } else {
      setError(t('candidature.cv_error') || 'Veuillez uploader un fichier PDF ou Word');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone || !formData.cv) {
      setError('Veuillez remplir tous les champs obligatoires et joindre votre CV');
      return;
    }
    setLoading(true);
    setError('');

    const submitData = new FormData();
    submitData.append('nom', formData.nom);
    submitData.append('prenom', formData.prenom);
    submitData.append('email', formData.email);
    submitData.append('telephone', formData.telephone);
    submitData.append('domaine', formData.domaine || 'Non spécifié');
    submitData.append('message', formData.message || '');
    submitData.append('cv', formData.cv);
    submitData.append('type', 'spontanee');

    try {
      const response = await fetch('http://localhost:5000/api/candidature-spontanee', {
        method: 'POST',
        body: submitData,
      });
      if (response.ok) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        const data = await response.json();
        setError(data.message || 'Une erreur est survenue');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: '0.85rem 1rem',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  };

  const labelStyle = {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.8rem',
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 500,
  };

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bw-darker)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}>
        <div style={{
          maxWidth: 520,
          textAlign: 'center',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 24,
          padding: '3rem 2.5rem',
        }}>
          <div style={{
            width: 64,
            height: 64,
            background: 'rgba(242,101,34,0.12)',
            borderRadius: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--bw-orange)" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 style={{ color: '#fff', fontSize: '1.6rem', marginBottom: '0.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            {t('candidature.success_title')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', lineHeight: 1.7, fontSize: '0.9rem' }}>
            {t('candidature.success_message').replace('{prenom}', formData.prenom)}
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'var(--bw-orange)',
              color: '#fff',
              border: 'none',
              padding: '0.8rem 2rem',
              borderRadius: 40,
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            {t('candidature.success_button')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="candidature-page" style={{
      minHeight: '100vh',
      background: 'var(--bw-darker)',
      paddingTop: '120px',
      paddingBottom: '5rem',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 2rem' }}>

        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2.5rem',
            fontSize: '0.85rem',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t('candidature.back')}
        </button>

        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.68rem',
            color: 'var(--bw-orange)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '0.85rem',
          }}>
            <span style={{ width: 20, height: 2, background: 'var(--bw-orange)', borderRadius: 1 }} />
            {t('candidature.badge')}
          </div>

          <h1 style={{
            fontFamily: 'var(--font)',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '1rem',
          }}>
            {t('candidature.title')}
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            maxWidth: 480,
            fontWeight: 300,
          }}>
            {t('candidature.subtitle')}
          </p>
        </div>

        <div className="candidature-form-card" style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 24,
          padding: '2rem',
        }}>
          {error && (
            <div style={{
              background: 'rgba(220,38,38,0.12)',
              border: '1px solid rgba(220,38,38,0.25)',
              borderRadius: 12,
              padding: '0.85rem 1rem',
              marginBottom: '1.5rem',
              color: '#ef4444',
              fontSize: '0.85rem',
              textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-two-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>{t('candidature.nom')} *</label>
                <input
                  type="text" name="nom" value={formData.nom} onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--bw-orange)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
              <div>
                <label style={labelStyle}>{t('candidature.prenom')} *</label>
                <input
                  type="text" name="prenom" value={formData.prenom} onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--bw-orange)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>{t('candidature.email')} *</label>
              <input
                type="email" name="email" value={formData.email} onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--bw-orange)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>{t('candidature.telephone')} *</label>
              <input
                type="tel" name="telephone" value={formData.telephone} onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--bw-orange)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>{t('candidature.domaine')} *</label>
              <select
                name="domaine" value={formData.domaine} onChange={handleChange}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--bw-orange)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <option value="" style={{ background: '#111112' }}>Sélectionnez un domaine</option>
                {domaines.map(d => (
                  <option key={d} value={d} style={{ background: '#111112' }}>{d}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>{t('candidature.cv')} *</label>
              <div
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  padding: '1rem',
                  textAlign: 'center',
                  transition: 'border-color 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(242,101,34,0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <input
                  type="file" accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="cv-upload-spontanee"
                />
                <label htmlFor="cv-upload-spontanee" style={{
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                  {formData.cv ? formData.cv.name : t('candidature.cv_click')}
                </label>
              </div>
              <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.4rem' }}>
                {t('candidature.cv_formats')}
              </p>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={labelStyle}>{t('candidature.message')}</label>
              <textarea
                name="message" value={formData.message} onChange={handleChange}
                rows={4}
                placeholder={t('candidature.message_placeholder')}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--bw-orange)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: 'var(--bw-orange)',
                color: '#fff',
                border: 'none',
                padding: '1rem',
                borderRadius: 40,
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.2s ease',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = '0.9'; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.opacity = '1'; }}
            >
              {loading ? t('candidature.sending') : t('candidature.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}