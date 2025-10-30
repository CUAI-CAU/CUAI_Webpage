'use client'

import { useEffect, useMemo, useState } from 'react'
import { FadeInOnMount, TitledSection } from '@/components'
import { useGetProjects } from '@/hooks/useGetProjects'
import { ConferenceSelector, ProjectSelector, ProjectArticle } from './_components'

export default function ProjectsPage() {
    const { data: projects, isLoading } = useGetProjects()

    const [selectedConference, setSelectedConference] = useState<string | null>(null)
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

    // 컨퍼런스 목록 추출
    const uniqueConferences = useMemo(() => {
        const conferences = [
            ...new Set(projects?.map((p) => p.properties?.conference?.select?.name).filter(Boolean)),
        ] as string[]

        return conferences.sort((a, b) => {
            const [yearA, seasonA] = a.split(' ')
            const [yearB, seasonB] = b.split(' ')

            const yearDiff = parseInt(yearB) - parseInt(yearA) // 연도 내림차순
            if (yearDiff !== 0) return yearDiff

            const seasonOrder = { 동계: 0, 하계: 1 } as const // 시즌 순서: 동계 < 하계
            return seasonOrder[seasonA as keyof typeof seasonOrder] - seasonOrder[seasonB as keyof typeof seasonOrder]
        })
    }, [projects])

    // 현재 선택된 타입의 프로젝트 목록
    const filteredProjects = useMemo(() => {
        if (!projects || !selectedConference) return []

        const projectsByConference = projects.filter(
            (p) => p.properties?.conference?.select?.name === selectedConference
        )

        return projectsByConference.sort((a, b) => {
            const prizeA = a.properties?.prize?.rich_text?.[0]?.plain_text
            const prizeB = b.properties?.prize?.rich_text?.[0]?.plain_text

            const numA = prizeA ? parseInt(prizeA) : 0
            const numB = prizeB ? parseInt(prizeB) : 0

            return numA - numB // prize 오름차순 정렬
        })
    }, [projects, selectedConference])

    // 초기 선택값 설정
    useEffect(() => {
        if (projects?.length && uniqueConferences.length > 0) {
            const firstConference = uniqueConferences[0]
            setSelectedConference(firstConference)

            const firstProject = projects.find((p) => p.properties.conference.select.name === firstConference)
            setSelectedProjectId(firstProject?.id ?? null)
        }
    }, [projects, uniqueConferences])

    // 타입 변경 시 해당 타입의 첫 프로젝트로 선택 갱신
    useEffect(() => {
        if (filteredProjects.length > 0) {
            setSelectedProjectId(filteredProjects[0].id)
        }
    }, [filteredProjects])

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="프로젝트" className="w-full max-w-[1280px] px-8">
                <p className="text-md md:text-xl text-slate-300 text-center max-w-xs md:max-w-sm break-keep">
                    주요 프로젝트들을 소개합니다. 하단의 토글을 눌러 학회원들이 어떤 문제를 해결하고, 어떤 기술을
                    시도했는지 확인해보세요.
                </p>

                <hr className="w-full border-slate-700" />

                <div className="w-full flex flex-col lg:flex-row space-y-5 lg:space-x-7">
                    {/* 컨퍼런스 목록 선택 네비게이션 */}
                    <ConferenceSelector
                        type={uniqueConferences}
                        selectedType={selectedConference}
                        setSelectedType={setSelectedConference}
                        isLoading={isLoading}
                    />

                    <div className="w-full space-y-5 lg:space-y-7">
                        {/* 본선 진출작 목록 선택 네비게이션 */}
                        <ProjectSelector
                            projects={filteredProjects}
                            selectedId={selectedProjectId}
                            handleChange={setSelectedProjectId}
                            isLoading={isLoading}
                        />

                        {/* 프로젝트 노션 페이지 */}
                        <ProjectArticle projectId={selectedProjectId} />
                    </div>
                </div>
            </TitledSection>
        </FadeInOnMount>
    )
}
