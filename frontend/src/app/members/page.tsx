'use client'

import { FadeInOnMount, TitledSection } from '@/components'
import { useGetMembers } from '@/hooks/useGetMembers'
import { GenSelector, MemberCard } from './_components'
import { useState } from 'react'

export default function MembersPage() {
    const [selectedGen, setSelectedGen] = useState(8)
    const { data: members, isLoading } = useGetMembers()

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="학회원" className="w-11/12 xl:w-3/4">
                <div className="text-md md:text-xl text-slate-300 text-center max-w-xs md:max-w-sm break-keep">
                    해당 페이지는 추후 업데이트 예정입니다.
                </div>

                <div className="w-full border-b border-slate-700" />

                <GenSelector gen={selectedGen} setGen={setSelectedGen} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7 place-items-center">
                    {isLoading &&
                        Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="w-72 h-56 rounded-2xl bg-slate-500 animate-pulse" />
                        ))}
                    {members && members.map((member) => <MemberCard key={member.id} member={member} />)}
                </div>
            </TitledSection>
        </FadeInOnMount>
    )
}
