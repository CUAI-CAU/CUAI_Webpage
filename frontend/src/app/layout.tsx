import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../styles/global.css'
import { Footer, NavBar } from './_components'
import Providers from './providers'
import GA from '@/libs/GA'

const pretendard = localFont({
    src: [
        { path: '../styles/fonts/pretendard-100-thin.woff2', weight: '100', style: 'normal' },
        { path: '../styles/fonts/pretendard-400-medium.woff2', weight: '400', style: 'normal' },
        { path: '../styles/fonts/pretendard-600-semibold.woff2', weight: '600', style: 'normal' },
    ],
    variable: '--pretendard',
})

export const metadata: Metadata = {
    title: 'CUAI',
    description:
        '중앙대 인공지능 학회 CUAI는 스터디, 프로젝트, 하계/동계 컨퍼런스 등을 통해 실무와 연구를 연결하는 학술 커뮤니티입니다.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ko">
            <body className={`${pretendard.variable} overflow-x-hidden overflow-y-scroll`}>
                {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
                    <GA gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
                ) : null}
                <NavBar />
                <Providers>
                    <main>{children}</main>
                </Providers>
                <Footer />
            </body>
        </html>
    )
}
