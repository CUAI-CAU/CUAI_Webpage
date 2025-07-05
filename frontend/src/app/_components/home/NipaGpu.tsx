'use client'

import { FadeInOnScroll } from '@/components'
import { useGetGpu } from '@/hooks/useGetGpu'
import Image from 'next/image'

const Skeleton = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full space-y-7">
            <div className="w-full h-44 bg-slate-500 rounded-2xl animate-pulse" />
            <div className="w-1/2 h-32 bg-slate-500 rounded-2xl animate-pulse" />
            <div className="w-full h-16 bg-slate-500 rounded-2xl animate-pulse" />
        </div>
    )
}

export const NipaGpu = () => {
    const { data: gpu, isLoading } = useGetGpu()

    return (
        <FadeInOnScroll className="flex items-center justify-center min-h-screen">
            <section className="flex flex-col justify-center items-center w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 space-y-10 text-center">
                <div className="text-5xl font-semibold">NIPA GPU 서버</div>

                {isLoading && <Skeleton />}
                {!isLoading &&
                    gpu?.map((text, index) => (
                        <div key={index} className="flex flex-col gap-10 items-center">
                            <div>{text.properties.content.rich_text[0].plain_text}</div>

                            {index === 1 && (
                                <div className="w-2/3 grid grid-cols-1 md:grid-cols-2 justify-items-center place-items-center gap-5">
                                    <Image src="/icons/keras.svg" alt="Keras Logo" width={150} height={20} />
                                    <Image src="/icons/nvidia.svg" alt="Nvidia Logo" width={150} height={20} />
                                    <Image src="/icons/pytorch.svg" alt="Pytorch Logo" width={150} height={20} />
                                    <Image src="/icons/tensorflow.svg" alt="Tensorflow Logo" width={180} height={20} />
                                </div>
                            )}
                        </div>
                    ))}
            </section>
        </FadeInOnScroll>
    )
}
