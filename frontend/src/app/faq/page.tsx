'use client'

import { FadeInOnMount, TitledSection, ToggleBox } from '@/components'
import { useGetFaq } from '@/hooks/useGetFaq'
import { useEffect, useState } from 'react'
import { FaqSkeleton } from './_components'

export default function FaqPage() {
    const { data: faq } = useGetFaq()
    const [openStates, setOpenStates] = useState<boolean[]>([])

    useEffect(() => {
        if (faq && faq.length > 0) setOpenStates(Array(faq.length).fill(false))
    }, [faq])

    const toggleIndex = (index: number) => {
        setOpenStates((prev) => prev.map((value, i) => (i === index ? !value : value)))
    }

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="FAQ" className="w-full max-w-[1280px] px-8">
                <p className="text-2xl text-slate-300">자주 묻는 질문</p>

                <hr className="w-full border-slate-700" />

                <div className="flex flex-col items-center w-full max-w-[768px] space-y-10">
                    {faq ? (
                        <div className="flex flex-col items-center space-y-5">
                            {faq.map((f, index) => (
                                <ToggleBox
                                    key={index}
                                    title={f.properties.question.title[0].plain_text}
                                    isOpen={openStates[index]}
                                    setIsOpen={() => toggleIndex(index)}
                                >
                                    {f.properties.answer.rich_text[0].plain_text}
                                </ToggleBox>
                            ))}
                        </div>
                    ) : (
                        <FaqSkeleton />
                    )}
                </div>

                <div className="flex flex-col items-center space-y-10">
                    <div className="text-2xl text-slate-300 whitespace-nowrap">CUAI에게 더 궁금한 점이 있다면?</div>
                    <button
                        type="button"
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
