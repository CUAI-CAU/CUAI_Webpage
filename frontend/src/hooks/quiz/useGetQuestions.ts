import { axiosInstance } from '@/libs/axios'
import { Question } from '@/types/quiz'
import { useEffect, useState } from 'react'

export const useGetQuestions = () => {
    const [quiz, setQuiz] = useState<Record<string, Question>>({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const clearError = () => setError(null)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const { data } = await axiosInstance.get(`quiz/questions`)
                setQuiz(data)
            } catch (error) {
                console.error(error)
                setError('질문을 불러올 수 없습니다.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchQuestions()
    }, [])

    return { quiz, isLoading, error, clearError }
}
