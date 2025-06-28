import { PropsWithChildren } from 'react'

interface TitledSectionProps {
    title: string
    className?: string
}

export const TitledSection = ({ title, className, children }: PropsWithChildren<TitledSectionProps>) => {
    return (
        <section className={`flex flex-col justify-center items-center mt-36 space-y-16 ${className}`}>
            <h1 className="text-center text-5xl font-semibold">{title}</h1>
            {children}
        </section>
    )
}
