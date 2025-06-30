export const ScrollDownButton = () => {
    const handleScrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        })
    }

    return (
        <button
            type="button"
            onClick={handleScrollDown}
            className="flex flex-col items-center text-slate-400 cursor-pointer animate-bounce"
        >
            <span>스크롤 다운</span>
            <div className="w-8 h-8 border-b-2 border-r-2 border-slate-500 rotate-45" />
        </button>
    )
}
