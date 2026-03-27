interface SaveButtonProps {
  saved: boolean
  onClick: (e: React.MouseEvent) => void
  size?: 'sm' | 'md' | 'lg'
  floating?: boolean
}

export default function SaveButton({ saved, onClick, size = 'md', floating = false }: SaveButtonProps) {
  const sizes = {
    sm: { btn: 'w-8 h-8', icon: 14 },
    md: { btn: 'w-9 h-9', icon: 16 },
    lg: { btn: 'w-11 h-11', icon: 20 },
  }
  const { btn, icon } = sizes[size]

  if (floating) {
    return (
      <button
        onClick={onClick}
        className={`${btn} rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ${
          saved ? 'bg-h900' : 'bg-white'
        }`}
      >
        <HeartIcon size={icon} filled={saved} color={saved ? 'white' : '#868D98'} />
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`${btn} rounded-full flex items-center justify-center transition-all active:scale-90 ${
        saved ? 'bg-h900' : 'bg-inputbg'
      }`}
    >
      <HeartIcon size={icon} filled={saved} color={saved ? 'white' : '#868D98'} />
    </button>
  )
}

export function HeartIcon({ size = 16, filled = false, color = '#868D98' }: { size?: number; filled?: boolean; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        stroke={color}
        strokeWidth="2"
        fill={filled ? color : 'none'}
      />
    </svg>
  )
}
