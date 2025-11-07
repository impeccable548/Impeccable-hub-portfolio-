import { createClient } from '@supabase/supabase-js'

// Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Admin configuration
export const ADMIN_CONFIG = {
  uid: import.meta.env.VITE_ADMIN_UID,
  password: 'Pp1#$#$#' // Your actual admin password
}

// Storage helpers
export const storage = {
  // Upload file to storage
  uploadFile: async (bucket, path, file) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Upload error:', error)
      return { data: null, error }
    }
  },

  // Get public URL for a file
  getPublicUrl: (bucket, path) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    
    return data.publicUrl
  },

  // Delete file from storage
  deleteFile: async (bucket, path) => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path])

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Delete error:', error)
      return { error }
    }
  },

  // List files in a bucket folder
  listFiles: async (bucket, folder = '') => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('List files error:', error)
      return { data: null, error }
    }
  }
}

// Database helpers
export const db = {
  // Projects CRUD
  projects: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      return { data, error }
    },

    getById: async (id) => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()
      
      return { data, error }
    },

    create: async (project) => {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single()
      
      return { data, error }
    },

    update: async (id, updates) => {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      return { data, error }
    },

    delete: async (id) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
      
      return { error }
    }
  },

  // Skills CRUD
  skills: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('level', { ascending: false })
      
      return { data, error }
    },

    getById: async (id) => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('id', id)
        .single()
      
      return { data, error }
    },

    create: async (skill) => {
      const { data, error } = await supabase
        .from('skills')
        .insert([skill])
        .select()
        .single()
      
      return { data, error }
    },

    update: async (id, updates) => {
      const { data, error } = await supabase
        .from('skills')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      return { data, error }
    },

    delete: async (id) => {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id)
      
      return { error }
    }
  },

  // Contact messages
  contactMessages: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
      
      return { data, error }
    },

    create: async (message) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{
          name: message.name,
          email: message.email,
          message: message.message,
          created_at: new Date().toISOString()
        }])
        .select()
        .single()
      
      return { data, error }
    },

    delete: async (id) => {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)
      
      return { error }
    }
  },

  // Resume
  resume: {
    get: async () => {
      const { data, error } = await supabase
        .from('resume')
        .select('*')
        .limit(1)
      
      return { data: data?.[0] || null, error }
    },

    update: async (id, updates) => {
      const { data, error } = await supabase
        .from('resume')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      return { data, error }
    }
  }
}

// Authentication helpers
export const auth = {
  // Sign in with email and password
  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { data: null, error }
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error }
    }
  },

  // Get current session
  getSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      return { data: data.session, error: null }
    } catch (error) {
      console.error('Get session error:', error)
      return { data: null, error }
    }
  },

  // Get current user
  getUser: async () => {
    try {
      const { data, error } = await supabase.auth.getUser()
      if (error) throw error
      return { data: data.user, error: null }
    } catch (error) {
      console.error('Get user error:', error)
      return { data: null, error }
    }
  },

  // Check if user is admin
  isAdmin: async () => {
    const { data: user } = await auth.getUser()
    return user?.id === ADMIN_CONFIG.uid
  }
}

// Real-time subscriptions
export const realtime = {
  // Subscribe to projects changes
  subscribeToProjects: (callback) => {
    return supabase
      .channel('projects-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'projects' },
        callback
      )
      .subscribe()
  },

  // Subscribe to skills changes
  subscribeToSkills: (callback) => {
    return supabase
      .channel('skills-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'skills' },
        callback
      )
      .subscribe()
  },

  // Subscribe to contact messages
  subscribeToContactMessages: (callback) => {
    return supabase
      .channel('contact-messages-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'contact_messages' },
        callback
      )
      .subscribe()
  },

  // Unsubscribe from channel
  unsubscribe: (channel) => {
    supabase.removeChannel(channel)
  }
}

// Error handler
export const handleSupabaseError = (error) => {
  if (!error) return null

  const errorMessages = {
    '23505': 'This item already exists',
    '23503': 'Cannot delete: item is being used',
    '42501': 'Permission denied',
    'PGRST301': 'Item not found'
  }

  return errorMessages[error.code] || error.message || 'An error occurred'
}

export default supabase