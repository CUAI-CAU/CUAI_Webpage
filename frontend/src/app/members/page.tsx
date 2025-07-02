'use client'

import { useState } from 'react'
import { FadeInOnMount, TitledSection } from '@/components'
import { ColoredTag } from '@/components/notion'
import { UserRound } from 'lucide-react'
// import { useGetMembers } from '@/hooks/useGetMembers'

const TEMP_MEMBERS_BY_GENERATION = [
    {
        generation: 6,
        members: [],
    },
    {
        generation: 7,
        members: [
            { id: 1, name: '쿠아일', major: 'CUAI학과', interest: ['Multimodal', 'CV'] },
            { id: 2, name: '쿠아이', major: 'CUAI학과', interest: ['NLP', 'Data Analysis'] },
            { id: 3, name: '쿠아삼', major: 'CUAI학과', interest: ['CV'] },
            { id: 4, name: '쿠아사', major: 'CUAI학과', interest: ['NLP', 'Data Analysis'] },
            { id: 5, name: '쿠아오', major: 'CUAI학과', interest: ['Multimodal', 'CV'] },
            { id: 6, name: '쿠아육', major: 'CUAI학과', interest: ['Data Analysis'] },
            { id: 7, name: '쿠아칠', major: 'CUAI학과', interest: ['Multimodal'] },
            { id: 8, name: '쿠아팔', major: 'CUAI학과', interest: ['NLP'] },
            { id: 9, name: '쿠아구', major: 'CUAI학과', interest: ['Multimodal', 'CV'] },
            { id: 10, name: '쿠아십', major: 'CUAI학과', interest: ['NLP', 'Data Analysis'] },
        ],
    },
]

export default function MembersPage() {
    const [selectedGeneration, setSelectedGeneration] = useState(7)
    // const { data: members, isLoading } = useGetMembers()

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="학회원" className="w-11/12 md:w-3/4 xl:w-2/3">
                <div className="text-md md:text-xl text-slate-300 text-center max-w-xs md:max-w-sm">
                    해당 페이지는 추후 업데이트 예정입니다.
                </div>

                <div className="w-full border-b border-slate-700" />

                <div className="flex justify-center gap-3">
                    {TEMP_MEMBERS_BY_GENERATION.map((section) => (
                        <button
                            key={section.generation}
                            disabled
                            onClick={() => setSelectedGeneration(section.generation)}
                            className={`cursor-pointer px-6 py-1 border border-none rounded-full transition-colors duration-300 ${
                                selectedGeneration === section.generation
                                    ? 'bg-emerald-500 text-slate-800'
                                    : 'text-slate-300 hover:bg-slate-700'
                            }`}
                        >
                            {section.generation}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7 place-items-center">
                    {TEMP_MEMBERS_BY_GENERATION.find(
                        (section) => section.generation === selectedGeneration
                    )?.members.map((member) => (
                        <div
                            key={member.id}
                            className="bg-slate-800/90 rounded-2xl w-60 p-5 space-y-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                        >
                            <div className="text-3xl">
                                <UserRound />
                            </div>
                            <div className="flex flex-row items-end gap-2">
                                <div className="text-xl font-semibold">{member.name}</div>
                                <p className="text-slate-400 text-sm whitespace-nowrap">({member.major})</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-slate-400 text-sm">관심분야</p>
                                <div className="flex flex-wrap gap-2">
                                    {member.interest.map((item, i) => (
                                        <ColoredTag key={i} text={item} color="gray" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </TitledSection>
        </FadeInOnMount>
    )
}
