import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import SaveButton from '../components/SaveButton'
import CollectionSelector from './CollectionSelector'
import { HOTELS } from '../data/mockData'

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isHotelSaved } = useApp()

  const hotel = HOTELS.find(h => h.id === id)
  const [showSelector, setShowSelector] = useState(searchParams.get('save') === '1')

  useEffect(() => {
    if (searchParams.get('save') === '1') setShowSelector(true)
  }, [searchParams])

  if (!hotel) return <div className="p-8 text-center text-mid">Hotel not found</div>

  const saved = isHotelSaved(hotel.id)

  return (
    <div className="page-enter flex flex-col h-full">
      {/* Hero */}
      <div className="relative w-full h-56 bg-h100 flex items-center justify-center flex-shrink-0">
        <span className="text-7xl">{hotel.imageEmoji}</span>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#202732" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Floating save */}
        <div className="absolute top-12 right-4">
          <SaveButton
            saved={saved}
            floating
            size="lg"
            onClick={() => setShowSelector(true)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-36">
        <div className="px-4 pt-4">
          {/* Header */}
          <h1 className="font-extrabold text-[22px] text-dark">{hotel.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-mid text-sm">{hotel.location}</p>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-amber-400">{'★'.repeat(hotel.stars)}</span>
            <span className="text-mid text-sm">€{hotel.totalPrice ?? hotel.pricePerNight * 3} total</span>
          </div>

          {/* Amenity tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {hotel.amenities.map(a => (
              <span
                key={a}
                className="bg-h100 text-h900 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {a}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mt-4 text-mid text-sm leading-relaxed">{hotel.description}</p>

          {/* Price */}
          <div className="mt-4 p-4 bg-inputbg rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-light text-xs">Per night</p>
              <p className="font-extrabold text-xl text-dark">€{hotel.pricePerNight}</p>
            </div>
            <div className="text-right">
              <p className="text-light text-xs">Total ({hotel.nights ?? 3} nights)</p>
              <p className="font-semibold text-mid">€{hotel.totalPrice ?? hotel.pricePerNight * 3}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-border px-4 py-4 flex flex-col gap-3 z-30">
        <button className="w-full bg-h900 text-white font-semibold py-4 rounded-2xl text-[15px] active:bg-h500 transition-colors">
          Book Now
        </button>
        <button
          onClick={() => setShowSelector(true)}
          className="w-full bg-white border-2 border-h900 text-h900 font-semibold py-3.5 rounded-2xl text-[15px] active:bg-h100 transition-colors"
        >
          {saved ? '♥ Saved to Collection' : 'Save to Collection'}
        </button>
      </div>

      {/* Collection Selector Modal */}
      <CollectionSelector
        open={showSelector}
        hotelId={hotel.id}
        hotelName={hotel.name}
        onClose={() => setShowSelector(false)}
      />
    </div>
  )
}
