'use client'

import { useEffect, useState } from 'react'
import { FadeInOnMount, TitledSection } from '@/components'
import { useGetProjects } from '@/hooks/useGetProjects'
import { ProjectRenderer, ProjectSelector, ProjectSelectorSkeleton } from './_components'

export default function ProjectsPage() {
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

    const { data: projects, isLoading } = useGetProjects()

    const handleSelectedProjectIdChange = (id: string) => setSelectedProjectId(id)

    useEffect(() => {
        if (projects) setSelectedProjectId(projects[0].id)
    }, [projects])

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="프로젝트" className="w-6/7 md:w-3/4 xl:w-2/3 2xl:w-1/2">
                <div className="text-md md:text-xl text-slate-300 text-center max-w-xs md:max-w-sm">
                    주요 프로젝트들을 소개합니다. 하단의 토글을 눌러 학회원들이 어떤 문제를 해결하고, 어떤 기술을
                    시도했는지 확인해보세요.
                </div>

                <div className="w-full border-b border-slate-700" />

                <div className="w-full space-y-7">
                    {/* project selector */}
                    {isLoading ? (
                        <ProjectSelectorSkeleton />
                    ) : (
                        <ProjectSelector
                            projects={projects!}
                            selectedId={selectedProjectId}
                            handleChange={handleSelectedProjectIdChange}
                        />
                    )}

                    {/* notion page renderer */}
                    <div className="p-7 rounded-3xl bg-slate-800 text-slate-200">
                        <ProjectRenderer projectId={selectedProjectId} />
                    </div>
                </div>
            </TitledSection>
        </FadeInOnMount>
    )
}
