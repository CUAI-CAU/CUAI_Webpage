'use client'

import { FadeInOnMount, TitledSection, ToggleBox } from '@/components'
import { FAQ } from '@/constants/faq'
import { useState } from 'react'

export default function FaqPage() {
    const [openStates, setOpenStates] = useState<boolean[]>(FAQ.map(() => false))

    const toggleIndex = (index: number) => {
        setOpenStates((prev) => prev.map((value, i) => (i === index ? !value : value)))
    }

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="FAQ" className="w-6/7 md:w-3/4 xl:w-2/3 2xl:w-1/2">
                <div className="lg:px-24 flex flex-col items-center space-y-10">
                    <div className="text-2xl text-slate-300">자주 묻는 질문</div>
                    <div className="flex flex-col items-center space-y-5">
                        {FAQ.map((faq, index) => (
                            <ToggleBox
                                key={index}
                                title={faq.question}
                                isOpen={openStates[index]}
                                setIsOpen={() => toggleIndex(index)}
                            >
                                {faq.answer}
                            </ToggleBox>
                        ))}
                    </div>
                </div>

                <div className="w-full border-b border-slate-700" />

                <div className="flex flex-col items-center space-y-10">
                    <div className="text-2xl text-slate-300 whitespace-nowrap">CUAI에게 더 궁금한 점이 있다면?</div>
                    <button
                        onClick={() => window.open('https://pf.kakao.com/_qxkxhxiK')}
                        className="px-5 py-3 bg-emerald-500 text-slate-800 font-semibold rounded-full
                        hover:translate-y-1 whitespace-nowrap
                        transition duration-300 ease-in-out cursor-pointer"
                    >
                        지금 바로 문의하기
                    </button>
                </div>
            </TitledSection>
        </FadeInOnMount>
    )
}
