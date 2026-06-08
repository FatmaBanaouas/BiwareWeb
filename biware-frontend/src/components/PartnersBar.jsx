export default function PartnersBar() {
  return (
    <div style={{
      padding: '1.25rem 3rem',
      background: 'rgba(255,255,255,0.02)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        <div style={{
          fontSize: '0.62rem',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>Partenaires</div>
        <span style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          padding: '0.22rem 0.8rem',
          borderRadius: 20,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          border: '1.5px solid',
          color: '#60A5FA',
          borderColor: 'rgba(96,165,250,0.3)',
          background: 'rgba(96,165,250,0.07)',
        }}>SAS® Partner</span>
        <span style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          padding: '0.22rem 0.8rem',
          borderRadius: 20,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          border: '1.5px solid',
          color: '#6EE7B7',
          borderColor: 'rgba(110,231,183,0.3)',
          background: 'rgba(110,231,183,0.07)',
        }}>Microsoft Gold Partner</span>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.05em' }}>dB.SENSE</div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.05em' }}>ZITOUNA CAPITAL</div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.05em' }}>CDC GESTION</div>
      </div>
    </div>
  )
}