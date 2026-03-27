import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Scrim */}
      <div
        className="scrim-enter absolute inset-0 bg-dark/40"
        onClick={onClose}
      />
      {/* Sheet */}
      <div className="sheet-enter relative w-full max-w-[430px] bg-white rounded-t-3xl z-10 pb-safe max-h-[85dvh] flex flex-col">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>
        {children}
      </div>
    </div>
  )
}
