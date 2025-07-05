import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { useMemberAuth } from '@/hooks/quiz/useMemberAuth'

const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
})
export type FormFields = z.infer<typeof schema>

interface MemberAuthProps {
    setIsVerified: React.Dispatch<React.SetStateAction<boolean>>
    setUserInfo: React.Dispatch<React.SetStateAction<FormFields>>
}

export const MemberAuth = ({ setIsVerified, setUserInfo }: MemberAuthProps) => {
    const { verifyMember } = useMemberAuth(setIsVerified, setUserInfo)
    const { register, handleSubmit } = useForm<FormFields>({
        defaultValues: { name: '', email: '' },
        resolver: zodResolver(schema),
    })

    const onSubmit: SubmitHandler<FormFields> = verifyMember

    return (
        <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col p-10 border border-none rounded-2xl bg-slate-800">
            <h3 className="mb-7 text-center text-2xl font-medium">Membership Verification</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-1">
                <label className="text-start text-md">Name: </label>
                <input
                    {...register('name')}
                    type="name"
                    placeholder="이름을 입력해주세요."
                    className="w-full text-sm px-3 py-2 border border-slate-500 bg-slate-700 rounded-full"
                />
                <label className="text-start text-md">Email: </label>
                <input
                    {...register('email')}
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    className="w-full text-sm px-3 py-2 border border-slate-500 bg-slate-700 rounded-full"
                />

                <div className="flex justify-center items-center">
                    <button
                        type="submit"
                        className="mt-5 px-7 py-2 rounded-full bg-emerald-500 hover:bg-slate-800 text-slate-800 hover:text-emerald-500 font-semibold
                    transition duration-500 ease-in-out cursor-pointer whitespace-nowrap"
                    >
                        확인하기
                    </button>
                </div>
            </form>
        </div>
    )
}
