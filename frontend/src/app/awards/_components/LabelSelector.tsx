interface LabelSelectorProps {
    years: string[] | null
    label: string
    setLabel: (label: string) => void
    isLoading?: boolean
}

export const LabelSelector = ({ years, label, setLabel, isLoading = false }: LabelSelectorProps) => {
    return (
        <div className="flex justify-center gap-3">
            {isLoading || !years ? (
                <div className="w-full h-10 bg-slate-500 rounded-2xl animate-pulse" />
            ) : (
                years
                    .sort((a, b) => a.localeCompare(b))
                    .map((year) => (
                        <button
                            key={year}
                            onClick={() => setLabel(year)}
                            className={`cursor-pointer px-3 py-1 border border-none rounded-full transition-colors duration-300 ${
                                label === year ? 'bg-emerald-500 text-slate-800' : 'text-slate-300 hover:bg-slate-700'
                            }`}
                        >
                            {year}
                        </button>
                    ))
            )}
        </div>
    )
}
