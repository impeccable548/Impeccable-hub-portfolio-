import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Mail, MessageCircle, Github, Linkedin, Twitter, ArrowUp } from 'lucide-react'
import { useScroll } from '../hooks'

const Footer = () => {
  const { scrollToTop } = useScroll()
  
  // Get credentials from environment
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER
  const email = import.meta.env.VITE_EMAIL

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/yourusername', 
      label: 'GitHub',
      color: 'hover:bg-gray-700'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/in/yourusername', 
      label: 'LinkedIn',
      color: 'hover:bg-blue-600'
    },
    { 
      icon: Twitter, 
      href: 'https://twitter.com/yourusername', 
      label: 'Twitter',
      color: 'hover:bg-sky-500'
    }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-amber-900 to-amber-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 sm:gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 comic-font text-amber-100">
              Providence
            </h3>
            <p className="text-amber-200 mb-4 text-sm sm:text-base leading-relaxed">
              Full Stack Developer & Web3 Enthusiast building innovative solutions for the future.
            </p>
            <p className="text-amber-300 text-xs sm:text-sm">
              📍 Benin City, Nigeria 🇳🇬
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-4 text-amber-100">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Projects', href: '#projects' },
                { label: 'Skills', href: '#skills' },
                { label: 'Contact', href: '#contact' }
              ].map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-amber-200 hover:text-amber-100 transition-colors text-sm sm:text-base inline-block"
                  >
                    → {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-xl font-bold mb-4 text-amber-100">Get In Touch</h4>
            <div className="space-y-3">
              <motion.a
                href={`mailto:${email}`}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 text-amber-200 hover:text-amber-100 transition-colors text-sm sm:text-base"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="break-all">{email}</span>
              </motion.a>
              
              <motion.a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 text-amber-200 hover:text-amber-100 transition-colors text-sm sm:text-base"
              >
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                <span>WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center gap-4 mb-8 pb-8 border-b border-amber-700"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`bg-amber-800 ${social.color} text-white p-3 sm:p-4 rounded-full shadow-lg transition-colors`}
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 text-amber-200 text-sm"
        >
          <p className="flex items-center gap-2 text-center sm:text-left">
            © {currentYear} Providence. Built with 
            <Heart className="w-4 h-4 text-red-400 animate-pulse" /> 
            React & Supabase
          </p>
          
          <div className="flex items-center gap-4">
            <span className="text-xs">Made with 🔥 in Nigeria</span>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-amber-700 hover:bg-amber-600 p-2 rounded-full transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600" />
    </footer>
  )
}

export default Footer