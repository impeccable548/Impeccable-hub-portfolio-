import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Lock, LogOut, Plus, Edit, Trash2, X, Upload, 
  Image as ImageIcon, Save, Loader, Eye, EyeOff,
  Mail, MessageSquare, ExternalLink
} from 'lucide-react'
import { useAdmin, useProjects, useSkills, useContact } from '../hooks'
import { storage } from '../lib/supabase'
import toast from 'react-hot-toast'

const AdminPanel = ({ isOpen, onClose }) => {
  const { isAdmin, login, logout, loading: authLoading } = useAdmin()
  const { 
    projects, 
    addProject, 
    updateProject, 
    deleteProject, 
    uploadProjectImage 
  } = useProjects()
  const { 
    skills, 
    addSkill, 
    updateSkill, 
    deleteSkill, 
    uploadSkillIcon 
  } = useSkills()
  const { messages, fetchMessages } = useContact()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('projects')
  const [editingItem, setEditingItem] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Fetch messages when admin panel opens and user is admin
  useEffect(() => {
    if (isOpen && isAdmin) {
      fetchMessages()
    }
  }, [isOpen, isAdmin])

  const handleLogin = async (e) => {
    e.preventDefault()
    const { success } = await login(email, password)
    if (success) {
      setEmail('')
      setPassword('')
    }
  }

  const handleLogout = async () => {
    await logout()
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-amber-50 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border-4 border-purple-800 my-8"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 sm:p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white comic-font">
                  Admin Dashboard
                </h2>
                {isAdmin && (
                  <p className="text-purple-200 text-sm">Welcome back, Providence! 👋</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAdmin && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm sm:text-base"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-white hover:bg-purple-700 p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            {!isAdmin ? (
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                handleLogin={handleLogin}
                authLoading={authLoading}
              />
            ) : (
              <AdminContent
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                projects={projects}
                skills={skills}
                messages={messages}
                addProject={addProject}
                updateProject={updateProject}
                deleteProject={deleteProject}
                uploadProjectImage={uploadProjectImage}
                addSkill={addSkill}
                updateSkill={updateSkill}
                deleteSkill={deleteSkill}
                uploadSkillIcon={uploadSkillIcon}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                showAddForm={showAddForm}
                setShowAddForm={setShowAddForm}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Login Form Component
const LoginForm = ({ email, setEmail, password, setPassword, showPassword, setShowPassword, handleLogin, authLoading }) => (
  <div className="p-6 sm:p-12 text-center max-w-md mx-auto">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Lock className="w-16 h-16 sm:w-20 sm:h-20 text-purple-600 mx-auto mb-6" />
    </motion.div>
    
    <h3 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-4 comic-font">
      Admin Login
    </h3>
    <p className="text-gray-600 mb-8">Enter your credentials to access the dashboard</p>
    
    <div className="space-y-4">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-600 focus:outline-none text-lg"
          autoFocus
        />
      </div>
      
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
          placeholder="Password"
          className="w-full px-4 py-3 pr-12 border-2 border-purple-300 rounded-lg focus:border-purple-600 focus:outline-none text-lg"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogin}
        disabled={authLoading || !email || !password}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2"
      >
        {authLoading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            Sign In
          </>
        )}
      </motion.button>
    </div>
    
    <div className="mt-6 p-4 bg-purple-100 rounded-lg border-2 border-purple-300">
      <p className="text-xs text-gray-600 mb-2">
        🔒 <strong>Secure Supabase Authentication</strong>
      </p>
      <p className="text-xs text-gray-500">
        Your credentials are verified through Supabase's secure authentication system.
      </p>
    </div>
  </div>
)

// Admin Content Component
const AdminContent = ({
  activeTab,
  setActiveTab,
  projects,
  skills,
  messages,
  addProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
  addSkill,
  updateSkill,
  deleteSkill,
  uploadSkillIcon,
  editingItem,
  setEditingItem,
  showAddForm,
  setShowAddForm
}) => {
  const tabs = [
    { id: 'projects', label: 'Projects', count: projects.length },
    { id: 'skills', label: 'Skills', count: skills.length },
    { id: 'messages', label: 'Messages', count: messages.length },
    { id: 'settings', label: 'Settings', count: 0 }
  ]

  return (
    <div className="p-4 sm:p-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b-2 border-purple-200 pb-4">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveTab(tab.id)
              setShowAddForm(false)
              setEditingItem(null)
            }}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold transition-all text-sm sm:text-base ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-purple-900 hover:bg-purple-100'
            }`}
          >
            {tab.label} 
            <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
              {tab.count}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'projects' && (
        <ProjectsTab
          projects={projects}
          addProject={addProject}
          updateProject={updateProject}
          deleteProject={deleteProject}
          uploadProjectImage={uploadProjectImage}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
        />
      )}

      {activeTab === 'skills' && (
        <SkillsTab
          skills={skills}
          addSkill={addSkill}
          updateSkill={updateSkill}
          deleteSkill={deleteSkill}
          uploadSkillIcon={uploadSkillIcon}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
        />
      )}

      {activeTab === 'messages' && (
        <MessagesTab messages={messages} />
      )}

      {activeTab === 'settings' && (
        <SettingsTab />
      )}
    </div>
  )
}

// Projects Tab Component
const ProjectsTab = ({
  projects,
  addProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
  editingItem,
  setEditingItem,
  showAddForm,
  setShowAddForm
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    link: '',
    icon: '',
    image_url: ''
  })
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e, projectId = null) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    const { url } = await uploadProjectImage(file, projectId)
    if (url) {
      setFormData({ ...formData, image_url: url })
    }
    setUploading(false)
  }

  const handleSubmit = async () => {
    const projectData = {
      ...formData,
      tech_stack: formData.tech_stack.split(',').map(t => t.trim()).filter(Boolean)
    }

    if (editingItem) {
      await updateProject(editingItem.id, projectData)
      setEditingItem(null)
    } else {
      await addProject(projectData)
      setShowAddForm(false)
    }

    setFormData({
      title: '',
      description: '',
      tech_stack: '',
      link: '',
      icon: '',
      image_url: ''
    })
  }

  const handleEdit = (project) => {
    setEditingItem(project)
    setFormData({
      title: project.title,
      description: project.description,
      tech_stack: project.tech_stack?.join(', ') || '',
      link: project.link || '',
      icon: project.icon || '',
      image_url: project.image_url || ''
    })
    setShowAddForm(true)
  }

  const handleDelete = async (project) => {
    if (window.confirm(`Delete "${project.title}"?`)) {
      await deleteProject(project.id, project.image_url)
    }
  }

  return (
    <div>
      {/* Add Button */}
      {!showAddForm && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="mb-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add New Project
        </motion.button>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-300 mb-6"
        >
          <h4 className="text-xl font-bold text-purple-900 mb-4">
            {editingItem ? 'Edit Project' : 'Add New Project'}
          </h4>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project Title *"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            
            <textarea
              placeholder="Description *"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none resize-none"
            />
            
            <input
              type="text"
              placeholder="Tech Stack (comma separated) *"
              value={formData.tech_stack}
              onChange={(e) => setFormData({...formData, tech_stack: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            
            <input
              type="url"
              placeholder="Live Demo Link"
              value={formData.link}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            
            <input
              type="text"
              placeholder="Icon Emoji (e.g., 🚀)"
              value={formData.icon}
              onChange={(e) => setFormData({...formData, icon: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
              />
              {uploading && <p className="text-sm text-purple-600 mt-2">Uploading...</p>}
              {formData.image_url && (
                <img src={formData.image_url} alt="Preview" className="mt-2 h-32 rounded-lg" />
              )}
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={!formData.title || !formData.description}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingItem ? 'Update' : 'Add'} Project
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowAddForm(false)
                  setEditingItem(null)
                  setFormData({
                    title: '',
                    description: '',
                    tech_stack: '',
                    link: '',
                    icon: '',
                    image_url: ''
                  })
                }}
                className="px-6 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg font-bold"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Projects List */}
      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200 hover:border-purple-400 transition-colors"
          >
            {project.image_url && (
              <img src={project.image_url} alt={project.title} className="w-full h-32 object-cover rounded-lg mb-3" />
            )}
            <div className="flex items-start justify-between mb-2">
              <h5 className="font-bold text-lg text-gray-800 flex-1">{project.title}</h5>
              {project.icon && <span className="text-2xl ml-2">{project.icon}</span>}
            </div>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{project.description}</p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:underline flex items-center gap-1 mb-2">
                <ExternalLink className="w-3 h-3" />
                View Live
              </a>
            )}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(project)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm font-semibold flex items-center justify-center gap-1"
              >
                <Edit className="w-3 h-3" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(project)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm font-semibold flex items-center justify-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Skills Tab (Similar structure, condensed for space)
const SkillsTab = ({ 
  skills, 
  addSkill, 
  updateSkill, 
  deleteSkill, 
  uploadSkillIcon, 
  editingItem, 
  setEditingItem, 
  showAddForm, 
  setShowAddForm 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    level: 5,
    icon_url: ''
  })
  const [uploading, setUploading] = useState(false)

  const handleIconUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    const { url } = await uploadSkillIcon(file, formData.name)
    if (url) {
      setFormData({ ...formData, icon_url: url })
    }
    setUploading(false)
  }

  const handleSubmit = async () => {
    const skillData = {
      name: formData.name,
      level: parseInt(formData.level),
      icon_url: formData.icon_url || null
    }

    if (editingItem) {
      await updateSkill(editingItem.id, skillData)
      setEditingItem(null)
    } else {
      await addSkill(skillData)
      setShowAddForm(false)
    }

    setFormData({
      name: '',
      level: 5,
      icon_url: ''
    })
  }

  const handleEdit = (skill) => {
    setEditingItem(skill)
    setFormData({
      name: skill.name,
      level: skill.level,
      icon_url: skill.icon_url || ''
    })
    setShowAddForm(true)
  }

  const handleDelete = async (skill) => {
    if (window.confirm(`Delete "${skill.name}"?`)) {
      await deleteSkill(skill.id, skill.icon_url)
    }
  }

  return (
    <div>
      {/* Add Button */}
      {!showAddForm && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="mb-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add New Skill
        </motion.button>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-300 mb-6"
        >
          <h4 className="text-xl font-bold text-purple-900 mb-4">
            {editingItem ? 'Edit Skill' : 'Add New Skill'}
          </h4>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Skill Name *"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Skill Level (1-10): {formData.level}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value})}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Custom Icon (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleIconUpload}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
              />
              {uploading && <p className="text-sm text-purple-600 mt-2">Uploading...</p>}
              {formData.icon_url && (
                <img src={formData.icon_url} alt="Preview" className="mt-2 h-16 w-16 rounded-lg object-contain" />
              )}
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={!formData.name}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingItem ? 'Update' : 'Add'} Skill
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowAddForm(false)
                  setEditingItem(null)
                  setFormData({
                    name: '',
                    level: 5,
                    icon_url: ''
                  })
                }}
                className="px-6 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg font-bold"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Skills List */}
      <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200 hover:border-purple-400 transition-colors text-center"
          >
            {skill.icon_url ? (
              <img src={skill.icon_url} alt={skill.name} className="w-16 h-16 mx-auto mb-2 object-contain" />
            ) : (
              <div className="text-4xl mb-2">💻</div>
            )}
            <h5 className="font-bold text-lg text-gray-800 mb-1">{skill.name}</h5>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${(skill.level / 10) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mb-3">Level {skill.level}/10</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(skill)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1"
              >
                <Edit className="w-3 h-3" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(skill)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Messages Tab
const MessagesTab = ({ messages }) => (
  <div className="space-y-4">
    {messages.length === 0 ? (
      <p className="text-center text-gray-600 py-8">No messages yet</p>
    ) : (
      messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <p className="font-bold text-gray-800">{msg.name}</p>
              <a href={`mailto:${msg.email}`} className="text-sm text-purple-600 hover:underline">
                {msg.email}
              </a>
            </div>
            <p className="text-xs text-gray-500">
              {new Date(msg.created_at).toLocaleDateString()}
            </p>
          </div>
          <p className="text-gray-700 text-sm">{msg.message}</p>
        </motion.div>
      ))
    )}
  </div>
)

// Settings Tab
const SettingsTab = () => {
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [resumePDF, setResumePDF] = useState(null)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [socialLinks, setSocialLinks] = useState({
    github: 'impeccable548',
    linkedin: '',
    twitter: 'impeccable_477'
  })

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadingPhoto(true)
    try {
      const { error } = await storage.uploadFile('uploads', 'profile/providence-dp.jpg', file)
      if (error) throw error
      
      toast.success('Profile photo updated! Refresh to see changes.')
      setProfilePhoto(URL.createObjectURL(file))
    } catch (error) {
      toast.error('Failed to upload photo')
    } finally {
      setUploadingPhoto(false)
    }
  }

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file')
      return
    }

    setUploadingResume(true)
    try {
      const { error } = await storage.uploadFile('uploads', 'resume/providence-resume.pdf', file)
      if (error) throw error
      
      toast.success('Resume updated! Download button will work now.')
    } catch (error) {
      toast.error('Failed to upload resume')
    } finally {
      setUploadingResume(false)
    }
  }

  const currentProfileUrl = storage.getPublicUrl('uploads', 'profile/providence-dp.jpg')
  const currentResumeUrl = storage.getPublicUrl('uploads', 'resume/providence-resume.pdf')

  return (
    <div className="space-y-6">
      {/* Profile Photo Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-300"
      >
        <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Profile Photo
        </h3>
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <img 
              src={profilePhoto || currentProfileUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-purple-600 object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=No+Photo'
              }}
            />
          </div>
          
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload New Photo (JPG, PNG)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoUpload}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            {uploadingPhoto && (
              <p className="text-sm text-purple-600 mt-2 flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                Uploading...
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Current path: uploads/profile/providence-dp.jpg
            </p>
          </div>
        </div>
      </motion.div>

      {/* Resume PDF Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-300"
      >
        <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Resume PDF
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Resume (PDF only)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeUpload}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
            />
            {uploadingResume && (
              <p className="text-sm text-purple-600 mt-2 flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                Uploading...
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Current path: uploads/resume/providence-resume.pdf
            </p>
          </div>

          <a
            href={currentResumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Preview Current Resume
          </a>
        </div>
      </motion.div>

      {/* Social Links Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-300"
      >
        <h3 className="text-xl font-bold text-purple-900 mb-4">
          Social Links (Edit in Code)
        </h3>
        
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <strong>GitHub:</strong> 
            <code className="bg-gray-100 px-2 py-1 rounded">impeccable548</code>
          </div>
          <div className="flex items-center gap-2">
            <strong>X (Twitter):</strong> 
            <code className="bg-gray-100 px-2 py-1 rounded">impeccable_477</code>
          </div>
          <div className="flex items-center gap-2">
            <strong>LinkedIn:</strong> 
            <code className="bg-gray-100 px-2 py-1 rounded">Add your username</code>
          </div>
          
          <p className="text-xs text-gray-500 mt-4 bg-amber-50 p-3 rounded border border-amber-200">
            💡 To update social links, edit the code in:<br/>
            <code className="text-xs">src/components/Hero.jsx</code> and <code className="text-xs">src/components/Footer.jsx</code>
          </p>
        </div>
      </motion.div>

      {/* Contact Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-300"
      >
        <h3 className="text-xl font-bold text-purple-900 mb-4">
          Contact Information
        </h3>
        
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-purple-600" />
            <strong>Email:</strong> 
            <code className="bg-gray-100 px-2 py-1 rounded">igheleraro2@gmail.com</code>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-green-600" />
            <strong>WhatsApp:</strong> 
            <code className="bg-gray-100 px-2 py-1 rounded">+234 806 971 1972</code>
          </div>
          
          <p className="text-xs text-gray-500 mt-4 bg-amber-50 p-3 rounded border border-amber-200">
            💡 These are set in Vercel Environment Variables:<br/>
            <code className="text-xs">VITE_EMAIL</code> and <code className="text-xs">VITE_WHATSAPP_NUMBER</code>
          </p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-bold mb-4">🎉 Portfolio Status</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="opacity-80">Profile Photo</p>
            <p className="font-bold text-lg">✅ Ready</p>
          </div>
          <div>
            <p className="opacity-80">Resume PDF</p>
            <p className="font-bold text-lg">✅ Ready</p>
          </div>
          <div>
            <p className="opacity-80">Contact Info</p>
            <p className="font-bold text-lg">✅ Active</p>
          </div>
          <div>
            <p className="opacity-80">Social Links</p>
            <p className="font-bold text-lg">✅ Connected</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminPanel