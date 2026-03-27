import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { HOTELS } from '../data/mockData'

export default function CollectionDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { state } = useApp()

  const collection = state.collections.find(c => c.id === id)

  if (!collection) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 text-center">
        <p className="text-mid text-sm">Collection not found.</p>
        <button onClick={() => navigate('/saved')} className="mt-4 text-h900 font-semibold text-sm">
          ← Back to Saved
        </button>
      </div>
    )
  }

  const itemCount = collection.hotels.length + collection.destinations.length

  return (
    <div className="page-enter flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Header */}
        <div className="px-4 pt-12 pb-4 text-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-12 left-4 w-9 h-9 rounded-full bg-inputbg flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#202732" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="text-5xl mb-2">{collection.emoji}</div>
          <h1 className="font-extrabold text-[20px] text-dark">{collection.name}</h1>
          <p className="text-light text-xs mt-1">
            {new Date(collection.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>

          {/* Action pills */}
          <div className="flex justify-center gap-2 mt-4">
            {['Share ↑', '+ Add', '✎ Edit'].map(action => (
              <button
                key={action}
                className="bg-h100 text-h900 text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-border mx-4 mb-4" />

        {/* Hotels section */}
        {collection.hotels.length > 0 && (
          <div className="px-4 mb-4">
            <p className="font-extrabold text-[13px] text-dark mb-3">
              Hotels ({collection.hotels.length})
            </p>
            <div className="flex flex-col gap-3">
              {collection.hotels.map(({ hotelId, note }) => {
                const hotel = HOTELS.find(h => h.id === hotelId)
                if (!hotel) return null
                return (
                  <HotelCollectionCard
                    key={hotelId}
                    hotelId={hotelId}
                    hotel={hotel}
                    note={note}
                    onPress={() => navigate(`/hotel/${hotelId}`)}
                  />
                )
              })}
            </div>
          </div>
        )}

        {/* Destinations section */}
        {collection.destinations.length > 0 && (
          <div className="px-4 mb-4">
            <p className="font-extrabold text-[13px] text-dark mb-3">
              Destinations ({collection.destinations.length})
            </p>
            <div className="flex flex-col gap-2">
              {collection.destinations.map(dest => (
                <div
                  key={dest.id}
                  className="bg-inputbg border border-border rounded-2xl p-3 flex items-center gap-3"
                >
                  <span className="text-2xl">{dest.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-sm text-dark">{dest.name}</p>
                    <p className="text-light text-xs">{dest.areasCount} areas saved</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {collection.hotels.length === 0 && collection.destinations.length === 0 && (
          <div className="flex flex-col items-center py-12 px-8 text-center">
            <p className="text-mid text-sm">This collection is empty.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 text-h900 font-semibold text-sm"
            >
              Browse Hotels →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

interface HotelCollectionCardProps {
  hotelId: string
  hotel: { name: string; pricePerNight: number; imageEmoji: string }
  note?: string
  onPress: () => void
}

function HotelCollectionCard({ hotel, note, onPress }: HotelCollectionCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden relative">
      <button
        onClick={onPress}
        className="w-full flex items-start gap-3 p-3 text-left active:bg-gray-50 transition-colors"
      >
        {/* Image */}
        <div className="w-14 h-14 rounded-xl bg-h100 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">{hotel.imageEmoji}</span>
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="font-extrabold text-sm text-dark truncate pr-6">{hotel.name}</p>
          <p className="text-h900 font-semibold text-xs mt-0.5">€{hotel.pricePerNight} / night</p>
          {note && (
            <div className="mt-2 bg-h100 rounded-full px-2 py-0.5 inline-flex items-center gap-1">
              <span className="text-[10px]">📝</span>
              <p className="text-[10px] text-dark leading-tight line-clamp-1">{note}</p>
            </div>
          )}
        </div>
      </button>

      {/* Three-dot menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute top-3 right-3 w-7 h-7 rounded-full hover:bg-inputbg flex items-center justify-center"
      >
        <span className="text-light text-lg leading-none">⋯</span>
      </button>

      {menuOpen && (
        <div className="absolute top-10 right-3 bg-white border border-border rounded-xl shadow-lg z-10 overflow-hidden min-w-[120px]">
          <button className="w-full px-4 py-2.5 text-sm text-dark text-left hover:bg-inputbg">Edit note</button>
          <button className="w-full px-4 py-2.5 text-sm text-red-500 text-left hover:bg-red-50">Remove</button>
        </div>
      )}
    </div>
  )
}
