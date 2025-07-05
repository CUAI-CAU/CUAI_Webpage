'use client'

import { IntroductionNotionPage } from '@/types/notion/properties'
import { useQuery } from '@tanstack/react-query'

async function fetchIntroductions(): Promise<IntroductionNotionPage[]> {
    const res = await fetch('/api/main/introduction')
    if (!res.ok) throw new Error('Failed to fetch main page introduction')
    return res.json()
}

export function useGetIntroductions() {
    return useQuery({
        queryKey: ['main', 'introduction'],
        queryFn: fetchIntroductions,
        staleTime: 1000 * 60 * 10,
    })
}
