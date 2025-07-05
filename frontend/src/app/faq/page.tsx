'use client'

import { FadeInOnMount, TitledSection, ToggleBox } from '@/components'
import { useGetFaq } from '@/hooks/useGetFaq'
import { useEffect, useState } from 'react'

const Skeleton = () => {
    return (
        <div className="flex flex-col items-center w-full space-y-5">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="w-full h-28 p-6 space-y-5 bg-slate-700 rounded-2xl animate-pulse">
                    <div className="w-[87.5%] h-16 bg-slate-500 rounded-lg animate-pulse" />
                </div>
            ))}
        </div>
    )
}

export default function FaqPage() {
    const { data: faq, isLoading } = useGetFaq()
    const [openStates, setOpenStates] = useState<boolean[]>([])

    useEffect(() => {
        if (faq && faq.length > 0) setOpenStates(Array(faq.length).fill(false))
    }, [faq])

    const toggleIndex = (index: number) => {
        setOpenStates((prev) => prev.map((value, i) => (i === index ? !value : value)))
    }

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="FAQ" className="w-5/6 md:w-3/4 xl:w-2/3 2xl:w-1/2">
                <div className="text-2xl text-slate-300">자주 묻는 질문</div>

                <div className="w-full border-b border-slate-700" />

                <div className="lg:px-24 flex flex-col items-center w-full space-y-10">
                    {isLoading && <Skeleton />}
                    {!isLoading && faq && (
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
