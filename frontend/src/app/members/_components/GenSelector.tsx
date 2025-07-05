export const GenSelector = ({ gen, setGen }: { gen: number; setGen: (gen: number) => void }) => {
    return (
        <div className="flex justify-center gap-3">
            {[{ gen: 6 }, { gen: 7 }, { gen: 8 }].map((section) => (
                <button
                    key={section.gen}
                    disabled
                    onClick={() => setGen(section.gen)}
                    className={`cursor-pointer px-6 py-1 border border-none rounded-full transition-colors duration-300 ${
                        gen === section.gen ? 'bg-emerald-500 text-slate-800' : 'text-slate-300 hover:bg-slate-700'
                    }`}
                >
                    {section.gen}
                </button>
            ))}
        </div>
    )
}
