import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jobService } from '../services/jobService';

export default function JobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    message: '',
    cv: null
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await jobService.getJobById(jobId);
        if (data) {
          setJob(data);
        } else {
          setError('Offre non trouvée');
        }
      } catch (err) {
        setError('Erreur de chargement');
      } finally {
        setLoadingJob(false);
      }
    };
    loadJob();
  }, [jobId]);

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
      setError('Veuillez uploader un fichier PDF ou Word');
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
    submitData.append('poste', job.title);
    submitData.append('message', formData.message || '');
    submitData.append('cv', formData.cv);

    try {
  
      const response = await fetch('http://localhost:8000/api/candidature', {
        method: 'POST',
        body: submitData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        setError(data.message || 'Une erreur est survenue');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };


  if (loadingJob) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bw-darker)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>Chargement...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bw-darker)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#fff', marginBottom: '1rem' }}>Offre non trouvée</h1>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'var(--bw-orange)',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

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
          maxWidth: 500,
          textAlign: 'center',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 24,
          padding: '3rem 2rem',
        }}>
          <div style={{
            width: 60,
            height: 60,
            background: 'rgba(242,101,34,0.15)',
            borderRadius: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--bw-orange)" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Candidature envoyée !</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>
            Merci {formData.prenom}, votre candidature pour le poste de{' '}
            <strong style={{ color: 'var(--bw-orange)' }}>{job.title}</strong> a bien été reçue.<br />
            Nous vous répondrons dans les plus brefs délais.
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'var(--bw-orange)',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bw-darker)',
      paddingTop: '100px',
      paddingBottom: '4rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>

        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            fontSize: '0.9rem',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour aux offres
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start',
        }}>


          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 24,
              padding: '2rem',
              position: 'sticky',
              top: '100px',
              maxHeight: 'calc(100vh - 140px)',
              overflowY: 'auto',
            }}
          >
   
            <div style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: 20,
              fontSize: '0.7rem',
              fontWeight: 600,
              background: job.contract.includes('Stage') ? 'rgba(34,197,94,0.15)' : 'rgba(242,101,34,0.15)',
              color: job.contract.includes('Stage') ? '#22c55e' : 'var(--bw-orange)',
              marginBottom: '1rem',
            }}>
              {job.contract}
            </div>

          
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '1rem',
            }}>
              {job.title}
            </h1>

       
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {job.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Publiée le {job.date}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.75rem' }}>Description du poste</h3>
              <div style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: '0.9rem', whiteSpace: 'pre-line' }}>
                {job.description}
              </div>
            </div>

      
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.75rem' }}>Prérequis</h3>
              <ul style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0, paddingLeft: '1.2rem' }}>
                {job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

    
            <div>
              <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.75rem' }}>Nous offrons</h3>
              <ul style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0, paddingLeft: '1.2rem' }}>
                {job.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

     
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 24,
            padding: '2rem',
          }}>
            <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Postuler</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Remplissez le formulaire ci-dessous. Tous les champs sont obligatoires.
            </p>

            {error && (
              <div style={{
                background: 'rgba(220,38,38,0.15)',
                border: '1px solid rgba(220,38,38,0.3)',
                borderRadius: 10,
                padding: '0.75rem 1rem',
                marginBottom: '1.5rem',
                color: '#ef4444',
                fontSize: '0.85rem',
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
        
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      padding: '0.75rem 1rem',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      padding: '0.75rem 1rem',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    padding: '0.75rem 1rem',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    padding: '0.75rem 1rem',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>
                  CV (PDF ou Word) *
                </label>
                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: '1rem',
                  textAlign: 'center',
                }}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload" style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                    {formData.cv ? formData.cv.name : 'Cliquez pour télécharger votre CV'}
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>
                  Message de motivation (optionnel)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    padding: '0.75rem 1rem',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
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
                  padding: '0.9rem',
                  borderRadius: 10,
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'all 0.2s',
                }}
              >
                {loading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}