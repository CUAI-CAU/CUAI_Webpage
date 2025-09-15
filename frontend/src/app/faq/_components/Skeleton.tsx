import { BaseSkeleton } from '@/components'

export const FaqSkeleton = () => {
    return (
        <div className="flex flex-col items-center w-full space-y-5">
            {Array.from({ length: 3 }).map((_, index) => (
                <BaseSkeleton key={index} sizeConfig="w-full h-28 p-6" />
            ))}
        </div>
    )
}
