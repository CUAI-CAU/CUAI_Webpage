'use client'

import { useQuery } from '@tanstack/react-query'
import { Properties } from '@/types/notion/properties'

async function fetchProjectProperties(projectId: string): Promise<Properties> {
    const res = await fetch(`/api/projects/${projectId}/properties`)
    if (!res.ok) throw new Error('Failed to fetch project properties')
    return res.json()
}

export function useGetProjectProperties(projectId: string | null) {
    return useQuery({
        queryKey: ['projects', 'properties', projectId],
        queryFn: () => fetchProjectProperties(projectId!),
        staleTime: 1000 * 60 * 10,
        enabled: !!projectId,
    })
}
