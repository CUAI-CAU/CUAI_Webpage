'use client'

import { Plus } from 'lucide-react'
import { Dispatch, PropsWithChildren, SetStateAction } from 'react'

interface ToggleBoxProps {
    title: string | undefined
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const ToggleBox = ({ title, isOpen, setIsOpen, children }: PropsWithChildren<ToggleBoxProps>) => {
    const toggleOpen = () => setIsOpen((prev) => !prev)

    return (
        <div className="relative w-full p-6 bg-slate-800 rounded-2xl text-start">
            <div className="w-7/8">
                <div className="text-lg text-slate-50 ">{title}</div>
                <div
                    className={`transition-all duration-500 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                    }`}
                >
                    <div
                        className={`transition-opacity duration-500 ease-in-out ${
                            isOpen ? 'opacity-100' : 'opacity-0'
                        } text-slate-300`}
                    >
                        {children}
                    </div>
                </div>
            </div>
            <button
                aria-label="토글 열기"
                onClick={toggleOpen}
                className="absolute top-4 right-4 text-xl text-slate-300 cursor-pointer transition-all duration-300 hover:text-white"
            >
                <Plus className={`${isOpen ? 'rotate-45' : 'rotate-0'} transition-transform duration-300`} />
            </button>
        </div>
    )
}
