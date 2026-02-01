'use client'

import { MembersNotionPage } from '@/types/notion/properties'
import { useQuery } from '@tanstack/react-query'

async function fetchMembers(gen: string): Promise<MembersNotionPage[]> {
    const res = await fetch(`/api/members?gen=${gen}`)
    if (!res.ok) throw new Error('Failed to fetch members')
    return res.json()
}

export function useGetMembers(gen: string) {
    return useQuery({
        queryKey: ['members', gen],
        queryFn: () => fetchMembers(gen),
        staleTime: 1000 * 60 * 10,
        enabled: !!gen,
    })
}
