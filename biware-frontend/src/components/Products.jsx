import synapseLogo from '../assets/Aperçu de l’image.png'; 
import creditSquaresLogo from '../assets/credit_squares.png' ;

export default function Products() {
  const handleRedirect = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="produits" style={{
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
            Nos produits phares
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
            Deux solutions.<br />Une <span style={{ color: 'var(--bw-orange)' }}>ambition</span> : votre performance.
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            maxWidth: 560,
            fontWeight: 300,
          }}>
            Conçus par Biware pour adresser les besoins métiers les plus critiques.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          marginTop: '3.5rem',
        }}>
          {/* Synapse */}
          <div className="reveal reveal-d1" style={{
            borderRadius: 24,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
            transition: 'transform 0.3s var(--ease), box-shadow 0.3s',
            background: 'linear-gradient(145deg, #0B1829 0%, #0D1F3C 100%)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}>
            <div style={{ padding: '2.25rem 2.25rem 1.75rem', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(0,168,156,0.25) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                {/* Logo Synapse réel */}
                <img 
                  src={synapseLogo} 
                  alt="Synapse Logo" 
                  style={{ 
                    width: 60, 
                    height: 60, 
                    objectFit: 'contain'
                  }} 
                />
                <div>
                  <div style={{ fontFamily: 'var(--font)', fontSize: '1.55rem', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1, color: '#4274DF' }}>Synapse</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, marginTop: '0.25rem', opacity: 0.7, color: '#00A89C' }}>Build your strong staff</div>
                </div>
              </div>
              <div style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.22rem 0.8rem',
                borderRadius: 20,
                display: 'inline-block',
                marginBottom: '1rem',
                background: 'rgba(0,168,156,0.15)',
                color: '#00A89C',
                border: '1px solid rgba(0,168,156,0.25)',
              }}>RH & Engagement</div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Solution d'engagement collaborateur et de développement personnel. Synapse mesure la santé relationnelle et émotionnelle de vos équipes grâce à l'IA Analytics.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.75rem' }}>
                {['AI Analytics : scoring d\'engagement', 'Application mobile — feedback continu', 'Résumés des interactions d\'équipe', 'Baromètres RH et soft skills'].map(feat => (
                  <div key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#00A89C', marginTop: '0.52rem' }} />
                    {feat}
                  </div>
                ))}
              </div>
              <button 
                className="btn-primary" 
                style={{ background: '#00A89C', cursor: 'pointer' }}
                onClick={() => handleRedirect('https://www.linkedin.com/products/biware-consulting-synapse/')}
              >
                Découvrir Synapse →
              </button>
            </div>
            
          </div>

          {/* Credit Squares - à compléter avec votre logo Credit Squares */}
          <div className="reveal reveal-d2" style={{
            borderRadius: 24,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
            transition: 'transform 0.3s var(--ease), box-shadow 0.3s',
            background: 'linear-gradient(145deg, #160F00 0%, #1C1500 100%)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}>
            <div style={{ padding: '2.25rem 2.25rem 1.75rem', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(245,166,35,0.2) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                {/* Logo Credit Squares - à remplacer par le chemin de votre fichier */}
    
                  <img 
                      src={creditSquaresLogo} 
                      alt="Credit Squares Logo" 
                      style={{ width: 60, height: 60, objectFit: 'contain' }} 
                    />
                
                <div>
                  <div style={{ fontFamily: 'var(--font)', fontSize: '1.55rem', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1, color: '#182F50' }}>Credit Squares</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, marginTop: '0.25rem', opacity: 0.7, color: '#F5A623' }}>Portefeuille sain & croissance durable</div>
                </div>
              </div>
              <div style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.22rem 0.8rem',
                borderRadius: 20,
                display: 'inline-block',
                marginBottom: '1rem',
                background: 'rgba(245,166,35,0.15)',
                color: '#F5A623',
                border: '1px solid rgba(245,166,35,0.25)',
              }}>Crédit & Risque</div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Credit Squares accroît l'efficacité opérationnelle et commerciale des institutions de crédit en maintenant un portefeuille sain.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.75rem' }}>
                {['Automatisation des tâches opérationnelles', 'Accès rapide aux informations', 'Scoring crédit paramétrable', 'Suivi du portefeuille'].map(feat => (
                  <div key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#F5A623', marginTop: '0.52rem' }} />
                    {feat}
                  </div>
                ))}
              </div>
              <button 
                className="btn-primary" 
                style={{ background: '#F5A623', color: '#1C1C1E', cursor: 'pointer' }}
                onClick={() => handleRedirect('https://www.linkedin.com/products/biware-consulting-credit-squares/')}
              >
                Découvrir Credit Squares →
              </button>
            </div>
            <div style={{ padding: '0 2.25rem 2.25rem' }}>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}