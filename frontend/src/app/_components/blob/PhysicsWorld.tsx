import { Euler, Mesh } from 'three'
import { Physics } from '@react-three/rapier'
import { Suspense, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

export const PhysicsWorld = () => {
    const meshRef = useRef<Mesh>(null)
    const rotationRef = useRef(new Euler(0, 0, 0))

    const { viewport, pointer } = useThree()

    useFrame(() => {
        if (!meshRef.current) return

        // 기본 회전
        rotationRef.current.x += 0.005
        rotationRef.current.y += 0.01

        // 사용자 상호작용
        const mouseX = (pointer.x * viewport.width) / 2
        const mouseY = (pointer.y * viewport.height) / 2

        meshRef.current.rotation.x = rotationRef.current.x + mouseX * 0.05
        meshRef.current.rotation.y = rotationRef.current.y + mouseY * 0.05
    })

    return (
        <Suspense>
            <Physics debug>
                <mesh ref={meshRef}>
                    <boxGeometry args={[10, 10, 10]} />
                    <meshStandardMaterial color={0x00ffaa} roughness={0} />
                </mesh>
            </Physics>
        </Suspense>
    )
}
