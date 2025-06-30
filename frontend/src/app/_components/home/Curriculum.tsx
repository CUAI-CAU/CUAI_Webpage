'use client'

import { useState } from 'react'
import { FadeInOnScroll } from '@/components'
import { CURRICULUM } from '@/constants/home'
import { MoveUpRight } from 'lucide-react'

export const Curriculum = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(-1)

    const getCardClassName = (index: number) => {
        const isSelected = selectedIndex === index
        const isLeft = selectedIndex !== -1 && selectedIndex > index
        const isRight = selectedIndex !== -1 && selectedIndex < index

        return [
            'flex flex-col w-full p-7 gap-5 text-start border border-none rounded-3xl bg-slate-800 opacity-70',
            'transition-all duration-500 ease-in-out',
            isSelected && 'scale-105 opacity-100',
            isLeft && '-translate-y-2 lg:translate-y-0 lg:-translate-x-2',
            isRight && 'translate-y-2 lg:translate-y-0 lg:translate-x-2',
        ]
            .filter(Boolean)
            .join(' ')
    }

    return (
        <FadeInOnScroll className="flex items-center justify-center min-h-screen">
            <section className="flex flex-col w-5/6 md:w-3/4 xl:w-2/3 space-y-10">
                <div className="flex text-center md:text-start text-5xl font-semibold">커리큘럼</div>
                <div className="flex flex-col lg:flex-row gap-5">
                    {CURRICULUM.map((c, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setSelectedIndex(index)}
                            onMouseLeave={() => setSelectedIndex(-1)}
                            className={getCardClassName(index)}
                        >
                            <div className="flex flex-row justify-between items-center text-2xl font-medium">
                                <div>{c.title}</div>
                                <MoveUpRight />
                            </div>
                            <div className="whitespace-pre-line">{c.description}</div>
                        </div>
                    ))}
                </div>
            </section>
        </FadeInOnScroll>
    )
}
