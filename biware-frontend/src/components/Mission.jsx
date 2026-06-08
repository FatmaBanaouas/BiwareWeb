export default function Mission() {
  const pillars = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          <path d="M19 3l2 2-2 2" />
        </svg>
      ),
      title: 'Connaissance client',
      desc: 'Segmentation, ciblage et personnalisation des offres grâce à la data',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: 'Risk Management & Fraude',
      desc: 'Détection, conformité et prévention des risques financiers en temps réel',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      title: 'Prévision de la demande',
      desc: 'Modèles prédictifs et analytics avancés pour anticiper les tendances',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19V5a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v13" />
          <path d="M4 19a2 2 0 0 0 2 2h13a1 1 0 0 0 1-1v-1" />
          <path d="M8 7h8M8 11h5" />
        </svg>
      ),
      title: 'Consulting & Formation',
      desc: 'Accompagnement, intégration et montée en compétence de vos équipes',
    },
  ]

  return (
    <section id="mission" style={{
      padding: '7rem 3rem',
      background: 'var(--bw-dark)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5rem',
        alignItems: 'center',
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
            Notre mission
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
            Nous faisons parler<br />vos <span style={{ color: 'var(--bw-orange)' }}>données</span>
          </h2>
          <div style={{
            borderLeft: '3px solid var(--bw-orange)',
            paddingLeft: '1.5rem',
            margin: '1.5rem 0',
          }}>
            <div style={{
              fontFamily: 'var(--font)',
              fontSize: '1.5rem',
              fontWeight: 800,
              lineHeight: 1.4,
              color: '#fff',
              letterSpacing: '-0.02em',
            }}>
              « La donnée est le <em style={{ color: 'var(--bw-orange)', fontStyle: 'normal' }}>nouvel Or noir</em> »
            </div>
            <div style={{
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.35)',
              marginTop: '0.65rem',
              fontWeight: 400,
            }}>
              — Walid Kaâbachi, Co-fondateur & PDG
            </div>
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '0.9rem',
            lineHeight: 1.85,
            marginTop: '1.25rem',
          }}>
            Créée en 2011 par Walid Kaâbachi et Amine Boussarsar, Biware est une PME technologique tunisienne de plus de 30 ingénieurs et data scientists. Présente à Tunis, Lagos et Paris, notre mission est d'accompagner les entreprises à augmenter leurs revenus, optimiser leurs coûts et réduire leurs pertes grâce à la data.
          </p>
        </div>
        <div className="reveal reveal-d2" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14,
                padding: '1.1rem 1.25rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                transition: 'border-color 0.25s, background 0.25s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(242,101,34,0.3)'
                e.currentTarget.style.background = 'rgba(242,101,34,0.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              }}
            >
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 9,
                background: 'rgba(242,101,34,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--bw-orange)',
                flexShrink: 0,
              }}>
                {pillar.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '0.2rem',
                }}>{pillar.title}</div>
                <div style={{
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.38)',
                  lineHeight: 1.6,
                }}>{pillar.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}