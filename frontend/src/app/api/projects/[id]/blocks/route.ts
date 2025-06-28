import { getProjectBlocks } from '@/utils/notion/projects'
import { NextRequest } from 'next/server'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const response = await getProjectBlocks(id)

    return Response.json(response)
}
