import Link from 'next/link'

export default function NotFoundPage() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen gap-10">
            <h1 className="text-7xl font-semibold">404</h1>

            <div className="hidden md:flex border-r border-slate-400 h-28" />
            <div className="md:hidden border-b border-slate-400 w-5/6" />

            <div className="text-center md:text-start space-y-3">
                <p className="text-xl">페이지를 찾을 수 없습니다.</p>
                <Link href="/" className="text-emerald-500 underline">
                    홈으로 돌아가기
                </Link>
            </div>
        </div>
    )
}
