import { FadeInOnMount, TitledSection } from '@/components'

export default function FaqPage() {
    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="FAQ" className="w-3/4"></TitledSection>
        </FadeInOnMount>
    )
}
