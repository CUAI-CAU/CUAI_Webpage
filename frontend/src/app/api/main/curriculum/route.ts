import { getCurriculum } from '@/utils/notion/curriculum'

export async function GET() {
    const response = await getCurriculum()

    return Response.json(response)
}
