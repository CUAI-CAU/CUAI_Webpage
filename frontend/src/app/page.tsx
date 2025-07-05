import { CuaiTitle, Curriculum, Introduction, NipaGpu } from './_components'

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
