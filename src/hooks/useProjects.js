import { useState, useEffect } from 'react'
import { db, storage, realtime, handleSupabaseError } from '../lib/supabase'
import toast from 'react-hot-toast'

export const useProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await db.projects.getAll()
      
      if (error) throw error
      
      setProjects(data || [])
      setError(null)
    } catch (err) {
      console.error('Fetch projects error:', err)
      setError(handleSupabaseError(err))
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  // Add new project
  const addProject = async (projectData) => {
    try {
      const { data, error } = await db.projects.create(projectData)
      
      if (error) throw error
      
      setProjects(prev => [data, ...prev])
      toast.success('Project added successfully!')
      return { data, error: null }
    } catch (err) {
      console.error('Add project error:', err)
      const errorMsg = handleSupabaseError(err)
      toast.error(errorMsg || 'Failed to add project')
      return { data: null, error: err }
    }
  }

  // Update project
  const updateProject = async (id, updates) => {
    try {
      const { data, error } = await db.projects.update(id, updates)
      
      if (error) throw error
      
      setProjects(prev => prev.map(p => p.id === id ? data : p))
      toast.success('Project updated successfully!')
      return { data, error: null }
    } catch (err) {
      console.error('Update project error:', err)
      const errorMsg = handleSupabaseError(err)
      toast.error(errorMsg || 'Failed to update project')
      return { data: null, error: err }
    }
  }

  // Delete project
  const deleteProject = async (id, imageUrl) => {
    try {
      // Delete image from storage if exists
      if (imageUrl) {
        const path = imageUrl.split('/uploads/')[1]
        if (path) {
          await storage.deleteFile('uploads', path)
        }
      }

      const { error } = await db.projects.delete(id)
      
      if (error) throw error
      
      setProjects(prev => prev.filter(p => p.id !== id))
      toast.success('Project deleted successfully!')
      return { error: null }
    } catch (err) {
      console.error('Delete project error:', err)
      const errorMsg = handleSupabaseError(err)
      toast.error(errorMsg || 'Failed to delete project')
      return { error: err }
    }
  }

  // Upload project image
  const uploadProjectImage = async (file, projectId) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `projects/${projectId || Date.now()}.${fileExt}`
      
      const { error: uploadError } = await storage.uploadFile('uploads', fileName, file)
      
      if (uploadError) throw uploadError
      
      const publicUrl = storage.getPublicUrl('uploads', fileName)
      
      toast.success('Image uploaded successfully!')
      return { url: publicUrl, error: null }
    } catch (err) {
      console.error('Upload image error:', err)
      toast.error('Failed to upload image')
      return { url: null, error: err }
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchProjects()
  }, [])

  // Real-time subscription
  useEffect(() => {
    const channel = realtime.subscribeToProjects((payload) => {
      console.log('Project change:', payload)
      
      if (payload.eventType === 'INSERT') {
        setProjects(prev => [payload.new, ...prev])
      } else if (payload.eventType === 'UPDATE') {
        setProjects(prev => prev.map(p => p.id === payload.new.id ? payload.new : p))
      } else if (payload.eventType === 'DELETE') {
        setProjects(prev => prev.filter(p => p.id !== payload.old.id))
      }
    })

    return () => {
      realtime.unsubscribe(channel)
    }
  }, [])

  return {
    projects,
    loading,
    error,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    uploadProjectImage
  }
}

export default useProjects