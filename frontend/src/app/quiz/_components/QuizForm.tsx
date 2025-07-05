'use client'

import { useSubmitQuiz } from '@/hooks/quiz/useSubmitQuiz'
import { Question, UserInfo } from '@/types/quiz'
import React, { useEffect } from 'react'

interface QuizFormProps {
    ref: React.RefObject<HTMLDivElement | null>
    quiz: Record<string, Question>
    answers: Record<string, string>
    setAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>
    userInfo: UserInfo
}

export const QuizForm = ({ ref, quiz, answers, setAnswers, userInfo }: QuizFormProps) => {
    const { handleSubmit, showAnswers } = useSubmitQuiz({ quiz, answers, userInfo })

    useEffect(() => {
        if (showAnswers && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [showAnswers, ref])

    const handleAnswerChange = (key: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [key]: value }))
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-20">
            {Object.keys(quiz).map((key) => (
                <div key={key} className="flex flex-col w-full space-y-5">
                    <label className="text-start text-2xl text-emerald-500">{key}.</label>
                    <div className="whitespace-pre-line text-start">{quiz[key].question}</div>
                    <textarea
                        value={answers[key] || ''}
                        onChange={(e) => handleAnswerChange(key, e.target.value)}
                        placeholder={`Answer for ${key}`}
                        className="border border-slate-700 rounded-xl px-3 py-2 h-36 resize-none bg-slate-900"
                        disabled={showAnswers}
                    />

                    {showAnswers && (
                        <div className="border border-none rounded-xl p-5 bg-slate-800 text-start text-emerald-600">
                            Answer: <span className="text-slate-300">{quiz[key].answer}</span>
                        </div>
                    )}
                </div>
            ))}

            <button
                type="submit"
                className="flex justify-center items-center px-5 py-3
                        bg-emerald-500 text-slate-800 font-semibold rounded-full
                        hover:translate-y-1 whitespace-nowrap
                        transition duration-300 ease-in-out cursor-pointer"
            >
                과제 제출하기
            </button>
        </form>
    )
}
