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
        <ToggleBox title="본선 진출작 목록" isOpen={isOpen} setIsOpen={setIsOpen}>
            <ul className="flex flex-col space-y-3">
                {projects.map((project) => (
                    <li key={project.id}>
                        <button
                            type="button"
                            onClick={() => handleChange(project.id)}
                            className={`w-full cursor-pointer flex flex-row text-start
                            transition-all duration-500 hover:translate-x-1
                            ${selectedId === project.id && 'font-semibold text-slate-100'}`}
                        >
                            <span className="w-full truncate lg:whitespace-normal">
                                &bull; {project.properties.project_name.title[0]?.plain_text}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </ToggleBox>
    )
}
