import { CurriculumNotionPage, GpuNotionPage, IntroductionNotionPage, NewsNotionPage } from '@/types/notion/properties'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

export async function fetchIntroductions(): Promise<IntroductionNotionPage[]> {
    const res = await fetch(`${baseUrl}/api/main/introduction`, {
        next: { revalidate: 600 },
    })

    if (!res.ok) throw new Error('Failed to fetch main page introduction')
    return res.json()
}

export async function fetchCurriculums(): Promise<CurriculumNotionPage[]> {
    const res = await fetch(`${baseUrl}/api/main/curriculum`, {
        next: { revalidate: 600 },
    })

    if (!res.ok) throw new Error('Failed to fetch main page curriculum')
    return res.json()
}

export async function fetchGpu(): Promise<GpuNotionPage[]> {
    const res = await fetch(`${baseUrl}/api/main/gpu`, {
        next: { revalidate: 600 },
    })

    if (!res.ok) throw new Error('Failed to fetch main page gpu')
    return res.json()
}

export async function fetchNews(): Promise<NewsNotionPage[]> {
    const res = await fetch(`${baseUrl}/api/main/news`, {
        next: { revalidate: 600 },
    })
    if (!res.ok) throw new Error('Failed to fetch main page news')
    return res.json()
}
