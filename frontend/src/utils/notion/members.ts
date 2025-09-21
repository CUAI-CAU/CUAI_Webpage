import { notionClient } from './client'
import { DatabaseObjectResponse } from '@notionhq/client'

const notionPageId = process.env.NOTION_MEMBERS_PAGE_ID

export async function getMembers({ gen }: { gen: string }): Promise<DatabaseObjectResponse[]> {
    const response = await notionClient.databases.query({
        database_id: notionPageId!,
        filter: {
            property: 'year',
            multi_select: {
                contains: gen,
            },
        },
        sorts: [
            {
                timestamp: 'created_time',
                direction: 'ascending',
            },
        ],
    })
    return response.results as DatabaseObjectResponse[]
}
