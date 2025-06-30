import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { axiosInstance } from '@/libs/axios'

const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
})
type FormFields = z.infer<typeof schema>

interface MemberAuthProps {
    setIsVerified: React.Dispatch<React.SetStateAction<boolean>>
    setUserInfo: React.Dispatch<React.SetStateAction<FormFields>>
}

export const MemberAuth = ({ setIsVerified, setUserInfo }: MemberAuthProps) => {
    const { register, handleSubmit } = useForm<FormFields>({
        defaultValues: {
            name: '',
            email: '',
        },
        resolver: zodResolver(schema),
    })

    const onSubmit: SubmitHandler<FormFields> = async ({ name, email }) => {
        try {
            const params = new URLSearchParams({ name, email }).toString()
            const response = await axiosInstance.get(`/quiz/verification?${params}`)

            if (response.status === 200 && response.data === 'Success') {
                setUserInfo({ name, email })
                setIsVerified(true)
            }
        } catch (error) {
            console.error('회원 인증 중 오류 발생:', error)
            alert('회원 인증에 실패했습니다. 정보를 다시 확인해 주세요.')
        }
    }

    return (
        <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col p-10 border border-none rounded-2xl bg-slate-800">
            <h3 className="mb-7 text-center text-2xl font-medium">Membership Verification</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-1">
                <label className="text-start">name: </label>
                <input
                    {...register('name')}
                    type="name"
                    placeholder="이름을 입력해주세요."
                    className="w-full text-sm px-3 py-1 border border-slate-500 rounded-full"
                />
                <label className="text-start">email: </label>
                <input
                    {...register('email')}
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    className="w-full text-sm px-3 py-1 border border-slate-500 rounded-full"
                />

                <button
                    type="submit"
                    className="mt-5 px-3 py-1 rounded-full bg-slate-600 hover:bg-slate-700
                    transition duration-300 ease-in-out cursor-pointer whitespace-nowrap"
                >
                    확인하기
                </button>
            </form>
        </div>
    )
}
