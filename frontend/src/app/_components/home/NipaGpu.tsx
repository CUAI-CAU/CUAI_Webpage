import { FadeInOnScroll } from '@/components'
import { NIPAGPU } from '@/constants/home'
import Image from 'next/image'

export const NipaGpu = () => {
    return (
        <FadeInOnScroll className="flex items-center justify-center min-h-screen">
            <section className="flex flex-col justify-center items-center w-3/4 xl:w-2/3 2xl:w-1/2 space-y-10 text-center">
                <div className="text-5xl font-semibold">{NIPAGPU.title}</div>
                <div className="flex flex-col gap-5 items-center">
                    <div>{NIPAGPU.description[0]}</div>
                    <div>{NIPAGPU.description[1]}</div>
                    <div className="w-2/3 grid grid-cols-1 md:grid-cols-2 justify-items-center place-items-center gap-5">
                        <Image src="/icons/keras.svg" alt="Keras Logo" width={150} height={20} />
                        <Image src="/icons/nvidia.svg" alt="Nvidia Logo" width={150} height={20} />
                        <Image src="/icons/pytorch.svg" alt="Pytorch Logo" width={150} height={20} />
                        <Image src="/icons/tensorflow.svg" alt="Tensorflow Logo" width={180} height={20} />
                    </div>
                    <div>{NIPAGPU.description[2]}</div>
                </div>
            </section>
        </FadeInOnScroll>
    )
}
