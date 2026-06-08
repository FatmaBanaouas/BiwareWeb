import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Mission from './components/Mission'
import Clients from './components/Clients'
import Products from './components/Products'
import Formations from './components/Formations'
import Services from './components/Services'
import Numbers from './components/Numbers'
import Cta from './components/Cta'
import Footer from './components/Footer'
import QuoteForm from './components/QuoteForm'
import JobsSection from './components/JobsSection'
import JobDetailPage from './pages/JobDetailPage'
import CandidatureSpontanee from './components/CandidatureSpontanee';

// Composant pour la page d'accueil
function HomePage({ onOpenQuote, onOpenContact }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Cursor />
      <Navbar onOpenQuote={onOpenQuote} />
      <Hero />
      <Ticker />
      <Mission />
      <Clients />
      <Products />
      <Formations />
      <Services />
      <Numbers />
      <JobsSection />
      <Cta
        onOpenQuote={onOpenQuote}
        onOpenContact={onOpenContact}
      />
      <Footer />
    </>
  )
}

function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const location = useLocation()

  // Si on est sur une page de candidature, on ne montre pas les modals
  const isJobPage = location.pathname.startsWith('/postuler')

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              onOpenQuote={() => setIsQuoteOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
            />
          } 
        />
        <Route path="/postuler/:jobId" element={<JobDetailPage />} />
        <Route path="/candidature-spontanee" element={<CandidatureSpontanee />} />
      </Routes>
      
      {/* Modals - uniquement sur la page d'accueil */}
      {!isJobPage && (
        <>
          <QuoteForm isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
          <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
      )}
    </>
  )
}

export default App