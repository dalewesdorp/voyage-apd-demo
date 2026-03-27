import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { label: 'Search', icon: SearchIcon, path: '/' },
  { label: 'Explore', icon: ExploreIcon, path: '/explore' },
  { label: 'Saved', icon: SavedIcon, path: '/saved' },
  { label: 'Profile', icon: ProfileIcon, path: '/profile' },
]

export default function TabBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const activeTab = (() => {
    if (location.pathname.startsWith('/saved')) return '/saved'
    if (location.pathname === '/explore') return '/explore'
    if (location.pathname === '/profile') return '/profile'
    return '/'
  })()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-border z-40">
      <div className="flex items-center justify-around px-2 pb-safe">
        {tabs.map(({ label, icon: Icon, path }) => {
          const isActive = activeTab === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-0.5 py-2 px-4 min-w-[60px]"
            >
              <Icon active={isActive} />
              <span
                className={`text-[10px] font-medium ${isActive ? 'text-h900' : 'text-light'}`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

function SearchIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={active ? '#4C9C83' : '#868D98'} strokeWidth="2" />
      <path d="M16.5 16.5L21 21" stroke={active ? '#4C9C83' : '#868D98'} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ExploreIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={active ? '#4C9C83' : '#868D98'} strokeWidth="2" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke={active ? '#4C9C83' : '#868D98'} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SavedIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#4C9C83' : 'none'}>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        stroke={active ? '#4C9C83' : '#868D98'}
        strokeWidth="2"
        fill={active ? '#4C9C83' : 'none'}
      />
    </svg>
  )
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={active ? '#4C9C83' : '#868D98'} strokeWidth="2" />
      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke={active ? '#4C9C83' : '#868D98'} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
