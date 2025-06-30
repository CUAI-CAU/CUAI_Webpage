import { Tag } from '@/types/notion/common'
import { ColoredTag } from './ColoredTag'

export const SelectProperties = ({ label, content }: { label: string; content: Tag }) => (
    <div className="grid grid-cols-4 gap-7">
        <p className="text-slate-400 whitespace-nowrap">{label}</p>
        <ColoredTag text={content.name} color={content.color} />
    </div>
)

export const MultiSelectProperties = ({ label, contents }: { label: string; contents: Tag[] }) => (
    <div className="grid grid-cols-4 gap-7">
        <p className="text-slate-400 whitespace-nowrap">{label}</p>
        <div className="col-span-3 flex flex-row flex-wrap gap-3">
            {contents.map((content) => (
                <ColoredTag key={content.id} text={content.name} color={content.color} />
            ))}
        </div>
    </div>
)
