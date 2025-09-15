'use client'

import { FadeInOnMount, TitledSection } from '@/components'
import { useGetMembers } from '@/hooks/useGetMembers'
import { CardSkeleton, GenSelector, MemberCard } from './_components'
import { useState } from 'react'

export default function MembersPage() {
    const [selectedGen, setSelectedGen] = useState(8)
    const { data: members, isLoading } = useGetMembers()

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="학회원" className="w-full max-w-[1280px] px-8">
                <p className="text-md md:text-xl text-slate-300 text-center max-w-xs md:max-w-sm break-keep">
                    해당 페이지는 추후 업데이트 예정입니다.
                </p>

                <hr className="w-full border-slate-700" />

                <GenSelector gen={selectedGen} setGen={setSelectedGen} />

                <div className="flex flex-wrap gap-7 items-center justify-center">
                    {isLoading && Array.from({ length: 9 }).map((_, index) => <CardSkeleton key={index} />)}
                    {members &&
                        members.map((member) => (
                            <div key={member.id} className="[&:nth-last-child(1)]:col-start-2">
                                <MemberCard member={member} />
                            </div>
                        ))}
                </div>
            </TitledSection>
        </FadeInOnMount>
    )
}
