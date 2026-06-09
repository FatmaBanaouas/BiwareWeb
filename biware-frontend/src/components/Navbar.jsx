import { useState, useEffect } from 'react'
import biwareLogo from "../assets/logo_facebook_2.png";

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '0.8rem 3rem' : '1.1rem 3rem',
        background: scrolled ? 'rgba(17,17,18,0.97)' : 'rgba(17,17,18,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--bw-border)',
        transition: 'all 0.3s',
      }}
    >
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); scrollTo('hero') }}
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <img
          src={biwareLogo}
          alt="Biware"
          style={{
            height: '40px',
            width: 'auto',
            transition: 'height 0.3s',
          }}
        />
      </a>

      <ul style={{
        display: 'flex',
        gap: '2rem',
        listStyle: 'none',
        '@media (max-width: 900px)': { display: 'none' },
      }}>
        {['mission', 'clients', 'produits', 'formations', 'expertises','carrieres', 'contact'].map(item => (
          <li key={item}>
            <a
              href={`#${item}`}
              onClick={(e) => { e.preventDefault(); scrollTo(item) }}
              style={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                fontWeight: 500,
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
                position: 'relative',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span style={{
                position: 'absolute',
                bottom: -3,
                left: 0,
                width: 0,
                height: 1.5,
                background: 'var(--bw-orange)',
                transition: 'width 0.25s var(--ease)',
              }} />
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <a
          href="https://www.linkedin.com/company/biware-consulting/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: '1px solid var(--bw-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.4)',
            fontSize: 12,
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--bw-orange)'; e.currentTarget.style.color = 'var(--bw-orange)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--bw-border)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
        >
          in
        </a>
        <a
          href="https://www.facebook.com/biwareconsulting"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: '1px solid var(--bw-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.4)',
            fontSize: 12,
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--bw-orange)'; e.currentTarget.style.color = 'var(--bw-orange)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--bw-border)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
        >
          f
        </a>
        <button
          className="btn-nav"
          onClick={onOpenQuote}
          style={{
            background: 'var(--bw-orange)',
            color: '#fff',
            fontFamily: 'var(--font)',
            fontSize: '0.8rem',
            fontWeight: 700,
            padding: '0.55rem 1.3rem',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.03em',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
        >
          Demander un devis
        </button>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(242,101,34,0.4); }
          50% { transform: scale(1.15); box-shadow: 0 0 0 6px rgba(242,101,34,0); }
        }
        .btn-nav:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(242,101,34,0.35);
        }
        @media (max-width: 900px) {
          nav { padding: 1rem 1.5rem; }
          nav ul { display: none; }
        }
      `}</style>
    </nav>
  )
}