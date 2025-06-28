'use client'

import { ProjectProperty } from '@/types/notion/properties'
import { useEffect, useState } from 'react'

export function useGetProjects() {
    const [data, setData] = useState<ProjectProperty[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        try {
            setIsLoading(true)
            const fetchData = async () => {
                const res = await fetch('/api/projects')
                if (!res.ok) throw new Error('Failed to fetch projects')
                setData(await res.json())
            }
            fetchData()
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    return { data, isLoading }
}
