import { useState } from 'react';
import AlBareedLogo from "../assets/Al_bareed.png"
import AlMaghribLogo from "../assets/Al_maghrib.png"
import InwiLogo from "../assets/INWI.png"
import MtnLogo from "../assets/MTN.jpg"
import SgbciLogo from "../assets/SGBCI.png"
import CieLogo from "../assets/CIE.jpeg"
import EcobankLogo from "../assets/Ecobank.jpeg"
import MoovLogo from "../assets/moov.jpeg"
import TamweelLogo from "../assets/Tamweel.png"
import AttijariwafaLogo from "../assets/Attijariwafa bank.png"
import CreditAgricoleLogo from "../assets/credit agricole.png"
import KeyrusLogo from "../assets/Keyrus.png"
import St2iLogo from "../assets/ST2i.png"
import BctLogo from "../assets/BCT.jpeg"
import FiveYLogo from "../assets/5Y.png"
import AdvansLogo from "../assets/Advans.png"
import CedLogo from "../assets/CED.png"
import SotacibEtptLogo from "../assets/SOTACIB___ETPT.png"
import SotacibFerianaLogo from "../assets/SOTACIB-Fériana.png"
import Gs2eLogo from "../assets/GS2E.jpg"
import GatLogo from "../assets/GAT.png"
import EneoCameroonLogo from "../assets/Enéo_Cameroon.png"
import AmenLogo from "../assets/amen.png"
import SunuLogo from "../assets/Sunu.png"
import OrangeLogo from "../assets/Orange.jpeg"
import OoreedoAlgerieLogo from "../assets/ooreedo_algerie.png"
import OoreedoTnLogo from "../assets/Ooredoo_TN.png"
import sasLogo from "../assets/Saas logo.png"

