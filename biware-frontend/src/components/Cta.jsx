export default function Cta({ onOpenQuote, onOpenContact }) {
  return (
    <section id="contact" style={{
      padding: '7rem 3rem',
      background: 'var(--bw-darker)',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="reveal">
          <h2 style={{
            fontFamily: 'var(--font)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '1.25rem',
          }}>
            Prêt à valoriser<br />votre <span style={{ color: 'var(--bw-orange)' }}>DATA</span> ?
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '1rem',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
          }}>
            Contactez nos experts pour une démonstration personnalisée de nos solutions ou un programme de formation adapté à vos équipes.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={onOpenQuote}>Demander un devis →</button>
            <button className="btn-ghost" onClick={onOpenContact}>Nous contacter</button>
          </div>
        </div>
      </div>
    </section>
  )
}