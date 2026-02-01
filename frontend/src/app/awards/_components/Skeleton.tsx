import { BaseSkeleton } from '@/components'

export const AwardsSkeleton = () => {
    return <BaseSkeleton sizeConfig="w-full h-[428px]" />
}

export const LabelSelectorSkeleton = () => {
    return (
        <div className="flex justify-center gap-3">
            <BaseSkeleton sizeConfig="w-[72px] h-8" radiusConfig="rounded-full" />
            <BaseSkeleton sizeConfig="w-[72px] h-8" radiusConfig="rounded-full" />
            <BaseSkeleton sizeConfig="w-[72px] h-8" radiusConfig="rounded-full" />
        </div>
    )
}
