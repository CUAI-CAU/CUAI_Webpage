import { BlockView, CalloutBlockView, ImageBlockView, ParagraphBlockView, VideoBlockView } from '@/types/notion/blocks'
import Image from 'next/image'
import { useState } from 'react'

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
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div className="w-full flex justify-center items-center relative min-h-[288px]">
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                    <div className="w-full max-w-[1000px] h-full bg-slate-500 rounded-xl" />
                </div>
            )}

            <Image
                src={block.image?.file?.url}
                alt="Notion Image"
                width={1000}
                height={720}
                onLoadingComplete={() => setIsLoaded(true)}
                className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            />
        </div>
    )
}

const VideoBlock = ({ block }: { block: VideoBlockView }) => {
    return (
        <video controls width="1000">
            <source src={block.video.file.url} type="video/webm" />
        </video>
    )
}
