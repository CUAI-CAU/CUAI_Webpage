'use client'

import * as motion from 'motion/react-client'
import { SquareCheckBig, Trophy, X } from 'lucide-react'
import { NewsNotionPage } from '@/types/notion/properties'

interface NewsToastProps {
    news: NewsNotionPage[]
    onClose: () => void
}

export const NewsToast = ({ news, onClose }: NewsToastProps) => {
    // const goToAwardsPage = () => router.push('/awards')
    const handleClickX = (e: React.MouseEvent) => {
        e.stopPropagation()
        onClose()
    }

    if (!news || news.length === 0) return <></>

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 50, damping: 14 }}
            className="fixed bottom-0 left-0 z-50 max-w-[24rem] m-3 p-5 space-y-2 cursor-pointer rounded-[1rem] bg-slate-200"
        >
            <div className="w-fit p-3 rounded-full bg-slate-700">
                <Trophy className="text-slate-100" />
            </div>
            <h6 className="font-bold text-[1.25rem] text-slate-950">학회 소식</h6>

            <ul className="flex flex-col gap-2 text-slate-950">
                {news?.map((n, index) => (
                    <li key={index} className="flex flex-row gap-2">
                        <SquareCheckBig className="flex-shrink-0" />
                        <p className="line-clamp-2 overflow-hidden min-w-0">{n.properties.title.title[0].plain_text}</p>
                    </li>
                ))}
            </ul>

            <X onClick={(e) => handleClickX(e)} className="absolute top-3 right-3 text-slate-400" />
        </motion.div>
    )
}
