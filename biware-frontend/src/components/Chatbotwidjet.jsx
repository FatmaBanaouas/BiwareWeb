import { useState, useRef, useEffect } from 'react'


const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Biware Consulting, une société de conseil en data & analytics fondée en 2011, basée en Tunisie.

TON RÔLE : Aider les visiteurs à naviguer sur le site, comprendre les services, les produits, les formations, et les orienter vers les bonnes actions (formulaire de contact, devis, candidature, etc.).

RÉPONDS TOUJOURS en français par défaut. Si le visiteur écrit en anglais, réponds en anglais.
Sois concis, chaleureux et professionnel. Limite tes réponses à 3-4 phrases max sauf si l'utilisateur pose une question complexe.


INFORMATIONS SUR BIWARE

QUI SOMMES-NOUS ?
- Fondée en 2011 par Amine Boussarsar (DG) et Walid Kaâbachi (PDG)
- 30+ ingénieurs data, 11+ clients grands comptes, présence dans 4 pays, 14 ans d'expertise
- Partenaires : SAS® Partner, Microsoft Gold Partner
- Clients : dB.SENSE, Zitouna Capital, CDC Gestion et autres grands comptes

SECTIONS DU SITE (navigation) :
- Mission → section "mission" : présentation de l'entreprise, valeurs, fondateurs
- Clients → section "clients" : références et logos clients
- Produits → section "produits" : Synapse et Credit Squares
- Formations → section "formations" : Power BI, SAS®, formations sur mesure
- Expertises → section "expertises" : les 6 domaines de services
- Carrières → section "carrieres" : offres d'emploi et candidature spontanée
- Contact → section "contact" : formulaire de contact et devis

SERVICES (6 expertises) :
1. Business Intelligence — tableaux de bord, reporting, visualisation des données
2. Risk Management — modèles de risque de crédit, scoring, Bâle II/III
3. Customer Intelligence — segmentation client, valeur vie client, comportements
4. Advanced Analytics — machine learning, data science, modèles prédictifs
5. Data Management — gouvernance des données, data quality, MDM
6. Formations — Power BI, SAS®, formations sur mesure en entreprise

