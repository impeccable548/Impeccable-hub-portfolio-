import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Menu, X, FileDown } from 'lucide-react'
import { useScroll, useAdmin } from '../hooks'
import { storage } from '../lib/supabase'

const Navbar = ({ onAdminClick, onContactClick }) => {
  const { scrollY, scrollToTop } = useScroll()
  const { isAdmin, logout } = useAdmin()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Navbar background changes on scroll
  const navBg = scrollY > 50 ? 'bg-amber-900/95 backdrop-blur-md shadow-lg' : 'bg-amber-900/90'

  const resumeUrl = storage.getPublicUrl('uploads', 'resume/providence-resume.pdf')

  const handleLogoClick = () => {
    scrollToTop()
    setMobileMenuOpen(false)
  }

  const handleNavClick = (action) => {
    action()
    setMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 border-b-4 border-amber-700 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.button
            onClick={handleLogoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl md:text-3xl font-bold text-amber-100 tracking-tight comic-font focus:outline-none"
          >
            Providence
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {/* Resume Download */}
            <motion.a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg flex items-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              Resume
            </motion.a>

            {/* Admin Button */}
            <motion.button
              onClick={onAdminClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${
                isAdmin 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg flex items-center gap-2`}
            >
              <Lock className="w-4 h-4" />
              {isAdmin ? 'Dashboard' : 'Admin'}
            </motion.button>

            {/* Logout Button (if admin) */}
            {isAdmin && (
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg"
              >
                Logout
              </motion.button>
            )}

            {/* Contact Button */}
            <motion.button
              onClick={onContactClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg"
            >
              Contact
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-amber-100 p-2 rounded-lg hover:bg-amber-800 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-amber-800 border-t-2 border-amber-700"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Resume Download */}
              <motion.a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-semibold text-center transition-all shadow-lg"
              >
                <FileDown className="w-4 h-4 inline mr-2" />
                Download Resume
              </motion.a>

              {/* Admin Button */}
              <motion.button
                onClick={() => handleNavClick(onAdminClick)}
                whileTap={{ scale: 0.95 }}
                className={`w-full ${
                  isAdmin 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg flex items-center justify-center gap-2`}
              >
                <Lock className="w-4 h-4" />
                {isAdmin ? 'Dashboard' : 'Admin Login'}
              </motion.button>

              {/* Logout Button (if admin) */}
              {isAdmin && (
                <motion.button
                  onClick={() => handleNavClick(logout)}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg"
                >
                  Logout
                </motion.button>
              )}

              {/* Contact Button */}
              <motion.button
                onClick={() => handleNavClick(onContactClick)}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg"
              >
                Contact Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar