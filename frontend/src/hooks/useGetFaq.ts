'use client'

import { FaqNotionPage } from '@/types/notion/properties'
import { useQuery } from '@tanstack/react-query'

async function fetchFaq(): Promise<FaqNotionPage[]> {
    const res = await fetch('/api/faq')
    if (!res.ok) throw new Error('Failed to fetch faq')
    return res.json()
}

export function useGetFaq() {
    return useQuery({
        queryKey: ['faq'],
        queryFn: fetchFaq,
        staleTime: 1000 * 60 * 10,
    })
}
