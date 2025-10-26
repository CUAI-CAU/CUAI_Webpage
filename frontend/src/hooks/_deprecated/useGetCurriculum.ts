'use client'

import { CurriculumNotionPage } from '@/types/notion/properties'
import { useQuery } from '@tanstack/react-query'

async function fetchCurriculum(): Promise<CurriculumNotionPage[]> {
    const res = await fetch('/api/main/curriculum')
    if (!res.ok) throw new Error('Failed to fetch main page curriculum')
    return res.json()
}

export function useGetCurriculum() {
    return useQuery({
        queryKey: ['main', 'curriculum'],
        queryFn: fetchCurriculum,
        staleTime: 1000 * 60 * 10,
    })
}
