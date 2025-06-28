import { Client } from '@notionhq/client'

const notionToken = process.env.NOTION_TOKEN

export const notionClient = new Client({
    auth: notionToken,
})
