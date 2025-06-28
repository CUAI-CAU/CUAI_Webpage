import { useEffect, useState } from 'react'
import { ToggleBox } from '@/components'
import { ProjectProperty } from '@/types/notion/properties'

interface ProjectSelctorProps {
    projects: ProjectProperty[] | null
    selectedId: string | null
    handleChange: (key: string) => void
}

export const ProjectSelector = ({ projects, selectedId, handleChange }: ProjectSelctorProps) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => setIsOpen(false), [selectedId])

    if (!projects) return <div className="h-24 bg-slate-800 rounded-2xl " />

    return (
        <ToggleBox
            title={projects.find((p) => p.id === selectedId)?.properties['이름'].title[0].plain_text}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className="space-y-3">
                {projects
                    .filter((project) => project.id !== selectedId)
                    .map((project) => (
                        <button
                            key={project.id}
                            onClick={() => handleChange(project.id)}
                            className="cursor-pointer transition-all duration-500 hover:translate-x-1 hover:text-slate-100"
                        >
                            <div
                                className={`flex flex-row items-center gap-3 text-start
                                    ${selectedId === project.id && 'font-semibold text-slate-100'} `}
                            >
                                {project.properties['이름'].title[0].plain_text}
                            </div>
                        </button>
                    ))}
            </div>
        </ToggleBox>
    )
}
