import { getIntroductions } from '@/utils/notion/introductions'

export async function GET() {
    const response = await getIntroductions()

    return Response.json(response)
}
