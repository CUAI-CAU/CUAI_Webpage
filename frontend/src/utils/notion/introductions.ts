import { notionClient } from './client'
import { DatabaseObjectResponse } from '@notionhq/client'

const notionPageId = process.env.NOTION_INTRODUCTION_PAGE_ID

export async function getIntroductions(): Promise<DatabaseObjectResponse[]> {
    const response = await notionClient.databases.query({
        database_id: notionPageId!,
        sorts: [
            {
                timestamp: 'created_time',
                direction: 'ascending',
            },
        ],
    })
    return response.results as DatabaseObjectResponse[]
}
