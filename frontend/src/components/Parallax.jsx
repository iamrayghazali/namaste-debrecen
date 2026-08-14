import {useEffect, useRef, useState} from 'react'

/**
 * Wraps its children in a layer that drifts vertically as the page scrolls —
 * a subtle "floating above the background" effect rather than text pasted
 * flat onto it. Offset is measured from the element's own distance to the
 * viewport center (not raw scrollY), so it works the same way no matter
 * where on the page it's used, and is clamped to `max` so it never drifts
 * far. The CSS transition eases toward each new offset instead of snapping
 * to it, giving the motion a slight, deliberate delay.
 *
 * Usage: <Parallax speed={0.15} max={16}>...</Parallax>
 */
export default function Parallax({children, speed = 0.15, max = 16, className = ''}) {
    const ref = useRef(null)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        let ticking = false

        const update = () => {
            const el = ref.current
            if (!el) return

            const rect = el.getBoundingClientRect()
            const viewportCenter = window.innerHeight / 2
            const distanceFromCenter = rect.top + rect.height / 2 - viewportCenter
            const raw = distanceFromCenter * speed

            setOffset(Math.max(-max, Math.min(max, raw)))
        }

        const handleScroll = () => {
            if (ticking) return
            ticking = true
            requestAnimationFrame(() => {
                update()
                ticking = false
            })
        }

        update()
        window.addEventListener('scroll', handleScroll, {passive: true})
        window.addEventListener('resize', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [speed, max])

    return (
        <div
            ref={ref}
            className={`transition-transform duration-700 ease-out will-change-transform ${className}`}
            style={{transform: `translateY(${offset}px)`}}
        >
            {children}
        </div>
    )
}
