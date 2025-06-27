import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../styles/globals.css'

const pretendard = localFont({
    src: [
        { path: '../styles/fonts/pretendard-thin-100.woff2', weight: '100', style: 'normal' },
        { path: '../styles/fonts/pretendard-light-300.woff2', weight: '300', style: 'normal' },
        { path: '../styles/fonts/pretendard-semibold-600.woff2', weight: '600', style: 'normal' },
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
            <body className={`${pretendard.variable} min-w-xs`}>
                <main>{children}</main>
            </body>
        </html>
    )
}
