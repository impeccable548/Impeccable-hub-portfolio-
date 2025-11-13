import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'
import { useScroll } from './hooks'

function App() {
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const { scrollToElement } = useScroll()

  const handleAdminClick = () => {
    setShowAdminPanel(true)
  }

  const handleContactClick = () => {
    scrollToElement('contact')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Navbar */}
      <Navbar 
        onAdminClick={handleAdminClick}
        onContactClick={handleContactClick}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Projects Section */}
        <Projects />

        {/* Skills Section */}
        <Skills />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin Panel (Modal) */}
      <AdminPanel 
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />
    </div>
  )
}

export default App