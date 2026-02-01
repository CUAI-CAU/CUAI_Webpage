import { Tag } from '@/types/notion/common'
import { ColoredTag } from './ColoredTag'

export const SelectProperties = ({ label, content }: { label: string; content: Tag | null | undefined }) => (
    <div className="flex flex-row gap-7">
        <p className="w-16 text-slate-400 whitespace-nowrap">{label}</p>
        {content ? <ColoredTag text={content.name} color={content.color} /> : <span className="text-slate-500">-</span>}
    </div>
)

export const MultiSelectProperties = ({ label, contents }: { label: string; contents: Tag[] }) => (
    <div className="flex flex-row gap-7">
        <p className="w-16 text-slate-400 whitespace-nowrap">{label}</p>
        <div className="flex flex-row flex-wrap gap-3">
            {contents.map((content) => (
                <ColoredTag key={content.id} text={content.name} color={content.color} />
            ))}
        </div>
    </div>
)
