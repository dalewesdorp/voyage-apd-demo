import { useState } from 'react'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'
import NewCollection from './NewCollection'

interface CollectionSelectorProps {
  open: boolean
  hotelId: string
  hotelName: string
  onClose: () => void
}

export default function CollectionSelector({ open, hotelId, hotelName, onClose }: CollectionSelectorProps) {
  const { state, saveToCollection } = useApp()
  const [showNewCollection, setShowNewCollection] = useState(false)

  const handleSelect = (collectionId: string) => {
    saveToCollection(hotelId, collectionId)
    onClose()
  }

  if (showNewCollection) {
    return (
      <NewCollection
        open={open}
        hotelId={hotelId}
        hotelName={hotelName}
        onClose={() => {
          setShowNewCollection(false)
          onClose()
        }}
        onBack={() => setShowNewCollection(false)}
      />
    )
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="px-5 pb-2 flex-shrink-0">
        <h2 className="font-extrabold text-[18px] text-dark text-center">Save to Collection</h2>
        <p className="text-mid text-sm text-center mt-0.5 truncate">{hotelName}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-6 flex flex-col gap-2">
        {/* Create new */}
        <button
          onClick={() => setShowNewCollection(true)}
          className="w-full bg-h100 rounded-2xl px-4 py-3.5 flex items-center gap-3 active:bg-h500/30 transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-h900 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-semibold text-h900 text-sm">Create new collection</span>
        </button>

        {/* Existing collections */}
        {state.collections.map(col => {
          const itemCount = col.hotels.length + col.destinations.length
          return (
            <button
              key={col.id}
              onClick={() => handleSelect(col.id)}
              className="w-full bg-white border border-border rounded-2xl px-4 py-3 flex items-center gap-3 active:bg-inputbg transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-h100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">{col.emoji}</span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-extrabold text-sm text-dark truncate">{col.name}</p>
                <p className="text-light text-xs">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#868D98" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )
        })}
      </div>
    </Modal>
  )
}
