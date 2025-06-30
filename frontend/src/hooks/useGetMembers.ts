'use client'

import { MembersNotionPage } from '@/types/notion/properties'
import { useQuery } from '@tanstack/react-query'

async function fetchMembers(): Promise<MembersNotionPage[]> {
    const res = await fetch('/api/members')
    if (!res.ok) throw new Error('Failed to fetch members')
    return res.json()
}

export function useGetMembers() {
    return useQuery({
        queryKey: ['members'],
        queryFn: fetchMembers,
        staleTime: 1000 * 60 * 10,
    })
}
