'use client'

import { useEffect, useState, type PropsWithChildren } from 'react'

interface FadeInOnMountProps {
    className?: string
}

export const FadeInOnMount = ({ className, children }: PropsWithChildren<FadeInOnMountProps>) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 50)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <div
            className={`transition-opacity duration-1000 ease-out transform ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            } ${className}`}
        >
            {children}
        </div>
    )
}
