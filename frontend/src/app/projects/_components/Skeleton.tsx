export const ProjectSelectorSkeleton = () => {
    return (
        <div className="flex flex-col w-full p-7 h-24 bg-slate-800 rounded-2xl ">
            <div className="w-1/3 h-full bg-slate-500 rounded-xl animate-pulse" />
        </div>
    )
}

export const PropertiesSkeleton = () => {
    return (
        <div className="w-full space-y-5">
            <div className="w-full h-28 bg-slate-500 rounded-xl animate-pulse" />
            <div className="space-y-3">
                <div className="w-full md:w-sm h-5.5 px-1 bg-slate-500 rounded-lg animate-pulse" />
                <div className="w-full md:w-lg h-5.5 px-1 bg-slate-500 rounded-lg animate-pulse" />
            </div>
        </div>
    )
}

export const BlocksSkeleton = () => {
    return <div className="mt-10 w-full h-screen bg-slate-500 rounded-xl animate-pulse" />
}
