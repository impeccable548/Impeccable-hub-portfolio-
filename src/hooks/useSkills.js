import { useState, useEffect } from 'react'
import { db, storage, realtime, handleSupabaseError } from '../lib/supabase'
import toast from 'react-hot-toast'

export const useSkills = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all skills
  const fetchSkills = async () => {
    try {
      setLoading(true)
      const { data, error } = await db.skills.getAll()
      
      if (error) throw error
      
      console.log('✅ Skills fetched:', data)
      
      // Auto-assign different colors to each skill
      const colorPalette = [
        'bg-blue-600',
        'bg-green-600',
        'bg-purple-600',
        'bg-red-600',
        'bg-yellow-600',
        'bg-pink-600',
        'bg-indigo-600',
        'bg-teal-600',
        'bg-orange-600',
        'bg-cyan-600'
      ]
      
      const skillsWithColors = (data || []).map((skill, index) => ({
        ...skill,
        color: colorPalette[index % colorPalette.length]
      }))
      
      console.log('🎨 Skills with colors:', skillsWithColors)
      
      setSkills(skillsWithColors)
      setError(null)
    } catch (err) {
      console.error('❌ Fetch skills error:', err)
      setError(handleSupabaseError(err))
      toast.error('Failed to load skills')
    } finally {
      setLoading(false)
    }
  }

  // Add new skill
  const addSkill = async (skillData) => {
    try {
      const { data, error } = await db.skills.create(skillData)
      
      if (error) throw error
      
      setSkills(prev => [...prev, data])
      toast.success('Skill added successfully!')
      return { data, error: null }
    } catch (err) {
      console.error('Add skill error:', err)
      const errorMsg = handleSupabaseError(err)
      toast.error(errorMsg || 'Failed to add skill')
      return { data: null, error: err }
    }
  }

  // Update skill
  const updateSkill = async (id, updates) => {
    try {
      const { data, error } = await db.skills.update(id, updates)
      
      if (error) throw error
      
      setSkills(prev => prev.map(s => s.id === id ? data : s))
      toast.success('Skill updated successfully!')
      return { data, error: null }
    } catch (err) {
      console.error('Update skill error:', err)
      const errorMsg = handleSupabaseError(err)
      toast.error(errorMsg || 'Failed to update skill')
      return { data: null, error: err }
    }
  }

  // Delete skill
  const deleteSkill = async (id, iconUrl) => {
    try {
      // Delete icon from storage if exists
      if (iconUrl && iconUrl.includes('/uploads/')) {
        const path = iconUrl.split('/uploads/')[1]
        if (path) {
          await storage.deleteFile('uploads', path)
        }
      }

      const { error } = await db.skills.delete(id)
      
      if (error) throw error
      
      setSkills(prev => prev.filter(s => s.id !== id))
      toast.success('Skill deleted successfully!')
      return { error: null }
    } catch (err) {
      console.error('Delete skill error:', err)
      const errorMsg = handleSupabaseError(err)
      toast.error(errorMsg || 'Failed to delete skill')
      return { error: err }
    }
  }

  // Upload skill icon
  const uploadSkillIcon = async (file, skillName) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `skills/${skillName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.${fileExt}`
      
      const { error: uploadError } = await storage.uploadFile('uploads', fileName, file)
      
      if (uploadError) throw uploadError
      
      const publicUrl = storage.getPublicUrl('uploads', fileName)
      
      toast.success('Icon uploaded successfully!')
      return { url: publicUrl, error: null }
    } catch (err) {
      console.error('Upload icon error:', err)
      toast.error('Failed to upload icon')
      return { url: null, error: err }
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchSkills()
  }, [])

  // Real-time subscription
  useEffect(() => {
    const channel = realtime.subscribeToSkills((payload) => {
      console.log('Skill change:', payload)
      
      if (payload.eventType === 'INSERT') {
        setSkills(prev => [...prev, payload.new])
      } else if (payload.eventType === 'UPDATE') {
        setSkills(prev => prev.map(s => s.id === payload.new.id ? payload.new : s))
      } else if (payload.eventType === 'DELETE') {
        setSkills(prev => prev.filter(s => s.id !== payload.old.id))
      }
    })

    return () => {
      realtime.unsubscribe(channel)
    }
  }, [])

  return {
    skills,
    loading,
    error,
    fetchSkills,
    addSkill,
    updateSkill,
    deleteSkill,
    uploadSkillIcon
  }
}

export default useSkills