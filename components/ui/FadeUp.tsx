'use client'
import { useEffect, useRef, type ReactNode } from 'react'

interface FadeUpProps {
  children: ReactNode
  className?: string
  delay?: number   // ms
  once?: boolean   // fire once (default true)
}

export default function FadeUp({
  children,
  className = '',
  delay = 0,
  once = true,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.classList.remove('in-view')
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined

  return (
    <div ref={ref} className={`fade-up ${className}`} style={style}>
      {children}
    </div>
  )
}
