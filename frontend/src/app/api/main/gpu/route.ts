import { getGpu } from '@/utils/notion/gpu'

export async function GET() {
    const response = await getGpu()

    return Response.json(response)
}
