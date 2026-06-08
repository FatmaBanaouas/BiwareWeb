// FormationModal.jsx
import { useState } from 'react'
import axios from 'axios'

export default function FormationModal({ onClose, isOpen }) {
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    type_formation: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError(false)

    // Créer FormData
    const formData = new FormData()
    formData.append('prenom', form.prenom)
    formData.append('nom', form.nom)
    formData.append('email', form.email)
    formData.append('telephone', form.telephone)
    formData.append('formation_souhaitee', form.type_formation)
    formData.append('message', form.message)

    try {
      // URL COMPLÈTE au lieu de relative
      const response = await axios.post('http://127.0.0.1:8000/api/demande-formation', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      console.log('Réponse:', response.data) // Pour déboguer
      
      if (response.data.status === 'ok') {
        setSuccess(true)
        setForm({ 
          prenom: '', 
          nom: '', 
          email: '', 
          telephone: '', 
          type_formation: '', 
          message: '' 
        })
        setTimeout(() => { 
          onClose() 
          setSuccess(false) 
        }, 2000)
      } else {
        setError(true)
      }
    } catch (err) {
      console.error('Erreur détaillée:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null


  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      animation: 'fadeIn 0.3s ease',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bw-darker)',
        border: '1px solid rgba(242,101,34,0.2)',
        borderRadius: 24,
        maxWidth: 600,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        position: 'relative',
        animation: 'slideUp 0.3s ease',
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            fontSize: '1.2rem',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(242,101,34,0.2)'
            e.currentTarget.style.color = 'var(--bw-orange)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
          }}
        >
          ✕
        </button>

        <h2 style={{
          fontFamily: 'var(--font)',
          fontSize: '1.8rem',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}>
          Demande de <span style={{ color: 'var(--bw-orange)' }}>formation</span>
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.9rem',
          marginBottom: '2rem',
        }}>
          Remplissez ce formulaire et notre équipe vous contactera sous 24h pour définir votre programme.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 500 }}>
                Prénom <span style={{ color: 'var(--bw-orange)' }}>*</span>
              </label>
              <input
                type="text"
                name="prenom"
                placeholder="Votre prénom"
                value={form.prenom}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 500 }}>
                Nom <span style={{ color: 'var(--bw-orange)' }}>*</span>
              </label>
              <input
                type="text"
                name="nom"
                placeholder="Votre nom"
                value={form.nom}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 500 }}>
              Email <span style={{ color: 'var(--bw-orange)' }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="votre@email.com"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 500 }}>
              Téléphone <span style={{ color: 'var(--bw-orange)' }}>*</span>
            </label>
            <input
              type="tel"
              name="telephone"
              placeholder="Votre numéro de téléphone"
              value={form.telephone}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 500 }}>
              Type de formation <span style={{ color: 'var(--bw-orange)' }}>*</span>
            </label>
            <select
              name="type_formation"
              value={form.type_formation}
              onChange={handleChange}
              required
              style={selectStyle}
            >
              <option value="" disabled style={{ color: '#999' }}>Sélectionnez une formation</option>
              <option value="Formation Power BI" style={{ color: '#fff', background: '#1a1a2e' }}>
                Formation Power BI
              </option>
              <option value="Formation SAS®" style={{ color: '#fff', background: '#1a1a2e' }}>
                Formation SAS®
              </option>
              <option value="Formations sur mesure" style={{ color: '#fff', background: '#1a1a2e' }}>
                Formation sur mesure
              </option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 500 }}>
              Message / Commentaires
            </label>
            <textarea
              name="message"
              placeholder="Précisez vos besoins, le nombre de participants, vos disponibilités, vos objectifs spécifiques..."
              rows="4"
              value={form.message}
              onChange={handleChange}
              style={textareaStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: '100%',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginTop: '0.5rem',
              background: 'linear-gradient(135deg, var(--bw-orange) 0%, #ff6b35 100%)',
              border: 'none',
              borderRadius: 40,
              padding: '1rem',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(242,101,34,0.4)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {loading ? 'Envoi en cours...' : 'Envoyer ma demande →'}
          </button>

          {success && (
            <p style={{
              color: '#6EE7B7',
              textAlign: 'center',
              padding: '0.75rem',
              background: 'rgba(110,231,183,0.1)',
              borderRadius: 8,
              marginTop: '1rem',
            }}>
              ✓ Votre demande a bien été envoyée ! Un expert vous contactera sous 24h.
            </p>
          )}

          {error && (
            <p style={{
              color: '#FCA5A5',
              textAlign: 'center',
              padding: '0.75rem',
              background: 'rgba(252,165,165,0.1)',
              borderRadius: 8,
              marginTop: '1rem',
            }}>
              ✗ Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
            </p>
          )}
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  padding: '0.8rem 1rem',
  color: '#fff',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  transition: 'all 0.2s',
  width: '100%',
  boxSizing: 'border-box',
}

const selectStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  padding: '0.8rem 1rem',
  color: '#fff',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  transition: 'all 0.2s',
  width: '100%',
  boxSizing: 'border-box',
  cursor: 'pointer',
}

const textareaStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  padding: '0.8rem 1rem',
  color: '#fff',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  transition: 'all 0.2s',
  width: '100%',
  boxSizing: 'border-box',
  resize: 'vertical',
}

// Ajout du style hover et focus
const addStyles = () => {
  const style = document.createElement('style')
  style.textContent = `
    input:hover, select:hover, textarea:hover {
      border-color: rgba(242,101,34,0.5) !important;
    }
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--bw-orange) !important;
      box-shadow: 0 0 0 2px rgba(242,101,34,0.2) !important;
    }
    select option {
      background: #1a1a2e;
      color: #fff;
      padding: 10px;
    }
  `
  document.head.appendChild(style)
}
addStyles()