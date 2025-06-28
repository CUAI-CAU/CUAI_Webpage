import { notionClient } from './client'
import { BlockObjectResponse, DatabaseObjectResponse, PageObjectResponse } from '@notionhq/client'

const notionPageId = process.env.NOTION_PROJECTS_PAGE_ID

export async function getProjects(): Promise<DatabaseObjectResponse[]> {
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

export async function getProjectProperties(projectId: string): Promise<PageObjectResponse['properties']> {
    const response = await notionClient.pages.retrieve({ page_id: projectId })
    return (response as PageObjectResponse).properties
}

export async function getProjectBlocks(projectId: string): Promise<BlockObjectResponse[]> {
    const response = await notionClient.blocks.children.list({ block_id: projectId })
    return response.results as BlockObjectResponse[]
}
