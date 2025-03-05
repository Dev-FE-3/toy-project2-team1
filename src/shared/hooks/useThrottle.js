import { useRef } from 'react'

export default function useThrottle(callback, delay) {
  const lastRun = useRef(Date.now())

  return (options) => {
    const timeElapsed = Date.now() - lastRun.current

    if (timeElapsed >= delay) {
      callback?.(options)
      lastRun.current = Date.now()
    }
  }
}
