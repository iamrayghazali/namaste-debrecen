import {useEffect, useRef, useState} from 'react'

export default function Reveal({children, delay = 0, duration = 1000, distance = 20, className = ''}) {
    const [visible, setVisible] = useState(false)
    const raf2Ref = useRef(null)

    useEffect(() => {
        const raf1 = requestAnimationFrame(() => {
            raf2Ref.current = requestAnimationFrame(() => setVisible(true))
        })
        return () => {
            cancelAnimationFrame(raf1)
            if (raf2Ref.current) cancelAnimationFrame(raf2Ref.current)
        }
    }, [])

    return (
        <div
            className={`transition-all ease-out ${visible ? 'opacity-100' : 'opacity-0'} ${className}`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                transform: visible ? 'translateY(0)' : `translateY(${distance}px)`,
            }}
        >
            {children}
        </div>
    )
}
