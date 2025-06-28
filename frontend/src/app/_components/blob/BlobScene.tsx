'use client'

import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { PhysicsWorld } from './PhysicsWorld'

export const BlobScene = () => {
    const [aspect, setAspect] = useState(1)

    useEffect(() => {
        const handleResize = () => {
            setAspect(window.innerWidth / window.innerHeight)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas>
                <PerspectiveCamera makeDefault fov={45} aspect={aspect} near={0.1} far={1000} position={[0, 0, 25]} />
                <color attach="background" args={['#081321']} />
                <directionalLight color="#fff" intensity={1} castShadow={true} position={[0, 500, 200]} />
                <directionalLight color="#fff" intensity={0.25} castShadow={true} position={[0, -500, 400]} />
                <ambientLight color="#bfbfbf" />

                <PhysicsWorld />
            </Canvas>
        </div>
    )
}
