import { axiosInstance } from '@/libs/axios'
import { useState } from 'react'
import { Question, UserInfo } from '@/types/quiz'

interface UseSubmitQuizProps {
    quiz: Record<string, Question>
    answers: Record<string, string>
    userInfo: UserInfo
}

export const useSubmitQuiz = ({ quiz, answers, userInfo }: UseSubmitQuizProps) => {
    const [showAnswers, setShowAnswers] = useState(false)

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

        try {
            const response = await axiosInstance.post(`/quiz/submit`, requestAnswerBody)
            if (response.status === 200) {
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

    return { handleSubmit, showAnswers }
}
