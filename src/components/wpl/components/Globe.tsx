"use client"

import { useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function RotatingGlobe() {
    const meshRef = useRef<THREE.Mesh>(null)
    const texture = useLoader(THREE.TextureLoader, "/images/jpg/globe.png")

    // Slow automatic rotation
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001
        }
    })

    return (
        <Sphere ref={meshRef} args={[1, 64, 64]}>
            <meshStandardMaterial
                map={texture}
                emissive="#00ff9930"
                emissiveIntensity={0.2}
                roughness={0.7}
                metalness={0.3}
            />
        </Sphere>
    )
}

export default function Globe() {
    return (
        <div className="absolute bottom-0 left-0 w-full h-[40vh] overflow-hidden">
            <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} className="w-full h-full">
                <ambientLight intensity={0.1} />
                <directionalLight position={[5, 5, 5]} intensity={0.5} />
                <pointLight position={[0, 0, 3]} intensity={0.5} color="#00ff99" />
                <RotatingGlobe />
                <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.3} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}