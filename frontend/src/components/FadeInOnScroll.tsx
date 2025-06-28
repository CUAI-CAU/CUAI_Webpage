'use client'

import type { PropsWithChildren } from 'react'
import { useInView } from 'react-intersection-observer'

interface FadeInOnScrollProps {
    className?: string
}

export const FadeInOnScroll = ({ className, children }: PropsWithChildren<FadeInOnScrollProps>) => {
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

    return (
        <div
            ref={ref}
            className={`transition-opacity duration-1000 ease-out transform ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            } ${className}`}
        >
            {children}
        </div>
    )
}
