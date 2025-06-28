import { FadeInOnMount, TitledSection } from '@/components'

export default function QuizPage() {
    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="과제 제출" className="w-3/4"></TitledSection>
        </FadeInOnMount>
    )
}
