import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Loader } from 'lucide-react'
import { useSkills } from '../hooks'

const Skills = () => {
  const { skills, loading } = useSkills()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // DEBUG: Log skills data
  React.useEffect(() => {
    console.log('🔍 Skills data:', skills)
    console.log('📊 Number of skills:', skills.length)
    if (skills.length > 0) {
      console.log('📝 First skill:', skills[0])
    }
  }, [skills])

  // Default skill colors if none specified in database
  const defaultColors = [
    'bg-green-600',
    'bg-blue-600',
    'bg-purple-600',
    'bg-red-600',
    'bg-yellow-600',
    'bg-pink-600',
    'bg-indigo-600',
    'bg-teal-600'
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0,
      scale: 0,
      rotate: -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Loader className="w-12 h-12 text-amber-900 animate-spin mx-auto" />
          <p className="mt-4 text-amber-900 font-semibold">Loading skills...</p>
        </div>
      </section>
    )
  }

  return (
    <section 
      ref={ref}
      id="skills"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100"
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
            Tech Stack 💻
          </motion.h2>
          <p className="text-lg sm:text-xl text-amber-800 max-w-2xl mx-auto">
            Technologies I work with to build amazing products
          </p>
        </motion.div>

        {/* Skills Grid */}
        {skills.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-amber-800">No skills added yet.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            {skills.map((skill) => (
              <SkillCard 
                key={skill.id} 
                skill={skill}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        )}

        {/* Skill Level Legend */}
        {skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <p className="text-sm sm:text-base text-amber-700 font-semibold mb-4">
              Proficiency Levels
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                { level: 'Beginner', range: '1-3', color: 'bg-yellow-500' },
                { level: 'Intermediate', range: '4-6', color: 'bg-blue-500' },
                { level: 'Advanced', range: '7-8', color: 'bg-purple-500' },
                { level: 'Expert', range: '9-10', color: 'bg-green-500' }
              ].map((item) => (
                <motion.div
                  key={item.level}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2"
                >
                  <div className={`w-3 h-3 ${item.color} rounded-full`} />
                  <span className="text-xs sm:text-sm text-gray-700">
                    <strong>{item.level}</strong> ({item.range})
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Individual Skill Card Component
const SkillCard = ({ skill, variants }) => {
  const [imageError, setImageError] = React.useState(false)
  
  // Determine skill level color
  const getLevelColor = (level) => {
    if (level <= 3) return 'bg-yellow-500'
    if (level <= 6) return 'bg-blue-500'
    if (level <= 8) return 'bg-purple-500'
    return 'bg-green-500'
  }

  // FIXED: Get skill color with proper fallback
  const skillColor = skill.color || 'bg-blue-600'
  
  console.log('🎨 Skill Card:', skill.name, 'Color:', skillColor)

  return (
    <motion.div
      variants={variants}
      whileHover={{ 
        scale: 1.15,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className={`${skillColor} text-white rounded-2xl p-4 sm:p-6 text-center shadow-xl border-4 border-amber-900 cursor-pointer relative overflow-hidden group`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'
        }} />
      </div>

      {/* Skill Icon/Image */}
      <div className="relative z-10">
        {skill.icon_url && !imageError ? (
          <motion.img
            src={skill.icon_url}
            alt={skill.name}
            onError={() => setImageError(true)}
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 object-contain drop-shadow-lg"
          />
        ) : (
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-4xl sm:text-5xl mb-3"
          >
            {skill.name?.charAt(0)?.toUpperCase() || '💻'}
          </motion.div>
        )}

        {/* Skill Name */}
        <p className="font-bold text-sm sm:text-base lg:text-lg mb-2 drop-shadow-md">
          {skill.name || 'Unknown Skill'}
        </p>

        {/* Skill Level Indicator */}
        {skill.level != null && (
          <div className="mt-3">
            {/* Level Bar */}
            <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden mb-1">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(skill.level / 10) * 100}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-full ${getLevelColor(skill.level)} rounded-full`}
              />
            </div>
            
            {/* Level Number */}
            <p className="text-xs font-semibold opacity-90">
              Level {skill.level}/10
            </p>
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-white/10 rounded-2xl"
      />
    </motion.div>
  )
}

export default Skills