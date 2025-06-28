import { getProjects } from '@/utils/notion/projects'

export async function GET() {
    const response = await getProjects()

    return Response.json(response)
}
