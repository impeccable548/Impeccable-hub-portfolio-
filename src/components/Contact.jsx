import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Mail, MessageCircle, CheckCircle, Loader, MapPin, Phone } from 'lucide-react'
import { useContact } from '../hooks'

const Contact = () => {
  const { submitMessage, submitting } = useContact()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formSuccess, setFormSuccess] = useState(false)

  // Get credentials from environment
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER
  const email = import.meta.env.VITE_EMAIL

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const { data, error } = await submitMessage(formData)
    
    if (!error) {
      setFormSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormSuccess(false)
      }, 5000)
    }
  }

  return (
    <section 
      ref={ref}
      id="contact"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-100 to-amber-100"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            animate={isInView ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-900 mb-4 comic-font"
          >
            Get In Touch 📬
          </motion.h2>
          <p className="text-lg sm:text-xl text-amber-800 max-w-2xl mx-auto">
            Have a project in mind? Let's work together and build something amazing!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-4 border-amber-700">
              <h3 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <Mail className="w-6 h-6 sm:w-7 sm:h-7" />
                Send a Message
              </h3>

              {formSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-green-100 border-2 border-green-400 rounded-lg flex items-center gap-3 text-green-700"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="font-semibold text-sm sm:text-base">
                    Message sent successfully! I'll get back to you soon. 🎉
                  </p>
                </motion.div>
              )}

              <div className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-amber-900 font-bold mb-2 text-sm sm:text-base">
                    Your Name *
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:border-amber-600 focus:outline-none transition-colors text-gray-800"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-amber-900 font-bold mb-2 text-sm sm:text-base">
                    Your Email *
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:border-amber-600 focus:outline-none transition-colors text-gray-800"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-amber-900 font-bold mb-2 text-sm sm:text-base">
                    Your Message *
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:border-amber-600 focus:outline-none resize-none transition-colors text-gray-800"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.05 }}
                  whileTap={{ scale: submitting ? 1 : 0.95 }}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-base sm:text-lg"
                >
                  {submitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Contact Info & Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              {/* WhatsApp */}
              <motion.a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="block bg-green-500 hover:bg-green-600 text-white p-6 rounded-2xl shadow-xl transition-all border-4 border-green-700"
              >
                <div className="flex items-center gap-4">
                  <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12" />
                  <div>
                    <p className="font-bold text-lg sm:text-xl mb-1">WhatsApp</p>
                    <p className="text-sm sm:text-base opacity-90">Chat with me instantly</p>
                    <p className="text-xs sm:text-sm mt-1 font-mono">{whatsappNumber}</p>
                  </div>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href={`mailto:${email}`}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="block bg-amber-600 hover:bg-amber-700 text-white p-6 rounded-2xl shadow-xl transition-all border-4 border-amber-800"
              >
                <div className="flex items-center gap-4">
                  <Mail className="w-10 h-10 sm:w-12 sm:h-12" />
                  <div>
                    <p className="font-bold text-lg sm:text-xl mb-1">Email</p>
                    <p className="text-sm sm:text-base opacity-90">Send me an email</p>
                    <p className="text-xs sm:text-sm mt-1 break-all">{email}</p>
                  </div>
                </div>
              </motion.a>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white p-6 rounded-2xl shadow-xl border-4 border-amber-700"
              >
                <div className="flex items-center gap-4 text-amber-900">
                  <MapPin className="w-10 h-10 sm:w-12 sm:h-12" />
                  <div>
                    <p className="font-bold text-lg sm:text-xl mb-1">Location</p>
                    <p className="text-sm sm:text-base">Benin City, Nigeria 🇳🇬</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">Available for remote work worldwide</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-br from-amber-600 to-orange-600 text-white p-6 sm:p-8 rounded-2xl shadow-xl border-4 border-amber-800"
            >
              <h4 className="text-xl sm:text-2xl font-bold mb-3 comic-font">
                Let's Build Together! 🚀
              </h4>
              <p className="text-sm sm:text-base opacity-90 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether it's a startup, SaaS, or Web3 project - let's make it happen!
              </p>
              <div className="mt-4 pt-4 border-t-2 border-white/30">
                <p className="text-xs sm:text-sm font-semibold">⚡ Fast Response Time</p>
                <p className="text-xs sm:text-sm font-semibold">💼 Professional Service</p>
                <p className="text-xs sm:text-sm font-semibold">🎯 Results-Driven</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact