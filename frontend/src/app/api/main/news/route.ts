import { getNews } from '@/utils/notion/news'

export async function GET() {
    const response = await getNews()

    return Response.json(response)
}
