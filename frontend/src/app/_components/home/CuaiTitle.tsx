'use client'

import { ScrollDownButton } from '@/components'
import { CUAI_TITLE } from '@/constants/home'
import { useEffect, useState } from 'react'

export const CuaiTitle = () => {
    const [isFontLoaded, setIsFontLoaded] = useState(false)

    useEffect(() => {
        document.fonts.ready.then(() => setIsFontLoaded(true))
    }, [])

    return (
        <section className="flex items-center justify-center min-h-screen">
            <div className="flex flex-row items-center gap-20">
                <div className="flex flex-col gap-2">
                    {CUAI_TITLE.map((text, index) => (
                        <h1
                            key={index}
                            className={`text-start text-6xl md:text-7xl font-thin will-change-transform whitespace-nowrap transition duration-1000 ease-out ${
                                isFontLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            {text}
                        </h1>
                    ))}
                </div>
                <div className="w-[350px] hidden md:flex" />
            </div>

            <div className="absolute bottom-10">
                <ScrollDownButton />
            </div>
        </section>
    )
}
