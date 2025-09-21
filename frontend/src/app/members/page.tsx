'use client'

import { FadeInOnMount, TitledSection } from '@/components'
import { useGetMembers } from '@/hooks/useGetMembers'
import { CardSkeleton, GenSelector, MemberCard } from './_components'
import { useState } from 'react'

export default function MembersPage() {
    const [selectedGen, setSelectedGen] = useState(8)
    const { data: members, isLoading } = useGetMembers(String(selectedGen))
    const ADMIN = '운영진'

    const sortedMembers = members
        ? [...members].sort((a, b) => {
              const aIsAdmin = a.properties.track.select?.name === ADMIN ? 0 : 1
              const bIsAdmin = b.properties.track.select?.name === ADMIN ? 0 : 1
              return aIsAdmin - bIsAdmin
          })
        : []

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="학회원" className="w-full max-w-[1280px] px-8">
                <p className="text-md md:text-xl text-slate-300 text-center max-w-xs md:max-w-sm break-keep">
                    학회원들을 소개합니다. 상단에서 기수를 선택하면, 각 학회원이 속한 트랙과 관심 분야를 확인할 수
                    있습니다.
                </p>

                <hr className="w-full border-slate-700" />

                <GenSelector gen={selectedGen} setGen={setSelectedGen} />

                <div className="flex flex-wrap gap-7 items-center justify-center">
                    {isLoading ? (
                        Array.from({ length: 9 }).map((_, index) => <CardSkeleton key={index} />)
                    ) : sortedMembers.length > 0 ? (
                        sortedMembers.map((member) => (
                            <div key={member.id} className="[&:nth-last-child(1)]:col-start-2">
                                <MemberCard member={member} />
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-slate-300">to be updated...</div>
                    )}
                </div>
            </TitledSection>
        </FadeInOnMount>
    )
}
