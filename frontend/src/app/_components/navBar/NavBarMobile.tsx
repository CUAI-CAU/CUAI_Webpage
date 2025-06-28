'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NAVIGATION_ITEM } from './NavBar'

interface HamburgerIconProps {
    isOpen: boolean
    onClick: () => void
}

export const HamburgerIcon = ({ isOpen, onClick }: HamburgerIconProps) => {
    return (
        <div onClick={onClick}>
            <div className="relative w-6 h-4 flex flex-col justify-between items-center">
                <span
                    className={`absolute h-[1.25px] w-full bg-slate-100 rounded-full transition-transform ${
                        isOpen ? 'top-1/2 rotate-45' : 'top-0 rotate-0'
                    }`}
                />
                <span
                    className={`absolute h-[1.25px] w-full bg-slate-100 rounded-full transition-opacity ${
                        isOpen ? 'opacity-0' : 'opacity-100 top-1/2'
                    }`}
                />
                <span
                    className={`absolute h-[1.25px] w-full bg-slate-100 rounded-full transition-transform ${
                        isOpen ? 'top-1/2 -rotate-45' : 'top-full'
                    }`}
                />
            </div>
        </div>
    )
}

export const NavBarMobile = () => {
    const [isOpen, setIsOpen] = useState(false)
    const close = () => setIsOpen(false)

    return (
        <div className="flex p-7 h-16 w-full bg-[#19264b40] backdrop-blur-sm md:hidden">
            <div className="relative w-full z-50 flex justify-between items-center">
                <Link href="/">
                    <Image src="/images/cuai.png" alt="CUAI Logo" width={64} height={22} />
                </Link>
                <HamburgerIcon isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
            </div>
            <nav
                className={`absolute inset-0 flex flex-col justify-center items-center min-h-screen z-10 gap-10 
                    ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'} transition-all duration-300 ease-in-out`}
            >
                <div className="absolute inset w-full h-full bg-[#19264b] opacity-95" />
                {NAVIGATION_ITEM.map(({ label, path }, index) => (
                    <Link key={index} href={path} onClick={close} className="z-10 text-3xl font-medium">
                        {label}
                    </Link>
                ))}
            </nav>
        </div>
    )
}
