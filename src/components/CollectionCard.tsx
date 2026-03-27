import { useNavigate } from 'react-router-dom'
import type { Collection } from '../types'

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const navigate = useNavigate()
  const itemCount = collection.hotels.length + collection.destinations.length

  return (
    <button
      onClick={() => navigate(`/saved/${collection.id}`)}
      className="bg-white border border-border rounded-2xl overflow-hidden text-left w-full active:bg-gray-50 transition-colors"
    >
      {/* Image area */}
      <div className="w-full h-24 bg-h100 flex items-center justify-center">
        <span className="text-4xl">{collection.emoji}</span>
      </div>
      {/* Info */}
      <div className="p-3">
        <p className="font-extrabold text-sm text-dark truncate">{collection.name}</p>
        <p className="text-light text-xs mt-0.5">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
      </div>
    </button>
  )
}
