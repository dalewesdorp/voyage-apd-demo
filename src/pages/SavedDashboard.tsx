import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import CollectionCard from '../components/CollectionCard'
import { HOTELS } from '../data/mockData'
import { HeartIcon } from '../components/SaveButton'

export default function SavedDashboard() {
  const { state } = useApp()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const totalItems = state.collections.reduce(
    (sum, col) => sum + col.hotels.length + col.destinations.length,
    0
  )

  // Recently saved: all saved hotels across collections, deduped
  const recentlySaved = (() => {
    const seen = new Set<string>()
    const items: { hotelId: string; collectionId: string; note?: string }[] = []
    for (const col of state.collections) {
      for (const h of col.hotels) {
        if (!seen.has(h.hotelId)) {
          seen.add(h.hotelId)
          items.push({ hotelId: h.hotelId, collectionId: col.id, note: h.note })
        }
      }
    }
    return items.slice(0, 5)
  })()

  const filteredCollections = state.collections.filter(col =>
    col.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const emptyState = state.collections.length === 0

  return (
    <div className="page-enter flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Header */}
        <div className="px-4 pt-12 pb-4">
          <h1 className="font-extrabold text-[26px] text-dark">Saved</h1>
          <p className="text-light text-xs mt-0.5">
            {state.collections.length} collections · {totalItems} items
          </p>

          {/* Search */}
          <div className="mt-3 bg-inputbg border border-border rounded-2xl px-4 py-3 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#868D98" strokeWidth="2" />
              <path d="M16.5 16.5L21 21" stroke="#868D98" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search saved items"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-dark placeholder-light focus:outline-none"
            />
          </div>
        </div>

        {emptyState ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-h100 flex items-center justify-center mb-4">
              <HeartIcon size={28} color="#4C9C83" />
            </div>
            <h3 className="font-extrabold text-lg text-dark">No saved items yet</h3>
            <p className="text-mid text-sm mt-2">
              Browse hotels and tap ♡ to save them to collections.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 bg-h900 text-white font-semibold px-6 py-3 rounded-2xl text-sm"
            >
              Browse Hotels
            </button>
          </div>
        ) : (
          <>
            {/* Collections grid */}
            <div className="px-4">
              <p className="font-extrabold text-[13px] text-dark mb-3">Collections</p>
              <div className="grid grid-cols-2 gap-3">
                {filteredCollections.map(col => (
                  <CollectionCard key={col.id} collection={col} />
                ))}
              </div>
            </div>

            {/* Recently saved */}
            {recentlySaved.length > 0 && (
              <div className="px-4 mt-6">
                <p className="font-extrabold text-[13px] text-dark mb-3">Recently saved</p>
                <div className="flex flex-col gap-2">
                  {recentlySaved.map(({ hotelId }) => {
                    const hotel = HOTELS.find(h => h.id === hotelId)
                    if (!hotel) return null
                    return (
                      <button
                        key={hotelId}
                        onClick={() => navigate(`/hotel/${hotelId}`)}
                        className="bg-white border border-border rounded-2xl p-3 flex items-center gap-3 text-left active:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl bg-h100 flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">{hotel.imageEmoji}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-extrabold text-sm text-dark truncate">{hotel.name}</p>
                          <p className="text-light text-xs truncate">{hotel.location}</p>
                        </div>
                        <HeartIcon size={16} filled color="#4C9C83" />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
