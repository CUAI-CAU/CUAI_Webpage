import { useGetProjectProperties } from '@/hooks/useGetProjectProperties'
import { Tag } from '@/types/notion/common'

const colorMap: Record<string, string> = {
    default: 'bg-slate-100 text-slate-900',
    red: 'bg-red-200 text-red-900',
    orange: 'bg-orange-200 text-orange-900',
    yellow: 'bg-yellow-100 text-yellow-900',
    green: 'bg-green-200 text-green-900',
    blue: 'bg-blue-200 text-blue-900',
    purple: 'bg-purple-300 text-purple-900',
    pink: 'bg-pink-200 text-pink-900',
    brown: 'bg-[#dbc4ba] text-[#5a3424]',
    gray: 'bg-gray-300 text-gray-900',
}

const TagItem = ({ text, color = 'default' }: { text: string | undefined; color?: string }) => {
    const bgClass = colorMap[color]
    return <p className={`w-fit px-1 rounded-md font-medium whitespace-nowrap ${bgClass}`}>{text}</p>
}

const SelectProperties = ({ label, content }: { label: string; content: Tag }) => (
    <div className="grid grid-cols-4">
        <p className="text-slate-400">{label}</p>
        <TagItem text={content.name} />
    </div>
)

const MultiSelectProperties = ({ label, contents }: { label: string; contents: Tag[] }) => (
    <div className="grid grid-cols-4">
        <p className="text-slate-400">{label}</p>
        <div className="col-span-3 flex flex-row flex-wrap gap-3">
            {contents.map((content) => (
                <TagItem key={content.id} text={content.name} color={content.color} />
            ))}
        </div>
    </div>
)

interface PropertiesRendererProps {
    projectId: string | null
}

export const PropertiesRenderer = ({ projectId }: PropertiesRendererProps) => {
    const { data: properties } = useGetProjectProperties(projectId)

    if (!properties) {
        return (
            <div className="space-y-7">
                <div className="w-full h-28 bg-slate-500 rounded-xl animate-pulse" />
                <div className="space-y-3">
                    <div className="w-full md:w-sm h-5.5 px-1 bg-slate-500 rounded-md animate-pulse" />
                    <div className="w-full md:w-lg h-5.5 px-1 bg-slate-500 rounded-md animate-pulse" />
                </div>

                <hr className="border-slate-400" />
            </div>
        )
    }

    return (
        <div className="space-y-7">
            {properties && (
                <>
                    <h1 className="mb-7 text-xl md:text-3xl font-bold">{properties['이름'].title[0].plain_text}</h1>
                    <div className="px-3 space-y-3 text-sm">
                        <SelectProperties label="컨퍼런스" content={properties['컨퍼런스'].select} />
                        <MultiSelectProperties label="참여자" contents={properties['참여자'].multi_select} />
                    </div>
                </>
            )}

            <hr className="border-slate-400" />
        </div>
    )
}
