import { CuaiTitle, Curriculum, Introduction } from './_components'
import { NipaGpu } from './_components/home/NipaGpu'

export default function HomePage() {
    return (
        <div className="flex flex-col space-y-36 md:space-y-20">
            <CuaiTitle />
            <Introduction />
            <Curriculum />
            <NipaGpu />
        </div>
    )
}
