'use client'

import { useEffect, useMemo, useState } from 'react'
import { FadeInOnMount, TitledSection } from '@/components'
import { useGetProjects } from '@/hooks/useGetProjects'
import { ProjectRenderer, ProjectSelector, ProjectSelectorSkeleton, ProjectTypeSelector } from './_components'
import { ProjectsNotionPage } from '@/types/notion/properties'

export default function ProjectsPage() {
    const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null)
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
    const [selectedProject, setSelectedProject] = useState<ProjectsNotionPage[] | null>(null)

    const { data: projects, isLoading } = useGetProjects()

    const handleSelectedProjectIdChange = (id: string) => setSelectedProjectId(id)

    const uniqueProjectType = useMemo(() => {
        return [...new Set(projects?.map((project) => project.properties?.conference?.select?.name).filter(Boolean))]
    }, [projects])

    useEffect(() => {
        if (projects && projects.length > 0) {
            const firstId = projects[0].id
            const firstType = projects[0].properties?.conference?.select?.name

            setSelectedProjectId(firstId)
            setSelectedProjectType(firstType)
        }
    }, [projects])

    useEffect(() => {
        if (projects && projects.length > 0) {
            const newSelectedProjects = projects.filter(
                (project) => project.properties.conference.select.name === selectedProjectType
            )
            const newFirstId = newSelectedProjects[0]?.id

            setSelectedProject(newSelectedProjects)
            setSelectedProjectId(newFirstId)
        }
    }, [projects, selectedProjectType])

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="프로젝트" className="w-11/12 md:w-3/4">
                <div className="text-md md:text-xl text-slate-300 text-center max-w-xs md:max-w-sm">
                    주요 프로젝트들을 소개합니다. 하단의 토글을 눌러 학회원들이 어떤 문제를 해결하고, 어떤 기술을
                    시도했는지 확인해보세요.
                </div>

                <div className="w-full border-b border-slate-700" />

                <div className="flex flex-col lg:flex-row w-full space-y-5 lg:space-x-7">
                    {/* project type selector  */}
                    <ProjectTypeSelector
                        type={uniqueProjectType}
                        selectedType={selectedProjectType}
                        setSelectedType={setSelectedProjectType}
                        isLoading={isLoading}
                    />

                    <div className="w-full space-y-5 lg:space-y-7">
                        {/* project selector */}
                        {isLoading ? (
                            <ProjectSelectorSkeleton />
                        ) : selectedProject ? (
                            <ProjectSelector
                                projects={selectedProject}
                                selectedId={selectedProjectId}
                                handleChange={handleSelectedProjectIdChange}
                            />
                        ) : null}

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
