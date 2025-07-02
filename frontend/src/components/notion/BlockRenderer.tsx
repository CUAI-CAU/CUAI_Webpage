import { BlockView, CalloutBlockView, ImageBlockView, ParagraphBlockView, VideoBlockView } from '@/types/notion/blocks'
import Image from 'next/image'

export const BlockRenderer = ({ block }: { block: BlockView }) => {
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

const ImageBlock = ({ block }: { block: ImageBlockView }) => {
    return <Image src={block.image.file.url} alt="Notion Image" width={1000} height={800} />
}

const VideoBlock = ({ block }: { block: VideoBlockView }) => {
    return (
        <video controls width="1000">
            <source src={block.video.file.url} type="video/webm" />
        </video>
    )
}
