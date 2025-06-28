import { getMembers } from '@/utils/notion/members'

export async function GET() {
    const response = await getMembers()

    return Response.json(response)
}
