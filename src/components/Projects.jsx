import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Loader } from 'lucide-react'
import { useProjects } from '../hooks'

const Projects = () => {
  const { projects, loading } = useProjects()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-7xl mx-auto text-center">
          <Loader className="w-12 h-12 text-amber-900 animate-spin mx-auto" />
          <p className="mt-4 text-amber-900 font-semibold">Loading projects...</p>
        </div>
      </section>
    )
  }

  return (
    <section 
      ref={ref}
      id="projects"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-100 to-orange-100"
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
            Featured Projects 🚀
          </motion.h2>
          <p className="text-lg sm:text-xl text-amber-800 max-w-2xl mx-auto">
            Check out some of my recent work and live projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-amber-800">No projects yet. Check back soon!</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Individual Project Card Component
const ProjectCard = ({ project, variants }) => {
  const [imageError, setImageError] = React.useState(false)
  
  return (
    <motion.div
      variants={variants}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-amber-700 group cursor-pointer"
    >
      {/* Project Image */}
      {project.image_url && !imageError ? (
        <div className="relative h-48 sm:h-56 overflow-hidden bg-amber-100">
          <motion.img
            src={project.image_url}
            alt={project.title}
            onError={() => setImageError(true)}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : (
        <div className="h-48 sm:h-56 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
          <span className="text-6xl sm:text-7xl">
            {project.icon || '🚀'}
          </span>
        </div>
      )}

      {/* Project Content */}
      <div className="p-6">
        {/* Project Icon (if no image) */}
        {!project.image_url && project.icon && (
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-5xl sm:text-6xl mb-4"
          >
            {project.icon}
          </motion.div>
        )}

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-3 line-clamp-2">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-gray-700 mb-4 line-clamp-3 text-sm sm:text-base">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech_stack.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="text-xs sm:text-sm text-amber-700 font-semibold bg-amber-100 px-3 py-1 rounded-full"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}

        {/* Live Demo Link */}
        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-white bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base shadow-lg"
          >
            View Live Demo 
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        )}
      </div>

      {/* Decorative Corner */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-0 right-0 w-16 h-16 bg-amber-600 rounded-bl-full opacity-20"
      />
    </motion.div>
  )
}

export default Projects