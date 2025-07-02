import { useEffect, useState } from 'react'
import { ToggleBox } from '@/components'
import { ProjectsNotionPage } from '@/types/notion/properties'

interface ProjectSelctorProps {
    projects: ProjectsNotionPage[]
    selectedId: string | null
    handleChange: (key: string) => void
}

export const ProjectSelector = ({ projects, selectedId, handleChange }: ProjectSelctorProps) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => setIsOpen(false), [selectedId])

    return (
        <ToggleBox title="프로젝트 목록" isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="space-y-3">
                {projects.map((project) => (
                    <button
                        type="button"
                        key={project.id}
                        onClick={() => handleChange(project.id)}
                        className="cursor-pointer transition-all duration-500 hover:translate-x-1 hover:text-slate-100"
                    >
                        <div
                            className={`flex flex-row items-center gap-3 text-start list-disc
                                    ${selectedId === project.id && 'font-semibold text-slate-100'} `}
                        >
                            - {project.properties.project_name.title[0].plain_text}
                        </div>
                    </button>
                ))}
            </div>
        </ToggleBox>
    )
}
