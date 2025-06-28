import { FadeInOnMount, TitledSection } from '@/components'

export default function AwardsPage() {
    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="수상 내역" className="w-3/4"></TitledSection>
        </FadeInOnMount>
    )
}
