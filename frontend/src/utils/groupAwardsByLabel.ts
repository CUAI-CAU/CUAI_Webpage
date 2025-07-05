import { AwardsNotionPage } from '@/types/notion/properties'

export type GroupedAward = {
    label: string
    awards: { awardTitle: string }[]
}

export function groupAwardsByLabel(awards: AwardsNotionPage[] | undefined): GroupedAward[] {
    if (!awards) return []

    const grouped = awards.reduce<Record<string, { awardTitle: string }[]>>((acc, award) => {
        const year = award.properties.time_period.select.name
        const awardTitle = award.properties.awards.title[0].plain_text

        if (!acc[year]) acc[year] = []
        acc[year].push({ awardTitle })

        return acc
    }, {})

    return Object.entries(grouped)
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([year, awards]) => ({
            label: year,
            awards,
        }))
}
