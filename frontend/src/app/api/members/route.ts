import { getMembers } from '@/utils/notion/members'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const gen = searchParams.get('gen') ?? ''

    const response = await getMembers({ gen })

    return Response.json(response)
}
