import { useCallback } from 'react'

function RippleButton({ children, className = '', id, onClick, ...rest }) {
  const handleClick = useCallback(
    (e) => {
      const button = e.currentTarget
      const ripple = document.createElement('span')
      ripple.classList.add('ripple')

      const rect = button.getBoundingClientRect()
      ripple.style.left = `${e.clientX - rect.left}px`
      ripple.style.top = `${e.clientY - rect.top}px`

      button.appendChild(ripple)

      setTimeout(() => ripple.remove(), 600)

      if (onClick) onClick(e)
    },
    [onClick]
  )

  return (
    <button className={className} id={id} onClick={handleClick} {...rest}>
      {children}
    </button>
  )
}

export default RippleButton
