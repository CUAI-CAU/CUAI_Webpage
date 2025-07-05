'use client'

import { FadeInOnMount, TitledSection } from '@/components'
import { useEffect, useMemo, useState } from 'react'
import { useGetAwards } from '@/hooks/useGetAwards'
import { LabelSelector } from './_components'
import { groupAwardsByLabel, GroupedAward } from '@/utils/groupAwardsByLabel'

const AwardsSkeleton = () => {
    return <div className="h-[428px] bg-slate-500 rounded-2xl animate-pulse" />
}

const Awards = ({ awards }: { awards: GroupedAward }) => {
    return (
        <ul className="w-full p-7 bg-slate-800 rounded-2xl text-start space-y-3">
            {awards && awards.awards.map((award, index) => <li key={index}>&bull; {award.awardTitle}</li>)}
        </ul>
    )
}

export default function AwardsPage() {
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
    const { data: awards, isLoading } = useGetAwards()

    const groupedAwards = useMemo(() => groupAwardsByLabel(awards), [awards])

    useEffect(() => {
        if (groupedAwards.length > 0) setSelectedLabel(groupedAwards[0].label)
    }, [groupedAwards])

    const selectedAwards = groupedAwards.find((group) => group.label === selectedLabel)

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="수상 내역" className="w-11/12 md:w-3/4 xl:w-3/5 2xl:w-1/2">
                <div className="text-md md:text-xl text-slate-300 text-center max-w-xs md:max-w-sm break-keep">
                    학회원들의 지난 수상 내역입니다. 확인 가능한 자료를 기반으로 구성되었으며, 일부 누락된 내용이 있을
                    수 있습니다.
                </div>

                <div className="w-full border-b border-slate-700" />

                <div className="w-full space-y-16">
                    {(isLoading || groupedAwards.length > 0) && (
                        <LabelSelector
                            years={groupedAwards.map((g) => g.label)}
                            label={selectedLabel ?? ''}
                            setLabel={setSelectedLabel}
                            isLoading={groupedAwards.length === 0}
                        />
                    )}

                    {isLoading ? <AwardsSkeleton /> : <Awards awards={selectedAwards!} />}
                </div>
            </TitledSection>
        </FadeInOnMount>
    )
}
