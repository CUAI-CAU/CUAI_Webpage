'use client'

import { ChevronsUp } from 'lucide-react'

const FOOTER_URL = [
    { label: 'KakaoTalk', url: 'https://pf.kakao.com/_qxkxhxiK' },
    { label: 'GitHub', url: 'https://github.com/CUAI-CAU' },
    { label: 'YouTube', url: 'https://www.youtube.com/@cuai177' },
]

export const Footer = () => {
    return (
        <footer
            className="flex flex-col md:flex-row items-center justify-center md:justify-between
                    bottom-0 mt-20 px-28 py-20 gap-10 bg-[#0E1A2F]"
        >
            {/* left section */}
            <div className="flex flex-col justify-between items-center md:items-start h-full gap-10">
                <div className="flex flex-row gap-7 text-center">
                    {FOOTER_URL.map(({ label, url }, index) => (
                        <button key={index} onClick={() => window.open(url)} className="cursor-pointer">
                            {label}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col items-center gap-2 text-slate-300 whitespace-nowrap md:items-start">
                    <p>CUAI CAU</p>
                    <p>이메일 | admin@cuai.kr</p>
                    <p>© 2025 CUAI CAU. All rights reserved.</p>
                </div>
            </div>

            {/* right section */}
            <div className="flex flex-col justify-between items-center h-full gap-10 md:items-end">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex flex-row items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                    <ChevronsUp /> Scroll to top
                </button>
                <img src="/images/cuai.png" alt="CUAI Logo" className="w-32 md:w-56" />
            </div>
        </footer>
    )
}
