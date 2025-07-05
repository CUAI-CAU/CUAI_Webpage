'use client'

import { FadeInOnMount, TitledSection, ToggleBox } from '@/components'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetAwards } from '@/hooks/useGetAwards'

export default function AwardsPage() {
    const { data: awards, isLoading } = useGetAwards()

    const { groupedAwards, yearLabels } = useMemo(() => {
        if (!awards) return { groupedAwards: {}, yearLabels: [] }

        const grouped = awards.reduce<Record<string, string[]>>((acc, page) => {
            const year = page.properties.time_period?.select?.name ?? '기타'
            const title = page.properties.awards?.title?.[0]?.plain_text ?? '제목 없음'
            if (!acc[year]) acc[year] = []
            acc[year].push(title)
            return acc
        }, {})

        const sortedYears = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

        return { groupedAwards: grouped, yearLabels: sortedYears }
    }, [awards])

    const [openStates, setOpenStates] = useState<boolean[]>([])

    useEffect(() => {
        if (!awards) return

        const newLabels = Object.keys(
            awards.reduce<Record<string, string[]>>((acc, page) => {
                const year = page.properties.time_period?.select?.name ?? '기타'
                const title = page.properties.awards?.title?.[0]?.plain_text ?? '제목 없음'
                if (!acc[year]) acc[year] = []
                acc[year].push(title)
                return acc
            }, {})
        ).sort((a, b) => b.localeCompare(a))

        setOpenStates(newLabels.map((_, i) => i === 0))
    }, [awards])

    useEffect(() => {
        if (yearLabels.length === 0) return
        setOpenStates(yearLabels.map((_, i) => i === 0))
    }, [yearLabels])

    const toggleIndex = useCallback((index: number) => {
        setOpenStates((prev) => prev.map((v, i) => (i === index ? !v : v)))
    }, [])

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="수상 내역" className="w-11/12 md:w-3/4 xl:w-2/3 2xl:w-1/2">
                <div className="text-md md:text-xl text-slate-300 text-center max-w-xs md:max-w-sm break-keep">
                    학회원들의 지난 수상 내역입니다. 확인 가능한 자료를 기반으로 구성되었으며, 일부 누락된 내용이 있을
                    수 있습니다.
                </div>

                <div className="w-full border-b border-slate-700" />

                <div className="w-full space-y-7">
                    {isLoading ? (
                        <>
                            <div className="h-80 bg-slate-800 rounded-2xl" />
                            <div className="h-20 bg-slate-800 rounded-2xl" />
                        </>
                    ) : (
                        <>
                            {yearLabels.map((year, index) => (
                                <ToggleBox
                                    key={year}
                                    title={year}
                                    isOpen={openStates[index]}
                                    setIsOpen={() => toggleIndex(index)}
                                >
                                    <ul className="p-0 md:px-5 list-disc list-inside space-y-2">
                                        {groupedAwards[year].map((award, i) => (
                                            <li key={i}>{award}</li>
                                        ))}
                                    </ul>
                                </ToggleBox>
                            ))}
                        </>
                    )}
                </div>
            </TitledSection>
        </FadeInOnMount>
    )
}
