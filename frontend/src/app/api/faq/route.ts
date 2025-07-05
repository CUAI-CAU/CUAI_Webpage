import { getFaq } from '@/utils/notion/faq'

export async function GET() {
    const response = await getFaq()

    return Response.json(response)
}