PRODUITS :
→ SYNAPSE (teal #00A89C)
  - Solution RH intelligente by Biware
  - Gestion des talents, recrutement automatisé, analytics RH
  - Voir sur LinkedIn : https://www.linkedin.com/products/biware-consulting-synapse/

→ CREDIT SQUARES (or #F5A623)
  - Solution de scoring et risk management crédit
  - Modèles de crédit avancés, tableaux de bord risque
  - Voir sur LinkedIn : https://www.linkedin.com/products/biware-consulting-credit-squares/

FORMATIONS :
1. Formation Power BI — visualisation, dashboards, rapports interactifs
2. Formation SAS® — analyse statistique, data mining, reporting SAS
3. Formations sur mesure — programmes personnalisés selon les besoins de l'entreprise
→ Pour s'inscrire : cliquer sur "Je veux me former" dans la section Formations

CARRIÈRES :
- Offres d'emploi visibles dans la section "Carrières" (CDI, stages, etc.)
- Candidature spontanée disponible : page /candidature-spontanee
- Domaines : BI, Data Engineering, Data Science, Risk, Customer, Analytics, Data Management, Power BI, SAS, Stage, Alternance

CONTACT & DEVIS :
- Formulaire de contact : bouton "Nous contacter" ou section Contact
- Demande de devis : bouton "Demander un devis" (navbar ou section Contact)
- Email : visible dans le footer
- Téléphone : visible dans le footer
- Adresse : visible dans le footer
- LinkedIn : https://www.linkedin.com/company/biware-consulting/
- Facebook : https://www.facebook.com/biwareconsulting


COMMENT AIDER LES VISITEURS


Si quelqu'un cherche :
- À en savoir plus sur Biware → redirige vers section "mission"
- Un service data/BI/risk → explique l'expertise et redirige vers section "expertises"
- Un produit logiciel → parle de Synapse ou Credit Squares selon le besoin
- Une formation → explique les 3 options et invite à cliquer sur "Je veux me former"
- Un emploi → redirige vers section "carrieres" ou /candidature-spontanee
- À contacter Biware → redirige vers le formulaire contact ou devis
- À naviguer sur le site → explique la structure de navigation

IMPORTANT : Tu ne fais pas de promesses commerciales, tu ne donnes pas de prix, tu ne fournis pas d'informations confidentielles. Si une question dépasse tes connaissances, invite poliment le visiteur à contacter directement l'équipe Biware.`

const QUICK_QUESTIONS = [
  'Quels sont vos services ?',
  'Comment postuler ?',
  'Parlez-moi de Synapse',
  'Formations disponibles ?',
]

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Bonjour,je suis l'assistant Biware. Comment puis-je vous aider aujourd'hui ?",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setHasNewMessage(false)
    }
  }, [isOpen])

const sendMessage = async (text) => {
  const userText = text || input.trim()
  if (!userText || loading) return

  setInput('')
  const newMessages = [...messages, { role: 'user', content: userText }]
  setMessages(newMessages)
  setLoading(true)

  try {

    const response = await fetch('http://localhost:8000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    })

    const data = await response.json()
    const reply = data.reply || "Je n'ai pas pu obtenir de réponse."

    setMessages((prev) => [...prev, { role: 'assistant', content: reply }])

    if (!isOpen) setHasNewMessage(true)
  } catch (error) {
    console.error('Erreur:', error)
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: "Une erreur s'est produite. Veuillez réessayer ou contacter directement notre équipe.",
      },
    ])
  } finally {
    setLoading(false)
  }
}
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Bonjour, je suis l'assistant Biware. Comment puis-je vous aider aujourd'hui ?",
      },
    ])
    setInput('')
  }

  return (
    <>
     
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '1.5rem',
            width: 360,
            maxHeight: '75vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#111112',
            border: '1px solid rgba(242,101,34,0.25)',
            borderRadius: 20,
            boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(242,101,34,0.08)',
            zIndex: 9990,
            overflow: 'hidden',
            animation: 'chatSlideUp 0.25s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
     
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, rgba(242,101,34,0.15) 0%, rgba(242,101,34,0.05) 100%)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
   
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--bw-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
           
              <span
                style={{
                  position: 'absolute',
                  bottom: 1,
                  right: 1,
                  width: 9,
                  height: 9,
                  background: '#22c55e',
                  borderRadius: '50%',
                  border: '2px solid #111112',
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                Assistant Biware
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>
                Répond instantanément
              </div>
            </div>

         
            <button
              onClick={resetChat}
              title="Réinitialiser la conversation"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>

          
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

       
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(242,101,34,0.3) transparent',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'msgFadeIn 0.2s ease',
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '0.65rem 0.9rem',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background:
                      msg.role === 'user'
                        ? 'var(--bw-orange)'
                        : 'rgba(255,255,255,0.06)',
                    color: '#fff',
                    fontSize: '0.83rem',
                    lineHeight: 1.55,
                    border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'msgFadeIn 0.2s ease' }}>
                <div
                  style={{
                    padding: '0.65rem 1rem',
                    borderRadius: '16px 16px 16px 4px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'rgba(242,101,34,0.7)',
                        animation: `typingDot 1.2s ${d * 0.2}s ease-in-out infinite`,
                        display: 'block',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && (
            <div
              style={{
                padding: '0 1rem 0.75rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
              }}
            >
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    background: 'rgba(242,101,34,0.1)',
                    border: '1px solid rgba(242,101,34,0.25)',
                    borderRadius: 20,
                    padding: '0.3rem 0.75rem',
                    color: 'var(--bw-orange)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(242,101,34,0.2)'
                    e.currentTarget.style.borderColor = 'var(--bw-orange)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(242,101,34,0.1)'
                    e.currentTarget.style.borderColor = 'rgba(242,101,34,0.25)'
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

         
          <div
            style={{
              padding: '0.75rem 1rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'flex-end',
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question..."
              rows={1}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                padding: '0.6rem 0.85rem',
                color: '#fff',
                fontSize: '0.83rem',
                fontFamily: 'inherit',
                resize: 'none',
                outline: 'none',
                lineHeight: 1.5,
                maxHeight: 80,
                overflowY: 'auto',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(242,101,34,0.5)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: input.trim() && !loading ? 'var(--bw-orange)' : 'rgba(255,255,255,0.08)',
                border: 'none',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>

         
          <div
            style={{
              padding: '0.4rem',
              textAlign: 'center',
              fontSize: '0.62rem',
              color: 'rgba(255,255,255,0.18)',
              borderTop: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            Propulsé par Biware AI · Les réponses peuvent être inexactes
          </div>
        </div>
      )}

     
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: isOpen
            ? 'rgba(255,255,255,0.1)'
            : 'var(--bw-orange)',
          border: isOpen ? '1px solid rgba(255,255,255,0.15)' : 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isOpen
            ? 'none'
            : '0 8px 28px rgba(242,101,34,0.45)',
          zIndex: 9991,
          transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
          transform: isOpen ? 'scale(0.95)' : 'scale(1)',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.currentTarget.style.transform = 'scale(1.08)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = isOpen ? 'scale(0.95)' : 'scale(1)'
        }}
      >
        
        {hasNewMessage && !isOpen && (
          <span
            style={{
              position: 'absolute',
              top: 2,
              right: 2,
              width: 12,
              height: 12,
              background: '#22c55e',
              borderRadius: '50%',
              border: '2px solid var(--bw-darker)',
              animation: 'pulseBadge 1.5s ease-in-out infinite',
            }}
          />
        )}

        
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

     
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes msgFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingDot {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%       { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes pulseBadge {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }
        @media (max-width: 480px) {
          /* Full-width on small phones */
          .biware-chat-window {
            right: 0.75rem !important;
            left: 0.75rem !important;
            width: auto !important;
            bottom: 5rem !important;
          }
        }
      `}</style>
    </>
  )
}