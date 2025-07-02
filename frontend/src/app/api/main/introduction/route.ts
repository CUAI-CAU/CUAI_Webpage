import { getIntroduction } from '@/utils/notion/introduction'

export async function GET() {
    const response = await getIntroduction()

    return Response.json(response)
}
