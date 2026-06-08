// Importez vos logos en haut du fichier
import { useState } from 'react';
import powerBILogo from '../assets/Power bi logo.png';
import sasLogo from '../assets/Saas logo.png'
import customLogo from '../assets/Biware_Logo_noir_page-0001-removebg-preview.png'
import FormationModal from './formformation';

export default function Formations() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formations = [
    {
      title: 'Formation Power BI',
      subtitle: 'Maîtrisez la visualisation et l\'analyse de données avec l\'outil Microsoft de référence.',
      logo: powerBILogo,
      logoClass: 'fi-pbi',
      features: ['Prise en main de Power BI Desktop', 'Modélisation de données', 'Langage DAX avancé', 'Création de rapports interactifs', 'Publication Power BI Service'],
      badge: 'Microsoft Power BI',
      badgeClass: 'fb-pbi',
    },
    {
      title: 'Formation SAS®',
      subtitle: 'Devenez expert en analyse statistique et gestion des données avec la plateforme SAS®.',
      logo: sasLogo,
      logoClass: 'fi-sas',
      features: ['Programmation SAS Base', 'SAS Enterprise Guide', 'Analyse statistique', 'Risk Management avec SAS', 'Préparation certifications SAS®'],
      badge: 'SAS® Certified Partner',
      badgeClass: 'fb-sas',
    },
    {
      title: 'Formations sur mesure',
      subtitle: 'Des programmes personnalisés adaptés aux besoins spécifiques de votre organisation.',
      logo: customLogo,
      logoClass: 'fi-adv',
      features: ['Audit des compétences data', 'Programme sur mesure', 'Format flexible', 'Coaching post-formation', 'Cas pratiques sur vos données'],
      badge: 'Programme personnalisé',
      badgeClass: 'fb-adv',
    },
  ];

  return (
    <section id="formations" style={{
      padding: '7rem 3rem',
      background: 'var(--bw-darker)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, var(--bw-orange), transparent)',
      }} />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'end',
          marginBottom: '3.5rem',
        }}>
          <div className="reveal">
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
              Formations certifiantes
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
              Renforcez vos équipes<br />avec nos <span style={{ color: 'var(--bw-orange)' }}>formations</span>
            </h2>
          </div>
          <div className="reveal reveal-d2">
            <p style={{
              color: 'rgba(255, 255, 255, 0.69)',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              maxWidth: 560,
              fontWeight: 300,
            }}>
              Biware propose des formations expertes en Power BI et SAS® pour donner à vos équipes les outils et compétences nécessaires.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}>
          {formations.map((f, idx) => (
            <div
              key={f.title}
              className={`reveal reveal-d${idx + 1}`}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
                padding: '2rem 1.75rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s var(--ease)',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.borderColor = 'rgba(242,101,34,0.2)'
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                background: f.logoClass === 'fi-pbi' ? 'rgba(242,200,17,0.12)' :
                          f.logoClass === 'fi-sas' ? 'rgba(255, 255, 255, 0.61)' : 
                          'rgba(242,101,34,0.12)',
                boxShadow: f.logoClass === 'fi-sas' ? 'none' : 'none',
              }}>
                <img 
                  src={f.logo} 
                  alt={`${f.title} logo`} 
                  style={{ 
                    width: f.logoClass === 'fi-sas' ? 48 : 40,
                    height: f.logoClass === 'fi-sas' ? 48 : 40, 
                    objectFit: 'contain'
                  }} 
                />
              </div>
              <div style={{
                fontFamily: 'var(--font)',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '0.5rem',
                letterSpacing: '-0.02em',
              }}>{f.title}</div>
              <div style={{
                fontSize: '0.78rem',
                color: 'rgba(255,255,255,0.35)',
                marginBottom: '1.25rem',
                lineHeight: 1.6,
              }}>{f.subtitle}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem', flex: 1 }}>
                {f.features.map(feat => (
                  <div key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--bw-orange)', marginTop: '0.52rem' }} />
                    {feat}
                  </div>
                ))}
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '0.25rem 0.8rem',
                borderRadius: 20,
                letterSpacing: '0.06em',
                background: f.badgeClass === 'fb-pbi' ? 'rgba(242,200,17,0.12)' :
                          f.badgeClass === 'fb-sas' ? 'rgba(255, 255, 255, 0.08)' :
                          'rgba(242,101,34,0.12)',
                color: f.badgeClass === 'fb-pbi' ? '#F2C811' :
                       f.badgeClass === 'fb-sas' ? '#ffffff' :
                       'var(--bw-orange)',
                border: f.badgeClass === 'fb-pbi' ? '1px solid rgba(242,200,17,0.2)' :
                        f.badgeClass === 'fb-sas' ? '1px solid rgba(255,255,255,0.15)' :
                        '1px solid rgba(242,101,34,0.2)',
              }}>{f.badge}</div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{
          marginTop: '3rem',
          background: 'rgba(242,101,34,0.07)',
          border: '1px solid rgba(242,101,34,0.18)',
          borderRadius: 20,
          padding: '2rem 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          flexWrap: 'wrap',
        }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font)', fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '0.3rem' }}>Prêt à former vos équipes ?</h3>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.4)' }}>Nos experts conçoivent un programme adapté à vos besoins et à votre secteur d'activité.</p>
          </div>
          <button 
            className="btn-primary" 
            onClick={() => setIsModalOpen(true)}
            style={{ cursor: 'pointer' }}
          >
            Demander un programme de formation →
          </button>
        </div>
      </div>

      <FormationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}