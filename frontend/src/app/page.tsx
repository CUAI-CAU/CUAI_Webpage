import { fetchCurriculums, fetchGpu, fetchIntroductions, fetchNews } from '@/libs/actions'
import { CuaiTitle, Curriculum, Introduction, NipaGpu } from './_components'

export default async function HomePage() {
    const [introductions, curriculums, gpu, news] = await Promise.all([
        fetchIntroductions(),
        fetchCurriculums(),
        fetchGpu(),
        fetchNews(),
    ])

    return (
        <div className="flex flex-col space-y-36 md:space-y-20">
            <CuaiTitle news={news} />
            <Introduction introductions={introductions} />
            <Curriculum curriculums={curriculums} />
            <NipaGpu gpu={gpu} />
        </div>
    )
}
