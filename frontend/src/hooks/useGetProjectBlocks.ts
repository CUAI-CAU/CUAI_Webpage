'use client'

import { useQuery } from '@tanstack/react-query'
import { BlockView } from '@/types/notion/blocks'

async function fetchProjectBlocks(projectId: string): Promise<BlockView[]> {
    const res = await fetch(`/api/projects/${projectId}/blocks`)
    if (!res.ok) throw new Error('Failed to fetch project blocks')
    return res.json()
}

export function useGetProjectBlocks(projectId: string | null) {
    return useQuery({
        queryKey: ['projects', 'blocks', projectId],
        queryFn: () => fetchProjectBlocks(projectId!),
        staleTime: 1000 * 60 * 10,
        enabled: !!projectId,
    })
}
