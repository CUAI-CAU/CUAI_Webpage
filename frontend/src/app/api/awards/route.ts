import { getAwards } from '@/utils/notion/awards'

export async function GET() {
    const response = await getAwards()

    return Response.json(response)
}
