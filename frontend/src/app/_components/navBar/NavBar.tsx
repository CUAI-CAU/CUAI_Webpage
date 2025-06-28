import { NavBarDesktop } from './NavBarDesktop'
import { NavBarMobile } from './NavBarMobile'

export const NAVIGATION_ITEM = [
    { label: '프로젝트', path: '/projects' },
    { label: '수상내역', path: '/awards' },
    { label: '학회원', path: '/members' },
    { label: '과제', path: '/quiz' },
    { label: 'FAQ', path: '/faq' },
]

export const NavBar = () => {
    return (
        <header className="fixed top-0 w-full z-50">
            <NavBarDesktop />
            <NavBarMobile />
        </header>
    )
}
