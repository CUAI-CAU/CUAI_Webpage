'use client'

import { ProjectProperties } from '@/types/notion/properties'
import { useQuery } from '@tanstack/react-query'

async function fetchProjectProperties(projectId: string): Promise<ProjectProperties> {
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
