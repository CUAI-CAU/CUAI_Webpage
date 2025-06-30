'use client'

import { AwardsNotionPage } from '@/types/notion/properties'
import { useQuery } from '@tanstack/react-query'

async function fetchAwards(): Promise<AwardsNotionPage[]> {
    const res = await fetch('/api/awards')
    if (!res.ok) throw new Error('Failed to fetch awards')
    return res.json()
}

export function useGetAwards() {
    return useQuery({
        queryKey: ['awards'],
        queryFn: fetchAwards,
        staleTime: 1000 * 60 * 10,
    })
}
