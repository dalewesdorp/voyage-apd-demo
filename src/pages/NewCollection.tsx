import { useState } from 'react'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'

const EMOJIS = ['🇮🇹', '🗽', '💍', '🌊', '🏔️', '🌴', '🗼', '⭐', '🎭', '🍜']

interface NewCollectionProps {
  open: boolean
  hotelId: string
  hotelName: string
  onClose: () => void
  onBack: () => void
}

export default function NewCollection({ open, hotelId, hotelName, onClose, onBack }: NewCollectionProps) {
  const { createCollection } = useApp()
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')
  const [emoji, setEmoji] = useState('🌍')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleSubmit = () => {
    if (!name.trim()) return
    createCollection(name.trim(), emoji, notes.trim(), hotelId)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      {/* Back button */}
      <div className="px-5 pb-1 flex items-center flex-shrink-0">
        <button onClick={onBack} className="text-h900 text-sm font-semibold">
          ← Back
        </button>
      </div>

      <div className="px-5 pb-2 flex-shrink-0">
        <h2 className="font-extrabold text-[18px] text-dark text-center">Name your collection</h2>
        <p className="text-mid text-xs text-center mt-0.5 truncate">{hotelName} will be added</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4 pt-4">
        {/* Emoji picker trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="w-12 h-12 rounded-2xl bg-h100 flex items-center justify-center text-2xl border-2 border-transparent focus:border-h900 transition-colors"
          >
            {emoji}
          </button>
          <p className="text-light text-xs">Tap to change emoji</p>
        </div>

        {showEmojiPicker && (
          <div className="flex flex-wrap gap-2 p-3 bg-inputbg rounded-2xl">
            {EMOJIS.map(e => (
              <button
                key={e}
                onClick={() => { setEmoji(e); setShowEmojiPicker(false) }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-colors ${emoji === e ? 'bg-h100' : 'bg-white'}`}
              >
                {e}
              </button>
            ))}
          </div>
        )}

        {/* Collection name */}
        <input
          type="text"
          placeholder="e.g. Italy Summer 2025"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
          className="w-full bg-inputbg rounded-2xl px-4 py-3.5 text-sm text-dark font-medium placeholder-[#C6C7CB] border-[1.5px] border-border focus:border-h900 focus:outline-none transition-colors"
        />

        {/* Optional notes */}
        <div>
          <label className="text-light text-xs font-normal block mb-1.5">Add a note (optional)</label>
          <textarea
            placeholder="Notes..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            className="w-full bg-inputbg rounded-2xl px-4 py-3 text-sm text-dark placeholder-[#C6C7CB] border border-border focus:border-h900 focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="w-full bg-h900 text-white font-semibold py-4 rounded-2xl text-[15px] disabled:opacity-40 transition-opacity active:bg-h500"
        >
          Create &amp; Save Hotel
        </button>
        <button
          onClick={onClose}
          className="w-full text-mid text-sm font-normal py-2"
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}
