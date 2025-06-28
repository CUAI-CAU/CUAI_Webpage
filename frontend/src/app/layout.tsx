import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../styles/globals.css'
import { Footer, NavBar } from './_components'

const pretendard = localFont({
    src: [
        { path: '../styles/fonts/pretendard-100-thin.woff2', weight: '100', style: 'normal' },
        { path: '../styles/fonts/pretendard-300-light.woff2', weight: '300', style: 'normal' },
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
        <html lang="kr">
            <body className={`${pretendard.variable} min-w-xs overflow-x-hidden overflow-y-scroll`}>
                <NavBar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    )
}
