import { fetchCurriculums, fetchGpu, fetchIntroductions } from '@/libs/actions'
import { CuaiTitle, Curriculum, Introduction, NipaGpu } from './_components'

export default async function HomePage() {
    const [introductions, curriculums, gpu] = await Promise.all([fetchIntroductions(), fetchCurriculums(), fetchGpu()])

    return (
        <div className="flex flex-col space-y-36 md:space-y-20">
            <CuaiTitle />
            <Introduction introductions={introductions} />
            <Curriculum curriculums={curriculums} />
            <NipaGpu gpu={gpu} />
        </div>
    )
}
