import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Loader } from 'lucide-react'
import { useSkills } from '../hooks'

const Skills = () => {
  const { skills, loading } = useSkills()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  React.useEffect(() => {
    console.log('Skills data:', skills)
    console.log('Skills count:', skills?.length)
  }, [skills])

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
        {/* Header fix */}
        <motion.div
          initial={{ opacity: 1, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-700 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-900 mb-4 comic-font">
            Tech Stack 💻
          </h2>
          <p className="text-lg sm:text-xl text-amber-900 font-semibold">
            Technologies I work with to build amazing products
          </p>
        </motion.div>

        {!skills || skills.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-amber-800">No skills added yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>

            {/* Proficiency Legend fix */}
            <motion.div
              initial={{ opacity: 1, y: 30 }}  // 🔹 changed from 0 → 1
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 sm:mt-16 text-center"
            >
              <p className="text-sm sm:text-base text-amber-700 font-semibold mb-4">
                Proficiency Levels
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-xs sm:text-sm text-gray-700">
                    <strong>Beginner</strong> (1-3)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-xs sm:text-sm text-gray-700">
                    <strong>Intermediate</strong> (4-6)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <span className="text-xs sm:text-sm text-gray-700">
                    <strong>Advanced</strong> (7-8)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-xs sm:text-sm text-gray-700">
                    <strong>Expert</strong> (9-10)
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}

const SkillCard = ({ skill }) => {
  const [imageError, setImageError] = React.useState(false)
  const cardColor = skill?.color || 'bg-blue-600'
  const skillLevel = skill?.level || 5
  const skillName = skill?.name || 'Skill'

  console.log('🎨 Card:', skillName, '| Color:', cardColor, '| Level:', skillLevel)

  return (
    <div className={`${cardColor} text-white rounded-2xl p-4 sm:p-6 text-center shadow-2xl border-4 border-white relative`}>
      <div className="mb-3">
        {skill?.icon_url && !imageError ? (
          <img
            src={skill.icon_url}
            alt={skillName}
            onError={() => setImageError(true)}
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto object-contain drop-shadow-lg"
          />
        ) : (
          <div className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
            {skillName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <p className="font-bold text-sm sm:text-base lg:text-lg mb-2 text-white drop-shadow-md">
        {skillName}
      </p>

      <div className="w-full bg-white/30 rounded-full h-2 mb-1">
        <div 
          className="bg-white h-2 rounded-full shadow-md"
          style={{ width: `${(skillLevel / 10) * 100}%` }}
        />
      </div>

      <p className="text-xs font-semibold text-white drop-shadow-sm">
        Level {skillLevel}/10
      </p>
    </div>
  )
}

export default Skills