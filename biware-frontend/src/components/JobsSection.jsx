import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../services/jobService';

export default function JobsSection() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    const data = await jobService.getAllJobs();
    setJobs(data);
    setLoading(false);
  };

  const handleApply = (jobId) => {
    navigate(`/postuler/${jobId}`);
  };

  const getContractColor = (contract) => {
    if (contract.includes('CDI')) return 'rgba(242,101,34,0.12)';
    if (contract.includes('Stage')) return 'rgba(34,197,94,0.12)';
    return 'rgba(255,255,255,0.08)';
  };

  const getContractTextColor = (contract) => {
    if (contract.includes('CDI')) return 'var(--bw-orange)';
    if (contract.includes('Stage')) return '#22c55e';
    return 'rgba(255,255,255,0.6)';
  };

  if (loading) {
    return (
      <section style={{ padding: '7rem 3rem', textAlign: 'center', background: 'var(--bw-darker)' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>Chargement des offres...</p>
      </section>
    );
  }

  return (
    <section
      id="carrieres"
      style={{
        padding: '7rem 3rem',
        background: 'var(--bw-darker)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── En-tête identique à Services ── */}
        <div >
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
            Carrières
          </div>

          <h2 style={{
            fontFamily: 'var(--font)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '1rem',
          }}>
            Donnez un nouvel élan<br />à votre <span style={{ color: 'var(--bw-orange)' }}>carrière</span>
          </h2>

          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            maxWidth: 560,
            fontWeight: 300,
          }}>
            Rejoignez une équipe passionnée et innovante au cœur des projets data.
          </p>
        </div>

        {/* ── Grille des offres ── */}
        {jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', marginTop: '3.5rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>
              Aucune offre disponible pour le moment. Revenez bientôt !
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
            marginTop: '3.5rem',
          }}>
            {jobs.map((job, idx) => (
              <div
                key={job.id}
               
                onMouseEnter={() => setHoveredId(job.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleApply(job.id)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${hoveredId === job.id ? 'rgba(242,101,34,0.25)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 18,
                  padding: '1.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s var(--ease)',
                  cursor: 'pointer',
                  transform: hoveredId === job.id ? 'translateY(-3px)' : 'translateY(0)',
                  boxShadow: hoveredId === job.id ? '0 16px 40px rgba(0,0,0,0.4)' : 'none',
                }}
              >
                {/* Badge contrat */}
                <div style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.85rem',
                  borderRadius: 30,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  background: getContractColor(job.contract),
                  color: getContractTextColor(job.contract),
                  marginBottom: '1.1rem',
                  letterSpacing: '0.02em',
                }}>
                  {job.contract}
                </div>

                {/* Titre */}
                <div style={{
                  fontFamily: 'var(--font)',
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: '0.4rem',
                }}>
                  {job.title}
                </div>

                {/* Localisation & date */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: '0.75rem',
                  marginBottom: '0.75rem',
                  flexWrap: 'wrap',
                }}>
                  <span>{job.location}</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
                  <span>{job.date}</span>
                </div>

                {/* Description courte */}
                <div style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.38)',
                  lineHeight: 1.7,
                  marginBottom: '1.25rem',
                }}>
                  {job.shortDesc}
                </div>

                {/* Lien Postuler */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--bw-orange)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}>
                  <span>Postuler</span>
                  <svg
                    width="13" height="13"
                    viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                    style={{
                      transition: 'transform 0.2s ease',
                      transform: hoveredId === job.id ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Barre orange animée en bas */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'var(--bw-orange)',
                  transform: hoveredId === job.id ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s var(--ease)',
                }} />
              </div>
            ))}
          </div>
        )}

        {/* ── Candidature spontanée ── */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '1rem',
          }}>
            Vous ne trouvez pas l'offre qui vous correspond ?
          </p>
          <button
            onClick={() => navigate('/candidature-spontanee')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(242,101,34,0.35)',
              color: 'var(--bw-orange)',
              padding: '0.7rem 1.8rem',
              borderRadius: 40,
              fontSize: '0.85rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(242,101,34,0.08)';
              e.currentTarget.style.borderColor = 'var(--bw-orange)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(242,101,34,0.35)';
            }}
          >
            Candidature spontanée →
          </button>
        </div>

      </div>
    </section>
  );
}