import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code, Rocket, Brain, Github, Linkedin, Twitter } from 'lucide-react'
import { useScroll } from '../hooks'
import { storage } from '../lib/supabase'

const Hero = () => {
  const { scrollY } = useScroll()
  const [typedText, setTypedText] = useState('')
  const fullText = "Full Stack Developer | Web3 Enthusiast | Building the Future"
  const aboutRef = React.useRef(null)
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
  
  const profilePhotoUrl = storage.getPublicUrl('uploads', 'profile/providence-dp.jpg')

  // Typing animation
  useEffect(() => {
    let i = 0
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typing)
      }
    }, 50)
    return () => clearInterval(typing)
  }, [])

  // Parallax effect
  const parallaxY = scrollY * 0.3

  // Floating cards data
  const cards = [
    { icon: Code, label: 'Tech Lover', delay: 0 },
    { icon: Rocket, label: 'Web3 Builder', delay: 0.2 },
    { icon: Brain, label: 'Problem Solver', delay: 0.4 }
  ]

  // Background floating elements
  const floatingElements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 40,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: i * 0.3
  }))

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100" />

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 4,
              delay: el.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bg-amber-300/20 rounded-full blur-xl"
            style={{
              width: el.size,
              height: el.size,
              left: el.left,
              top: el.top
            }}
          />
        ))}
      </div>

      {/* Main Hero Content */}
      <motion.div
        style={{ transform: `translateY(${parallaxY}px)` }}
        className="text-center z-10 max-w-5xl mx-auto w-full"
      >
        {/* Profile Photo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="mb-8 flex justify-center"
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <img 
              src={profilePhotoUrl}
              alt="Providence"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-8 border-amber-700 shadow-2xl object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-2xl animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-amber-900 mb-6 comic-font"
        >
          <motion.span
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Hi, I'm Providence 👋
          </motion.span>
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl text-amber-800 mb-12 h-20 flex items-center justify-center"
        >
          <span className="font-semibold">
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-amber-600"
            >
              |
            </motion.span>
          </span>
        </motion.div>

        {/* Feature Cards */}
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center mb-12">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.8 + card.delay 
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 }
              }}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-2 border-amber-600 cursor-pointer"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: card.delay,
                  ease: "easeInOut"
                }}
              >
                <card.icon className="w-8 h-8 sm:w-10 sm:h-10 text-amber-700 mx-auto mb-2" />
              </motion.div>
              <p className="font-semibold text-amber-900 text-sm sm:text-base">
                {card.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex gap-4 justify-center"
        >
          {[
            { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
            { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-amber-700 hover:bg-amber-800 text-white p-3 sm:p-4 rounded-full shadow-lg transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-12 sm:mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-amber-700"
          >
            <div className="w-6 h-10 border-2 border-amber-700 rounded-full mx-auto flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1 h-3 bg-amber-700 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* About Me Section - Now positioned right below hero */}
      <motion.div
        ref={aboutRef}
        initial={{ opacity: 0, y: 50 }}
        animate={aboutInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto mt-16 sm:mt-20 px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={aboutInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border-4 border-amber-700"
        >
          {/* About Me Header */}
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-4 sm:mb-6 comic-font flex items-center gap-2 sm:gap-3"
          >
            <span className="text-3xl sm:text-4xl">👨‍💻</span>
            About Me
          </motion.h3>

          {/* About Me Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={aboutInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              I'm a passionate <strong className="text-amber-800">Full Stack Developer</strong> and <strong className="text-amber-800">Web3 enthusiast</strong> currently studying Computer Science at the University of Benin. I specialize in building modern, scalable applications that solve real-world problems.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              With experience working on <strong className="text-amber-800">4+ startup projects</strong> and <strong className="text-amber-800">SaaS applications</strong>, I've helped clients bring their visions to life through clean code and innovative solutions. My expertise spans both traditional web development and cutting-edge blockchain technologies.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              I love working with technologies like <strong className="text-amber-800">React, Django, Flask, and Solidity</strong> to create seamless user experiences and robust backend systems. Whether it's a DeFi platform, NFT marketplace, or enterprise SaaS solution, I'm always excited to tackle new challenges!
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-amber-800 font-semibold italic text-base sm:text-lg"
            >
              "Building the future, one line of code at a time." 💻✨
            </motion.p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-amber-300"
          >
            {[
              { number: "4+", label: "Startups" },
              { number: "10+", label: "Projects" },
              { number: "100%", label: "Dedication" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={aboutInView ? { scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.1 + (index * 0.1),
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-900 comic-font">
                  {stat.number}
                </p>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero