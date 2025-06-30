'use client'

import { ProjectsNotionPage } from '@/types/notion/properties'
import { useQuery } from '@tanstack/react-query'

async function fetchProjects(): Promise<ProjectsNotionPage[]> {
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
