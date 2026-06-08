import React, { useState } from 'react'

function ServiceCard({ service, idx }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`reveal reveal-d${(idx % 3) + 1}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(242,101,34,0.25)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 18,
        padding: '1.75rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s var(--ease)',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.4)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: 'rgba(242,101,34,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--bw-orange)',
        marginBottom: '1.1rem',
      }}>
        {service.icon}
      </div>
      <div style={{
        fontFamily: 'var(--font)',
        fontSize: '1rem',
        fontWeight: 800,
        color: '#fff',
        marginBottom: '0.4rem',
      }}>
        {service.title}
      </div>
      <div style={{
        fontSize: '0.8rem',
        color: 'rgba(255,255,255,0.38)',
        lineHeight: 1.7,
      }}>
        {service.desc}
      </div>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'var(--bw-orange)',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.3s var(--ease)',
      }} />
    </div>
  )
}

export default function Services() {
  const services = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 17.5h7M17.5 14v7" />
        </svg>
      ),
      title: 'Business Intelligence',
      desc: 'Tableaux de bord interactifs, rapports automatisés et KPIs en temps réel pour piloter votre activité avec précision.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: 'Risk Management & Fraude',
      desc: 'Détection des anomalies, scoring de risque et conformité réglementaire pour Finance, Assurance et Télécom.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          <path d="M19 8l2 2-2 2" />
        </svg>
      ),
      title: 'Customer Intelligence',
      desc: 'Connaissance client 360°, segmentation avancée et campaign management pour maximiser vos revenus.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <circle cx="4" cy="6" r="2" />
          <circle cx="20" cy="6" r="2" />
          <circle cx="4" cy="18" r="2" />
          <circle cx="20" cy="18" r="2" />
          <path d="M6 6.5l4 4M14 13.5l4 4M18 6.5l-4 4M10 13.5l-4 4" />
        </svg>
      ),
      title: 'Advanced Analytics & IA',
      desc: 'Analyse prédictive, modélisation statistique et machine learning appliqués à vos problématiques métier.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="6" rx="8" ry="3" />
          <path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
          <path d="M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" />
          <path d="M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" />
        </svg>
      ),
      title: 'Data Management',
      desc: 'Architecture data, gouvernance, qualité et intégration de vos sources dans un référentiel unifié et fiable.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19V5a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v13" />
          <path d="M4 19a2 2 0 0 0 2 2h13a1 1 0 0 0 1-1v-1" />
          <path d="M8 7h8M8 11h5" />
        </svg>
      ),
      title: 'Formations Power BI & SAS®',
      desc: 'Montée en compétence de vos équipes sur Power BI et SAS® — programmes sur mesure, certifiants et opérationnels.',
    },
  ]

  return (
    <section id="expertises" style={{
      padding: '7rem 3rem',
      background: 'var(--bw-dark)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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
            Nos expertises
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
            Des solutions pour<br />chaque <span style={{ color: 'var(--bw-orange)' }}>défi data</span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            maxWidth: 560,
            fontWeight: 300,
          }}>
            De la stratégie à l'implémentation, Biware couvre l'ensemble de la chaîne de valeur DATA.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
          marginTop: '3.5rem',
        }}>
          {services.map((service, idx) => (
            <ServiceCard key={service.title} service={service} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}