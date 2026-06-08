export default function Ticker() {
  const items = [
    {
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 17.5h7M17.5 14v7" />
        </svg>
      ),
      label: 'Business Intelligence',
    },
    {
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      label: 'Risk Management',
    },
    {
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          <path d="M19 8l2 2-2 2" />
        </svg>
      ),
      label: 'Customer Intelligence',
    },
    {
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <circle cx="4" cy="6" r="2" />
          <circle cx="20" cy="6" r="2" />
          <circle cx="4" cy="18" r="2" />
          <circle cx="20" cy="18" r="2" />
          <path d="M6 6.5l4 4M14 13.5l4 4M18 6.5l-4 4M10 13.5l-4 4" />
        </svg>
      ),
      label: 'Advanced Analytics',
    },
    {
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="6" rx="8" ry="3" />
          <path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
          <path d="M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" />
          <path d="M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" />
        </svg>
      ),
      label: 'Data Management',
    },
    {
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19V5a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v13" />
          <path d="M4 19a2 2 0 0 0 2 2h13a1 1 0 0 0 1-1v-1" />
          <path d="M8 7h8M8 11h5" />
        </svg>
      ),
      label: 'Formations Power BI & SAS',
    },
    {
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="7" r="4" />
          <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
        </svg>
      ),
      label: 'Synapse HR',
    },
    {
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="3" />
          <path d="M2 10h20" />
          <path d="M6 15h4" />
        </svg>
      ),
      label: 'Credit Squares',
    },
  ]

  return (
    <div style={{
      background: 'var(--bw-orange)',
      padding: '0.9rem 0',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{
        display: 'flex',
        gap: '2.5rem',
        animation: 'ticker 20s linear infinite',
        width: 'max-content',
      }}>
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              fontFamily: 'var(--font)',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#fff',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
            }}
          >
            <span style={{
              display: 'flex',
              alignItems: 'center',
              opacity: 0.75,
              color: '#fff',
            }}>
              {item.icon}
            </span>
            {item.label}
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem' }}>·</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}