'use client'

import { useEffect, useState } from 'react'
import { FadeInOnMount, TitledSection } from '@/components'
import { useGetProjects } from '@/hooks/useGetProjects'
import { BlocksRenderer, ProjectSelector, PropertiesRenderer } from './_components'

export default function ProjectsPage() {
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

    const { data: projects } = useGetProjects()

    const handleSelectedProjectIdChange = (id: string) => setSelectedProjectId(id)

    useEffect(() => {
        if (projects) setSelectedProjectId(projects[0].id) // 첫 번째 프로젝트로 설정
    }, [projects])

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="프로젝트" className="w-3/4 xl:w-2/3 2xl:w-1/2">
                <div className="text-md md:text-xl text-slate-300 text-center max-w-sm">
                    학회원들이 진행한 주요 프로젝트들을 소개합니다. 어떤 문제를 해결하고, 어떤 기술을 시도했는지
                    확인해보세요.
                </div>
                <div className="w-full border-b border-slate-700" />

                <div className="flex flex-col w-full gap-7">
                    <ProjectSelector
                        projects={projects}
                        selectedId={selectedProjectId}
                        handleChange={handleSelectedProjectIdChange}
                    />
                    <div className="flex flex-col w-full p-7 rounded-3xl space-y-3 bg-slate-800 text-slate-200">
                        <PropertiesRenderer projectId={selectedProjectId} />
                        <BlocksRenderer projectId={selectedProjectId} />
                    </div>
                </div>
            </TitledSection>
        </FadeInOnMount>
    )
}
