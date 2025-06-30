import { useGetProjectBlocks } from '@/hooks/useGetProjectBlocks'
import { BlockView, CalloutBlockView, ImageBlockView, VideoBlockView, ParagraphBlockView } from '@/types/notion/blocks'
import Image from 'next/image'

interface BlockRendererProps {
    projectId: string | null
}

export const BlocksRenderer = ({ projectId }: BlockRendererProps) => {
    const { data: blocks } = useGetProjectBlocks(projectId)

    if (!blocks) {
        return <div className="mt-20 w-full h-screen bg-slate-500 rounded-xl animate-pulse" />
    }

    return (
        <div className="mt-10 space-y-5">
            {blocks &&
                blocks.map((block) => (
                    <div key={block.id}>
                        <NotionBlock block={block} />
                    </div>
                ))}
        </div>
    )
}

const NotionBlock = ({ block }: { block: BlockView }) => {
    switch (block.type) {
        case 'paragraph':
            return <ParagraphBlock block={block} />
        case 'callout':
            return <CalloutBlock block={block} />
        case 'image':
            return <ImageBlock block={block} />
        case 'video':
            return <VideoBlock block={block} />
        case 'divider':
            return <hr className="my-4 border-slate-400" />
    }
}

const ParagraphBlock = ({ block }: { block: ParagraphBlockView }) => {
    return (
        <p>
            {block.paragraph.rich_text.map((text, idx) => (
                <span key={idx} className={text.annotations.bold ? 'font-bold' : ''}>
                    {text.plain_text}
                </span>
            ))}
        </p>
    )
}

const ImageBlock = ({ block }: { block: ImageBlockView }) => {
    return <Image src={block.image.file.url} alt="Notion Image" width={1000} height={0} />
}

const VideoBlock = ({ block }: { block: VideoBlockView }) => {
    return (
        <video controls width="1000">
            <source src={block.video.file.url} type="video/webm" />
        </video>
    )
}

const CalloutBlock = ({ block }: { block: CalloutBlockView }) => {
    const { icon, rich_text } = block.callout

    return (
        <div className={`flex items-start gap-2 rounded-md p-4 my-10 bg-slate-600`}>
            <div className="text-xl">{icon?.emoji ?? '💬'}</div>
            <div className="text-base leading-relaxed">
                {rich_text.map((text, i) => (
                    <span key={i}>{text.plain_text}</span>
                ))}
            </div>
        </div>
    )
}
