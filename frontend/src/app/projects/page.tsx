import { FadeInOnMount, TitledSection } from '@/components'

export default function ProjectsPage() {
    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="프로젝트" className="w-3/4"></TitledSection>
        </FadeInOnMount>
    )
}
