'use client'

import { useQuery } from '@tanstack/react-query'
import { ProjectProperty } from '@/types/notion/properties'

async function fetchProjects(): Promise<ProjectProperty[]> {
    const res = await fetch('/api/projects')
    if (!res.ok) throw new Error('Failed to fetch projects')
    return res.json()
}

export function useGetProjects() {
    return useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
        staleTime: 1000 * 60 * 10,
    })
}