export default function Clients() {
  const [selectedSector, setSelectedSector] = useState('Tous');

  const clients = [
    { id: 1, name: 'Al Bareed', sector: 'Services', flag: '🌍', flagName: 'International', logo: AlBareedLogo },
    { id: 2, name: 'Al Maghrib', sector: 'Banque', flag: '🇲🇦', flagName: 'Maroc', logo: AlMaghribLogo },
    { id: 3, name: 'INWI', sector: 'Télécommunication', flag: '🇲🇦', flagName: 'Maroc', logo: InwiLogo },
    { id: 4, name: 'MTN', sector: 'Télécommunication', flag: '🌍', flagName: 'Afrique', logo: MtnLogo },
    { id: 5, name: 'SGBCI', sector: 'Banque', flag: '🇨🇮', flagName: "Côte d'Ivoire", logo: SgbciLogo },
    { id: 6, name: 'CIE', sector: 'Énergie & Utilities', flag: '🇨🇮', flagName: "Côte d'Ivoire", logo: CieLogo },
    { id: 7, name: 'Ecobank', sector: 'Banque', flag: '🌍', flagName: 'Afrique', logo: EcobankLogo },
    { id: 8, name: 'Moov', sector: 'Télécommunication', flag: '🌍', flagName: 'Afrique', logo: MoovLogo },
    { id: 9, name: 'Tamweel', sector: 'Finance & Banque', flag: '🇹🇳', flagName: 'Tunisie', logo: TamweelLogo },
    { id: 10, name: 'Attijariwafa Bank', sector: 'Banque', flag: '🇲🇦', flagName: 'Maroc', logo: AttijariwafaLogo },
    { id: 11, name: 'Crédit Agricole', sector: 'Banque', flag: '🇫🇷', flagName: 'France', logo: CreditAgricoleLogo },
    { id: 12, name: 'Keyrus', sector: 'Conseil & Tech', flag: '🇫🇷', flagName: 'France', logo: KeyrusLogo },
    { id: 13, name: 'ST2i', sector: 'Industrie', flag: '🇹🇳', flagName: 'Tunisie', logo: St2iLogo },
    { id: 14, name: 'BCT', sector: 'Banque', flag: '🇹🇳', flagName: 'Tunisie', logo: BctLogo },
    { id: 15, name: '5Y Technologies', sector: 'Tech & Logiciel', flag: '🇹🇳', flagName: 'Tunisie', logo: FiveYLogo },
    { id: 16, name: 'Advans', sector: 'Finance & Banque', flag: '🇫🇷', flagName: 'France', logo: AdvansLogo },
    { id: 17, name: 'CED', sector: 'Conseil', flag: '🇹🇳', flagName: 'Tunisie', logo: CedLogo },
    { id: 18, name: 'SOTACIB ETPT', sector: 'Industrie', flag: '🇹🇳', flagName: 'Tunisie', logo: SotacibEtptLogo },
    { id: 19, name: 'SOTACIB Fériana', sector: 'Industrie', flag: '🇹🇳', flagName: 'Tunisie', logo: SotacibFerianaLogo },
    { id: 20, name: 'GS2E', sector: 'Énergie & Utilities', flag: '🇹🇳', flagName: 'Tunisie', logo: Gs2eLogo },
    { id: 21, name: 'GAT Assurances', sector: 'Assurance', flag: '🇹🇳', flagName: 'Tunisie', logo: GatLogo },
    { id: 22, name: 'Enéo Cameroon', sector: 'Énergie & Utilities', flag: '🇨🇲', flagName: 'Cameroun', logo: EneoCameroonLogo },
    { id: 23, name: 'Amen Bank', sector: 'Banque', flag: '🇹🇳', flagName: 'Tunisie', logo: AmenLogo },
    { id: 24, name: 'Sunu', sector: 'Assurance', flag: '🌍', flagName: 'Afrique', logo: SunuLogo },
    { id: 25, name: 'Orange', sector: 'Télécommunication', flag: '🌍', flagName: 'International', logo: OrangeLogo },
    { id: 26, name: 'Ooredoo Algérie', sector: 'Télécommunication', flag: '🇩🇿', flagName: 'Algérie', logo: OoreedoAlgerieLogo },
    { id: 27, name: 'Ooredoo Tunisie', sector: 'Télécommunication', flag: '🇹🇳', flagName: 'Tunisie', logo: OoreedoTnLogo },
    { id: 28, name: 'SAS', sector: 'Tech & Logiciel', flag: '🌍', flagName: 'International', logo: sasLogo },
  ]

  // Filtrer directement sans useEffect
  const filteredClients = selectedSector === 'Tous' 
    ? clients 
    : clients.filter(client => client.sector === selectedSector)

  // Calculer les secteurs qui ont au moins un client
  const sectorsWithClients = ['Tous', ...new Set(clients.map(client => client.sector))].sort((a, b) => {
    if (a === 'Tous') return -1;
    if (b === 'Tous') return 1;
    return a.localeCompare(b);
  });

  const flagColor = (flagName) => {
    const map = {
      'Tunisie': { bg: 'rgba(5,150,105,0.15)', color: '#6EE7B7' },
      'Maroc': { bg: 'rgba(220,38,38,0.15)', color: '#FCA5A5' },
      'France': { bg: 'rgba(59,130,246,0.15)', color: '#93C5FD' },
      'Algérie': { bg: 'rgba(234,179,8,0.15)', color: '#FDE68A' },
      'Afrique': { bg: 'rgba(251,146,60,0.15)', color: '#FED7AA' },
      "Côte d'Ivoire": { bg: 'rgba(249,115,22,0.15)', color: '#FDBA74' },
      'Cameroun': { bg: 'rgba(34,197,94,0.15)', color: '#86EFAC' },
      'International': { bg: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' },
    }
    return map[flagName] || { bg: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }
  }

  return (
    <section id="clients" style={{ padding: '7rem 3rem', background: 'var(--bw-darker)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div className="reveal">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontSize: '0.68rem', color: 'var(--bw-orange)', letterSpacing: '0.14em',
            textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.85rem',
          }}>
            <span style={{ width: 20, height: 2, background: 'var(--bw-orange)', borderRadius: 1 }} />
            Références clients
          </div>
          <h2 style={{
            fontFamily: 'var(--font)', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1,
            color: '#fff', marginBottom: '1rem',
          }}>
            Ils nous font <span style={{ color: 'var(--bw-orange)' }}>confiance</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 560, fontWeight: 300 }}>
            Des institutions financières, télécoms et industrielles de premier plan en Tunisie, Afrique et Europe.
          </p>
        </div>

        {/* Secteurs filtres interactifs */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap',
          marginTop: '2.5rem', marginBottom: '2.5rem', paddingBottom: '1rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
            Filtrer par secteur :
          </div>
          {sectorsWithClients.map(sector => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.4rem 1rem',
                borderRadius: 30,
                background: selectedSector === sector 
                  ? 'var(--bw-orange)' 
                  : 'rgba(255,255,255,0.08)',
                border: selectedSector === sector 
                  ? '1px solid var(--bw-orange)' 
                  : '1px solid rgba(255,255,255,0.12)',
                color: selectedSector === sector 
                  ? '#000' 
                  : 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font)',
              }}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Compteur de résultats */}
        <div style={{
          marginBottom: '1.5rem',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.4)',
        }}>
          {filteredClients.length} client{filteredClients.length > 1 ? 's' : ''} trouvé{filteredClients.length > 1 ? 's' : ''}
        </div>

        {/* Affichage des clients */}
        {filteredClients.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            marginTop: '0rem',
          }}>
            {filteredClients.map((client) => (
              <div
                key={client.id}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  padding: '1.5rem 1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.65rem',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(242,101,34,0.4)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ 
                  width: 90, 
                  height: 70, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '0.5rem',
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: 8,
                  padding: '8px'
                }}>
                  <img
                    src={client.logo}
                    alt={client.name}
                    style={{
                      maxWidth: '100%', 
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <div style={{ fontFamily: 'var(--font)', fontSize: '0.88rem', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>
                  {client.name}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
                  {client.sector}
                </div>
                <div style={{
                  fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.55rem',
                  borderRadius: 20,
                  background: flagColor(client.flagName).bg,
                  color: flagColor(client.flagName).color,
                }}>
                  {client.flag} {client.flagName}
                </div>
              </div>
            ))}

            {/* Card CTA - Affichée dans TOUS les cas */}
            <div
              style={{
                background: 'rgba(242,101,34,0.06)',
                border: '1.5px dashed rgba(242,101,34,0.35)',
                borderRadius: 16, padding: '1.5rem 1.1rem',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '0.65rem',
                textAlign: 'center', cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(242,101,34,0.1)'
                e.currentTarget.style.borderColor = 'rgba(242,101,34,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(242,101,34,0.06)'
                e.currentTarget.style.borderColor = 'rgba(242,101,34,0.35)'
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>✦</div>
              <div style={{ fontFamily: 'var(--font)', fontSize: '0.88rem', fontWeight: 800, color: 'var(--bw-orange)' }}>
                Votre entreprise ?
              </div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
                Rejoignez nos références
              </div>
              <button 
                onClick={() => window.location.href = '#contact'}
                style={{
                  fontSize: '0.65rem', 
                  fontWeight: 700, 
                  padding: '0.3rem 0.8rem', 
                  borderRadius: 20, 
                  background: 'rgba(255,255,255,0.08)', 
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bw-orange)'
                  e.currentTarget.style.color = '#000'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                }}
              >
                Contactez-nous →
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>
              Aucun client dans ce secteur
            </div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
              D'autres secteurs pourraient vous intéresser
            </div>
            <button
              onClick={() => setSelectedSector('Tous')}
              style={{
                marginTop: '1.5rem',
                padding: '0.5rem 1.5rem',
                background: 'rgba(242,101,34,0.2)',
                border: '1px solid rgba(242,101,34,0.3)',
                borderRadius: 30,
                color: 'var(--bw-orange)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              Voir tous les clients
            </button>
          </div>
        )}

      </div>
    </section>
  )
}