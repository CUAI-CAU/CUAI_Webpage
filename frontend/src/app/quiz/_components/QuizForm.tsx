'use client'

import { axiosInstance } from '@/libs/axios'
import { Question, UserInfo } from '@/types/quiz'
import { useState } from 'react'

interface QuizFormProps {
    quiz: Record<string, Question>
    answers: Record<string, string>
    setAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>
    userInfo: UserInfo
}

export const QuizForm = ({ quiz, answers, setAnswers, userInfo }: QuizFormProps) => {
    const [showAnswers, setShowAnswers] = useState(false)

    const handleAnswerChange = (key: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const isAllAnswered = Object.keys(quiz).every((key) => (answers[key] || '').trim() !== '')
        if (!isAllAnswered) {
            alert('모든 질문에 답변을 작성해주세요.')
            return
        }

        const requestAnswerBody = {
            name: userInfo.name,
            email: userInfo.email,
            ...Object.fromEntries(Object.keys(quiz).map((k, i) => [`ans${i + 1}`, answers[k] || ''])),
        }
        console.log(requestAnswerBody)

        try {
            const response = await axiosInstance.post(`/quiz/submit`, requestAnswerBody)

            if (response.status === 200) {
                console.log(response)
                alert('제출 성공! 정답을 확인하세요.')
                setShowAnswers(true)
            } else {
                alert('제출에 실패했습니다. 다시 시도해 주세요.')
            }
        } catch (error) {
            alert('오류 발생! 제출에 실패했습니다.')
            console.error(error)
        }
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
