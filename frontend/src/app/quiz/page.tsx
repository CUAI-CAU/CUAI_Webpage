'use client'

import { FadeInOnMount, TitledSection } from '@/components'
import { MemberAuth, QuizForm } from './_components'
import { useEffect, useRef, useState } from 'react'
import { UserInfo } from '@/types/quiz'
import { useGetQuestions } from '@/hooks/quiz/useGetQuestions'

export default function QuizPage() {
    const [isVerified, setIsVerified] = useState(false)
    const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', email: '' })
    const [answers, setAnswers] = useState<Record<string, string>>({})

    const scrollRef = useRef<HTMLDivElement | null>(null)

    const { quiz } = useGetQuestions()

    // 인증 완료 시 퀴즈 질문으로 자동 스크롤
    useEffect(() => {
        if (isVerified && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [isVerified])

    return (
        <FadeInOnMount className="flex justify-center items-center">
            <TitledSection title="과제 제출" className="w-5/6 md:w-3/4 xl:w-2/3 2xl:w-1/2">
                <div className="text-md md:text-xl text-slate-300 text-center max-w-xs md:max-w-sm break-keep">
                    베이직 트랙 학회원들이 매주 과제를 제출하는 공간입니다. 회원 확인을 진행해주세요.
                </div>
                <div ref={scrollRef} className="w-full border-b border-slate-700" />

                {!isVerified && (
                    <>
                        <MemberAuth setIsVerified={setIsVerified} setUserInfo={setUserInfo} />
                        <p className="text-md md:text-xl text-slate-300 text-center whitespace-pre-line">
                            과제 페이지는 학회원만 열람 가능합니다.
                        </p>
                    </>
                )}
                {isVerified && (
                    <div className="mt-10 max-w-2xl flex flex-col items-center space-y-16">
                        <h3 className="text-3xl font-semibold">Quiz Questions</h3>
                        <QuizForm
                            ref={scrollRef}
                            quiz={quiz}
                            answers={answers}
                            setAnswers={setAnswers}
                            userInfo={userInfo}
                        />
                    </div>
                )}
            </TitledSection>
        </FadeInOnMount>
    )
}
