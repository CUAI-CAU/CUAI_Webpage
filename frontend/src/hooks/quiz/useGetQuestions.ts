import { axiosInstance } from '@/libs/axios'
import { Question } from '@/types/quiz'
import { useEffect, useState } from 'react'

export const useGetQuestions = () => {
    const [quiz, setQuiz] = useState<Record<string, Question>>({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const { data } = await axiosInstance.get(`quiz/questions`)
                setQuiz(data)
            } catch (error) {
                console.error(error)
                alert('질문을 불러오는 데 실패했습니다.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchQuestions()
    }, [])

    return { quiz, isLoading }
}
