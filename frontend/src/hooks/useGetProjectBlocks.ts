'use client'

import { BlockView } from '@/types/notion/blocks'
import { useEffect, useState } from 'react'

export function useGetProjectBlocks(projectId: string | null) {
    const [data, setData] = useState<BlockView[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!projectId) return

        const fetchData = async () => {
            try {
                setIsLoading(true)
                const res = await fetch(`/api/projects/${projectId}/blocks`)
                if (!res.ok) throw new Error('Failed to fetch projects')
                setData(await res.json())
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [projectId])

    return { data, isLoading }
}
