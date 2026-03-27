import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import type { Toast as ToastType } from '../types'

export default function ToastContainer() {
  const { state } = useApp()
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-4 flex flex-col gap-2 z-50 pointer-events-none">
      {state.toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

function ToastItem({ toast }: { toast: ToastType }) {
  const navigate = useNavigate()
  const { dismissToast } = useApp()

  return (
    <div className="toast-enter pointer-events-auto bg-h100 border border-h500 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
      {/* Check icon */}
      <div className="w-8 h-8 rounded-full bg-h900 flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-extrabold text-[13px] text-dark truncate">
          Saved to {toast.collectionName}
        </p>
        <p className="text-[11px] text-mid">Syncing across your devices…</p>
      </div>
      {/* View link */}
      <button
        onClick={() => {
          dismissToast(toast.id)
          navigate(`/saved/${toast.collectionId}`)
        }}
        className="text-h900 font-semibold text-[12px] flex-shrink-0"
      >
        View →
      </button>
    </div>
  )
}
