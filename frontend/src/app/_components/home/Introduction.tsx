import { FadeInOnScroll } from '@/components'
import { WHOAREWE } from '@/constants/home'

interface WhoAreWeCardProps {
    label: string
    info: string
    description: string
}

const WhoAreWeCard = ({ label, info, description }: WhoAreWeCardProps) => {
    return (
        <div className="flex flex-row gap-5 text-start">
            <div className="flex flex-col w-1/4 md:w-1/3 whitespace-nowraps">
                <div className="text-sm md:text-md text-slate-500">{label}</div>
                <div className="text-2xl md:text-3xl font-medium text-slate-300">{info}</div>
            </div>
            <div className="flex w-3/4 md:w-2/3">{description}</div>
        </div>
    )
}

export const Introduction = () => {
    return (
        <FadeInOnScroll className="flex items-center justify-center min-h-screen">
            <section className="flex flex-col w-6/7 md:w-3/4 xl:w-2/3 2xl:w-1/2 space-y-10">
                <div className="text-center md:text-start text-5xl font-semibold">학회 소개</div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* left section */}
                    <div className="flex flex-col justify-between p-3 text-center md:text-start whitespace-pre-line">
                        <div className="text-3xl md:text-4xl">
                            &ldquo;CUAI는 중앙대학교{'\n'}
                            <span className="text-emerald-500"> 유일의 인공지능 학회</span>입니다.&ldquo;
                        </div>

                        <div className="mt-10 text-lg md:text-xl text-slate-400">
                            인공지능에 열정을 가진 학생들이 함께 모여{'\n'}
                            지식을 나누고 성장하는 학회입니다.
                            {'\n\n'}
                            세미나, 프로젝트, 스터디 등을 통해{'\n'} AI 역량을 키워나가고 있습니다.
                        </div>
                    </div>

                    {/* right section */}
                    <div className="col-span-1 flex flex-col p-5 md:p-7 border border-none rounded-3xl bg-slate-800">
                        {WHOAREWE.map((whoarewe, index) => (
                            <div key={index} className="mb-3 last:mb-0">
                                <WhoAreWeCard {...whoarewe} />

                                {/* 카드 구분선 */}
                                {index < WHOAREWE.length - 1 && <div className="border-b border-slate-700 my-5" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </FadeInOnScroll>
    )
}
