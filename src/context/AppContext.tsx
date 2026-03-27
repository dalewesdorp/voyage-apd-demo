import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { Collection, Toast } from '../types'
import { INITIAL_COLLECTIONS } from '../data/mockData'

interface State {
  collections: Collection[]
  toasts: Toast[]
}

type Action =
  | { type: 'SAVE_TO_COLLECTION'; hotelId: string; collectionId: string; note?: string }
  | { type: 'UNSAVE_HOTEL'; hotelId: string; collectionId: string }
  | { type: 'CREATE_COLLECTION'; name: string; emoji: string; notes?: string; hotelId: string }
  | { type: 'DISMISS_TOAST'; id: string }
  | { type: 'ADD_TOAST'; toast: Toast }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SAVE_TO_COLLECTION': {
      const collections = state.collections.map(col => {
        if (col.id !== action.collectionId) return col
        const alreadySaved = col.hotels.some(h => h.hotelId === action.hotelId)
        if (alreadySaved) return col
        return {
          ...col,
          hotels: [...col.hotels, { hotelId: action.hotelId, note: action.note, savedAt: new Date().toISOString() }],
        }
      })
      return { ...state, collections }
    }
    case 'UNSAVE_HOTEL': {
      const collections = state.collections.map(col => {
        if (col.id !== action.collectionId) return col
        return { ...col, hotels: col.hotels.filter(h => h.hotelId !== action.hotelId) }
      })
      return { ...state, collections }
    }
    case 'CREATE_COLLECTION': {
      const newCol: Collection = {
        id: `col-${Date.now()}`,
        name: action.name,
        emoji: action.emoji,
        notes: action.notes,
        hotels: [{ hotelId: action.hotelId, savedAt: new Date().toISOString() }],
        destinations: [],
        createdAt: new Date().toISOString(),
      }
      return { ...state, collections: [newCol, ...state.collections] }
    }
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.toast] }
    case 'DISMISS_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.id) }
    default:
      return state
  }
}

function loadState(): State {
  try {
    const raw = localStorage.getItem('voyage-state')
    if (raw) return JSON.parse(raw) as State
  } catch {
    // ignore
  }
  return { collections: INITIAL_COLLECTIONS, toasts: [] }
}

interface AppContextValue {
  state: State
  isHotelSaved: (hotelId: string) => boolean
  getHotelCollections: (hotelId: string) => Collection[]
  saveToCollection: (hotelId: string, collectionId: string, note?: string) => void
  createCollection: (name: string, emoji: string, notes: string, hotelId: string) => string
  dismissToast: (id: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    const { toasts: _toasts, ...rest } = state
    localStorage.setItem('voyage-state', JSON.stringify({ ...rest, toasts: [] }))
  }, [state])

  const isHotelSaved = (hotelId: string) =>
    state.collections.some(col => col.hotels.some(h => h.hotelId === hotelId))

  const getHotelCollections = (hotelId: string) =>
    state.collections.filter(col => col.hotels.some(h => h.hotelId === hotelId))

  const saveToCollection = (hotelId: string, collectionId: string, note?: string) => {
    dispatch({ type: 'SAVE_TO_COLLECTION', hotelId, collectionId, note })
    const col = state.collections.find(c => c.id === collectionId)
    if (col) {
      const toast: Toast = { id: `toast-${Date.now()}`, collectionName: col.name, collectionId }
      dispatch({ type: 'ADD_TOAST', toast })
      setTimeout(() => dispatch({ type: 'DISMISS_TOAST', id: toast.id }), 4000)
    }
  }

  const createCollection = (name: string, emoji: string, notes: string, hotelId: string) => {
    const id = `col-${Date.now()}`
    dispatch({ type: 'CREATE_COLLECTION', name, emoji, notes, hotelId })
    const toast: Toast = { id: `toast-${Date.now()}`, collectionName: name, collectionId: id }
    setTimeout(() => {
      dispatch({ type: 'ADD_TOAST', toast })
      setTimeout(() => dispatch({ type: 'DISMISS_TOAST', id: toast.id }), 4000)
    }, 50)
    return id
  }

  return (
    <AppContext.Provider value={{ state, isHotelSaved, getHotelCollections, saveToCollection, createCollection, dismissToast: (id) => dispatch({ type: 'DISMISS_TOAST', id }) }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
