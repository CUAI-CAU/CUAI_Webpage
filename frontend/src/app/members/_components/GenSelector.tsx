export const GenSelector = ({ gen, setGen }: { gen: number; setGen: (gen: number) => void }) => {
    const startYear = 2023
    const currentYear = new Date().getFullYear()
    const currentGen = currentYear - startYear + 6

    const gens = Array.from({ length: currentGen - 6 + 1 }, (_, i) => 6 + i)

    return (
        <div className="flex justify-center gap-3">
            {gens.map((g) => (
                <button
                    key={g}
                    onClick={() => setGen(g)}
                    className={`cursor-pointer px-6 py-1 border border-none rounded-full transition-colors duration-300 ${
                        gen === g ? 'bg-emerald-500 text-slate-800' : 'text-slate-300 hover:bg-slate-700'
                    }`}
                >
                    {g}
                </button>
            ))}
        </div>
    )
}
