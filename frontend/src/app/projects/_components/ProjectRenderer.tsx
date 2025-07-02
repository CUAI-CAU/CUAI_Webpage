import { BlockRenderer, MultiSelectProperties, SelectProperties } from '@/components/notion'
import { BlocksSkeleton, PropertiesSkeleton } from './Skeleton'
import { useGetProjectBlocks } from '@/hooks/useGetProjectBlocks'
import { useGetProjectProperties } from '@/hooks/useGetProjectProperties'

interface ProjectRendererProps {
    projectId: string | null
}

export const ProjectRenderer = ({ projectId }: ProjectRendererProps) => {
    const { data: blocks } = useGetProjectBlocks(projectId)
    const { data: properties } = useGetProjectProperties(projectId)

    return (
        <>
            {properties ? (
                <div className="space-y-7">
                    <h1 className="text-xl md:text-3xl font-bold">{properties.project_name.title[0].plain_text}</h1>
                    <div className="text-sm px-3 space-y-3">
                        <SelectProperties label="컨퍼런스" content={properties.conference.select} />
                        <MultiSelectProperties label="참여자" contents={properties.participants.multi_select} />
                    </div>
                </div>
            ) : (
                <PropertiesSkeleton />
            )}

            <hr className="my-10 border-slate-400" />

            {blocks ? (
                <div className="space-y-5">
                    {blocks.map((block) => (
                        <div key={block.id}>
                            <BlockRenderer block={block} />
                        </div>
                    ))}
                </div>
            ) : (
                <BlocksSkeleton />
            )}
        </>
    )
}
