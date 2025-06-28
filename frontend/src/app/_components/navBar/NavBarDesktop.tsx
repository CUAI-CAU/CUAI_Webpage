import Link from 'next/link'
import { NAVIGATION_ITEM } from './NavBar'

export const NavBarDesktop = () => {
    return (
        <div className="hidden md:flex items-center justify-between w-full h-20 px-20 py-12 bg-[#0e1a2f40] backdrop-blur-sm">
            <Link href="/">
                <img src="/images/cuai.png" alt="CUAI Logo" className="w-24" />
            </Link>
            <nav className="flex flex-row gap-7">
                {NAVIGATION_ITEM.map(({ label, path }, index) => (
                    <Link
                        key={index}
                        href={path}
                        className="text-xl transition-transform duration-300 ease-in-out hover:-translate-y-1"
                    >
                        {label}
                    </Link>
                ))}
            </nav>
        </div>
    )
}
