'use client'

import { GpuNotionPage } from '@/types/notion/properties'
import { useQuery } from '@tanstack/react-query'

async function fetchGpu(): Promise<GpuNotionPage[]> {
    const res = await fetch('/api/main/gpu')
    if (!res.ok) throw new Error('Failed to fetch main page gpu')
    return res.json()
}

export function useGetGpu() {
    return useQuery({
        queryKey: ['main', 'gpu'],
        queryFn: fetchGpu,
        staleTime: 1000 * 60 * 10,
    })
}
