import { FadeInOnMount, TitledSection } from '@/components'

export default function MembersPage() {
    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="학회원" className="w-3/4"></TitledSection>
        </FadeInOnMount>
    )
}
