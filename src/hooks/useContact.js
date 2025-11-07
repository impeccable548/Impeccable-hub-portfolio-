import { useState, useEffect } from 'react'
import { db, realtime, handleSupabaseError } from '../lib/supabase'
import toast from 'react-hot-toast'

export const useContact = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Fetch all contact messages (admin only)
  const fetchMessages = async () => {
    try {
      setLoading(true)
      const { data, error } = await db.contactMessages.getAll()
      
      if (error) throw error
      
      setMessages(data || [])
      setError(null)
    } catch (err) {
      console.error('Fetch messages error:', err)
      setError(handleSupabaseError(err))
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  // Submit contact form
  const submitMessage = async (messageData) => {
    try {
      setSubmitting(true)
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(messageData.email)) {
        throw new Error('Please enter a valid email address')
      }

      // Validate required fields
      if (!messageData.name || !messageData.email || !messageData.message) {
        throw new Error('Please fill in all fields')
      }

      const { data, error } = await db.contactMessages.create(messageData)
      
      if (error) throw error
      
      toast.success('Message sent successfully! I\'ll get back to you soon.')
      return { data, error: null }
    } catch (err) {
      console.error('Submit message error:', err)
      const errorMsg = err.message || handleSupabaseError(err) || 'Failed to send message'
      toast.error(errorMsg)
      return { data: null, error: err }
    } finally {
      setSubmitting(false)
    }
  }

  // Delete message (admin only)
  const deleteMessage = async (id) => {
    try {
      const { error } = await db.contactMessages.delete(id)
      
      if (error) throw error
      
      setMessages(prev => prev.filter(m => m.id !== id))
      toast.success('Message deleted successfully!')
      return { error: null }
    } catch (err) {
      console.error('Delete message error:', err)
      const errorMsg = handleSupabaseError(err)
      toast.error(errorMsg || 'Failed to delete message')
      return { error: err }
    }
  }

  // Mark message as read (you can add this column to your table)
  const markAsRead = async (id) => {
    try {
      // You'll need to add a 'read' column to contact_messages table
      // For now, this is a placeholder
      setMessages(prev => prev.map(m => 
        m.id === id ? { ...m, read: true } : m
      ))
      return { error: null }
    } catch (err) {
      console.error('Mark as read error:', err)
      return { error: err }
    }
  }

  // Get unread count
  const getUnreadCount = () => {
    return messages.filter(m => !m.read).length
  }

  // Real-time subscription for new messages
  useEffect(() => {
    const channel = realtime.subscribeToContactMessages((payload) => {
      console.log('Message change:', payload)
      
      if (payload.eventType === 'INSERT') {
        setMessages(prev => [payload.new, ...prev])
        // You can add a notification sound here
        toast('New message received!', {
          icon: '📬',
          duration: 4000
        })
      } else if (payload.eventType === 'DELETE') {
        setMessages(prev => prev.filter(m => m.id !== payload.old.id))
      }
    })

    return () => {
      realtime.unsubscribe(channel)
    }
  }, [])

  return {
    messages,
    loading,
    error,
    submitting,
    fetchMessages,
    submitMessage,
    deleteMessage,
    markAsRead,
    getUnreadCount
  }
}

export default useContact