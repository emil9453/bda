'use client'

interface SwitchProps {
  isChecked: boolean
  onChange: () => void
}

export default function Switch({ isChecked, onChange }: SwitchProps) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isChecked ? 'bg-[rgba(255,151,0,1)]' : 'bg-gray-200'
      }`}
      role="switch"
      aria-checked={isChecked}
    >
      <span className="sr-only">Toggle switch</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isChecked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}
