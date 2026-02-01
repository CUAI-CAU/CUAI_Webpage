'use client'

import { useEffect, useMemo, useState } from 'react'
import { FadeInOnMount, TitledSection } from '@/components'
import { useGetProjects } from '@/hooks/useGetProjects'
import { ProjectRenderer, ProjectSelector, ProjectSelectorSkeleton, ProjectTypeSelector } from './_components'

export default function ProjectsPage() {
    const { data: projects, isLoading } = useGetProjects()

    const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null)
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

    const normalizeProjectType = (value: string) => value.replace(/\s+/g, ' ').trim()

    // 프로젝트 타입(컨퍼런스) 목록 추출
    const uniqueProjectTypes = useMemo(() => {
        const parseProjectType = (value: string) => {
            const normalized = normalizeProjectType(value)

            const yearMatch = normalized.match(/(\d{4})/)
            const year = yearMatch ? Number(yearMatch[1]) : -1

            // Season priority (higher first)
            // If you add more seasons later, extend this mapping.
            const seasonPriority = normalized.includes('동계') ? 2 : normalized.includes('하계') ? 1 : 0

            return { normalized, year, seasonPriority }
        }

        const unique = [
            ...new Set(
                projects
                    ?.map((p) => p.properties?.conference?.select?.name)
                    .filter(Boolean)
                    .map((name) => normalizeProjectType(name))
            ),
        ]

        return unique.sort((a, b) => {
            const pa = parseProjectType(a)
            const pb = parseProjectType(b)

            if (pa.year !== pb.year) return pb.year - pa.year
            if (pa.seasonPriority !== pb.seasonPriority) return pb.seasonPriority - pa.seasonPriority
            return pa.normalized.localeCompare(pb.normalized, 'ko')
        })
    }, [projects])

    // 현재 선택된 타입의 프로젝트 목록
    const filteredProjects = useMemo(() => {
        if (!projects || !selectedProjectType) return []
        const selected = normalizeProjectType(selectedProjectType)
        return projects.filter((p) => {
            const name = p.properties?.conference?.select?.name
            if (!name) return false
            return normalizeProjectType(name) === selected
        })
    }, [projects, selectedProjectType])

    // 초기 선택값 설정
    useEffect(() => {
        if (projects?.length) {
            const firstWithType = projects.find((p) => !!p.properties?.conference?.select?.name)
            if (firstWithType) {
                setSelectedProjectType(normalizeProjectType(firstWithType.properties.conference.select.name))
                setSelectedProjectId(firstWithType.id)
            } else {
                setSelectedProjectType(null)
                setSelectedProjectId(projects[0].id)
            }
        }
    }, [projects])

    // 타입 변경 시 해당 타입의 첫 프로젝트로 선택 갱신
    useEffect(() => {
        if (filteredProjects.length > 0) setSelectedProjectId(filteredProjects[0].id)
        else setSelectedProjectId(null)
    }, [filteredProjects])

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="프로젝트" className="w-11/12 md:w-3/4 xl:w-3/5 2xl:w-1/2">
                <p className="text-md md:text-xl text-slate-300 text-center max-w-xs md:max-w-sm break-keep">
                    주요 프로젝트들을 소개합니다. 하단의 토글을 눌러 학회원들이 어떤 문제를 해결하고, 어떤 기술을
                    시도했는지 확인해보세요.
                </p>

                <div className="w-full border-b border-slate-700" />

                <div className="w-full flex flex-col lg:flex-row space-y-5 lg:space-x-7">
                    {/* project type selector  */}
                    <ProjectTypeSelector
                        type={uniqueProjectTypes}
                        selectedType={selectedProjectType}
                        setSelectedType={setSelectedProjectType}
                        isLoading={isLoading}
                    />

                    <div className="w-full space-y-5 lg:space-y-7">
                        {/* project selector */}
                        {isLoading ? (
                            <ProjectSelectorSkeleton />
                        ) : (
                            filteredProjects.length > 0 && (
                                <ProjectSelector
                                    projects={filteredProjects}
                                    selectedId={selectedProjectId}
                                    handleChange={setSelectedProjectId}
                                />
                            )
                        )}

                        {/* notion page renderer */}
                        <div className="p-7 rounded-3xl bg-slate-800 text-slate-200">
                            <ProjectRenderer projectId={selectedProjectId} />
                        </div>
                    </div>
                </div>
            </TitledSection>
        </FadeInOnMount>
    )
}
