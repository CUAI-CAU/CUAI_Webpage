import { BaseSkeleton } from '@/components'

export const ConferenceSelectorSkeleton = () => {
    return <BaseSkeleton sizeConfig="w-full h-10 lg:h-96" />
}

export const ProjectSelectorSkeleton = () => {
    return (
        <div className="flex flex-col w-full p-6 h-20 bg-slate-800 rounded-2xl ">
            <BaseSkeleton sizeConfig="w-1/3 h-10" />
        </div>
    )
}

export const PropertiesSkeleton = () => {
    return (
        <div className="w-full space-y-5">
            <BaseSkeleton sizeConfig="w-full h-28" />
            <div className="space-y-2">
                <BaseSkeleton sizeConfig="w-full md:w-sm h-7" radiusConfig="rounded-lg" />
                <BaseSkeleton sizeConfig="w-full md:w-lg h-7" radiusConfig="rounded-lg" />
            </div>
        </div>
    )
}

export const BlocksSkeleton = () => {
    return <BaseSkeleton sizeConfig="mt-10 w-full h-screen" />
}
