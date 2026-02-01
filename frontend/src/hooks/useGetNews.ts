'use client'

import { NewsNotionPage } from '@/types/notion/properties'
import { useQuery } from '@tanstack/react-query'

async function fetchNews(): Promise<NewsNotionPage[]> {
    const res = await fetch('/api/main/news')
    if (!res.ok) throw new Error('Failed to fetch main page news')
    return res.json()
}

export function useGetNews() {
    return useQuery({
        queryKey: ['news'],
        queryFn: fetchNews,
        staleTime: 1000 * 60 * 10,
    })
}
