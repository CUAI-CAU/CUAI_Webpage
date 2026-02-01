import { Info, X } from 'lucide-react'

interface ErrorAlertProps {
    message: string
    onClose: () => void
}

export const ErrorAlert = ({ message, onClose }: ErrorAlertProps) => {
    return (
        <div className="fixed top-5 right-5 z-50 flex flex-row w-[20rem] p-4 gap-2 justify-between items-center bg-emerald-500 rounded-[0.875rem] animate-fade-in">
            <Info />
            <span className="flex-1">{message}</span>
            <button onClick={onClose} className="cursor-pointer">
                <X />
            </button>
        </div>
    )
}
