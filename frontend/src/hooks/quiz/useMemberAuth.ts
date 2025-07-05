import { useCallback } from 'react'
import { axiosInstance } from '@/libs/axios'
import { FormFields } from '@/app/quiz/_components'

export const useMemberAuth = (setIsVerified: (verified: boolean) => void, setUserInfo: (info: FormFields) => void) => {
    const verifyMember = useCallback(
        async ({ name, email }: FormFields) => {
            try {
                const params = new URLSearchParams({ name, email }).toString()
                const response = await axiosInstance.get(`/quiz/verification?${params}`)

                if (response.status === 200 && response.data === 'Success') {
                    setUserInfo({ name, email })
                    setIsVerified(true)
                } else {
                    throw new Error('인증 실패')
                }
            } catch (error) {
                console.error('회원 인증 실패:', error)
                alert('회원 인증에 실패했습니다. 정보를 다시 확인해 주세요.')
            }
        },
        [setUserInfo, setIsVerified]
    )

    return { verifyMember }
}
