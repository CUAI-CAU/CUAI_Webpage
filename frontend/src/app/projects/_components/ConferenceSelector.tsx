import { ConferenceSelectorSkeleton } from './Skeleton'

interface ConferenceSelectorProps {
    type: string[]
    selectedType: string | null
    setSelectedType: (value: string) => void
    isLoading?: boolean
}

export const ConferenceSelector = ({
    type,
    selectedType,
    setSelectedType,
    isLoading = false,
}: ConferenceSelectorProps) => {
    return (
        <nav className="min-w-52 h-full p-6 pb-8 bg-slate-800 rounded-2xl space-y-5">
            <h2 className="text-center text-lg">컨퍼런스 목록</h2>
            <div className="w-full my-7 border-b border-slate-400" />
            {isLoading ? (
                <ConferenceSelectorSkeleton />
            ) : (
                <ul className="flex flex-row lg:flex-col gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {type.map((name) => (
                        <li
                            key={name}
                            onClick={() => setSelectedType(name)}
                            className={`text-center cursor-pointer whitespace-nowrap transition-transform duration-300 lg:hover:translate-x-1 ${
                                selectedType === name ? 'font-semibold text-slate-200' : 'text-slate-400'
                            }`}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    )
}
