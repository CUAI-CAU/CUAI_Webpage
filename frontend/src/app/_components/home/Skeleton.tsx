import { BaseSkeleton } from '@/components'

export const CurriculumSkeleton = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-5">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="w-full min-w-[243px] h-44 lg:h-[324px] p-7 space-y-5 bg-slate-800 rounded-2xl"
                >
                    <BaseSkeleton sizeConfig="w-32 h-8" />
                    <BaseSkeleton sizeConfig="w-full h-16 lg:h-36" />
                </div>
            ))}
        </div>
    )
}

export const WhoAreWeSkeleton = () => {
    return (
        <div className="flex flex-col gap-5">
            {Array.from({ length: 3 }).map((_, index) => (
                <BaseSkeleton key={index} sizeConfig="w-full h-24" />
            ))}
        </div>
    )
}

export const NipaGpuSkeleton = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full space-y-7">
            <BaseSkeleton sizeConfig="w-full h-44" />
            <BaseSkeleton sizeConfig="w-1/2 h-32" />
            <BaseSkeleton sizeConfig="w-full h-16" />
        </div>
    )
}
