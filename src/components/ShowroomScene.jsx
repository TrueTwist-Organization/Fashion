import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, MeshReflectorMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

// Clothing item hanging on rack
function ClothingItem({ position, color, type = 'dress' }) {
  const ref = useRef()
  const swaySpeed = useMemo(() => 0.3 + Math.random() * 0.4, [])
  const swayAmount = useMemo(() => 0.02 + Math.random() * 0.03, [])
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * swaySpeed + offset) * swayAmount
    }
  })

  return (
    <group ref={ref} position={position}>
      {/* Hanger */}
      <mesh position={[0, 0.18, 0]}>
        <torusGeometry args={[0.08, 0.008, 8, 30, Math.PI]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Hook */}
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.1, 8]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Garment body */}
      {type === 'dress' && (
        <>
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[0.13, 0.12, 0.03]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.07, 0.14, 0.25, 12]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
        </>
      )}
      {type === 'jacket' && (
        <>
          <mesh position={[0, -0.08, 0]}>
            <boxGeometry args={[0.16, 0.22, 0.04]} />
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
          </mesh>
          {/* Collar */}
          <mesh position={[0, 0.04, 0.02]}>
            <boxGeometry args={[0.1, 0.05, 0.02]} />
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>
        </>
      )}
      {type === 'shirt' && (
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.13, 0.22, 0.03]} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>
      )}
    </group>
  )
}

// Clothing rack
function ClothingRack({ position, items }) {
  return (
    <group position={position}>
      {/* Horizontal bar */}
      <mesh position={[0, 0.9, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 1.4, 12]} />
        <meshStandardMaterial color="#8a8a9a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Left pole */}
      <mesh position={[-0.65, 0.45, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.9, 12]} />
        <meshStandardMaterial color="#8a8a9a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Right pole */}
      <mesh position={[0.65, 0.45, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.9, 12]} />
        <meshStandardMaterial color="#8a8a9a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.05, 16]} />
        <meshStandardMaterial color="#8a8a9a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Clothing items */}
      {items.map((item, i) => (
        <ClothingItem
          key={i}
          position={[-0.55 + i * (1.1 / (items.length - 1 || 1)), 0.9, 0]}
          color={item.color}
          type={item.type}
        />
      ))}
    </group>
  )
}

// Animated model (simplified human silhouette walking)
function FashionModel() {
  const group = useRef()
  const leftLeg = useRef()
  const rightLeg = useRef()
  const leftArm = useRef()
  const rightArm = useRef()
  const body = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    // Walking animation
    if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(t * 1.8) * 0.35
    if (rightLeg.current) rightLeg.current.rotation.x = Math.sin(t * 1.8 + Math.PI) * 0.35
    if (leftArm.current) leftArm.current.rotation.x = Math.sin(t * 1.8 + Math.PI) * 0.2
    if (rightArm.current) rightArm.current.rotation.x = Math.sin(t * 1.8) * 0.2
    if (body.current) {
      body.current.position.y = Math.abs(Math.sin(t * 1.8)) * 0.015
      body.current.rotation.y = Math.sin(t * 0.4) * 0.06
    }
    // Gentle forward/backward movement
    if (group.current) {
      group.current.position.z = Math.sin(t * 0.4) * 0.4
      group.current.position.x = Math.sin(t * 0.2) * 0.15
    }
  })

  const skinColor = '#f5d5c0'
  const dressColor = '#7b3fa0'
  const hairColor = '#2a1a0a'

  return (
    <group ref={group} position={[0, -0.55, 0]} scale={1.1}>
      {/* Head */}
      <mesh position={[0, 1.72, 0]}>
        <sphereGeometry args={[0.115, 20, 20]} />
        <meshStandardMaterial color={skinColor} roughness={0.6} />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 1.8, -0.02]}>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial color={hairColor} roughness={0.8} />
      </mesh>
      {/* Hair long */}
      <mesh position={[0, 1.62, -0.06]}>
        <cylinderGeometry args={[0.08, 0.04, 0.35, 12]} />
        <meshStandardMaterial color={hairColor} roughness={0.8} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 12]} />
        <meshStandardMaterial color={skinColor} roughness={0.6} />
      </mesh>

      {/* Body */}
      <group ref={body}>
        {/* Torso (dress top) */}
        <mesh position={[0, 1.3, 0]}>
          <boxGeometry args={[0.25, 0.35, 0.16]} />
          <meshStandardMaterial color={dressColor} roughness={0.5} />
        </mesh>

        {/* Dress skirt */}
        <mesh position={[0, 0.92, 0]}>
          <cylinderGeometry args={[0.16, 0.26, 0.55, 16]} />
          <meshStandardMaterial color={dressColor} roughness={0.5} />
        </mesh>

        {/* Left Arm */}
        <group ref={leftArm} position={[0.155, 1.38, 0]}>
          <mesh position={[0.06, -0.12, 0]} rotation={[0, 0, 0.2]}>
            <cylinderGeometry args={[0.038, 0.032, 0.3, 10]} />
            <meshStandardMaterial color={skinColor} roughness={0.6} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArm} position={[-0.155, 1.38, 0]}>
          <mesh position={[-0.06, -0.12, 0]} rotation={[0, 0, -0.2]}>
            <cylinderGeometry args={[0.038, 0.032, 0.3, 10]} />
            <meshStandardMaterial color={skinColor} roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* Left Leg */}
      <group ref={leftLeg} position={[0.08, 0.65, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.06, 0.05, 0.4, 12]} />
          <meshStandardMaterial color={dressColor} roughness={0.5} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -0.44, 0.03]}>
          <boxGeometry args={[0.07, 0.05, 0.14]} />
          <meshStandardMaterial color="#1a0a2e" roughness={0.3} metalness={0.1} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLeg} position={[-0.08, 0.65, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.06, 0.05, 0.4, 12]} />
          <meshStandardMaterial color={dressColor} roughness={0.5} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -0.44, 0.03]}>
          <boxGeometry args={[0.07, 0.05, 0.14]} />
          <meshStandardMaterial color="#1a0a2e" roughness={0.3} metalness={0.1} />
        </mesh>
      </group>
    </group>
  )
}

// Decorative mannequin
function Mannequin({ position, color = '#e8d9f8' }) {
  return (
    <group position={position} scale={0.7}>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.14, 0.11, 0.5, 14]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.11, 0.09, 0.45, 14]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 10]} />
        <meshStandardMaterial color="#8a8a9a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 16]} />
        <meshStandardMaterial color="#8a8a9a" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Camera animation
function CameraRig() {
  const { camera } = useThree()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    camera.position.x = Math.sin(t * 0.12) * 0.4
    camera.position.y = 1.4 + Math.sin(t * 0.08) * 0.1
    camera.position.z = 4.8 - Math.sin(t * 0.06) * 0.3
    camera.lookAt(0, 0.8, 0)
  })

  return null
}

export default function ShowroomScene() {
  const rackItems1 = [
    { color: '#c4a8e8', type: 'dress' },
    { color: '#f4a878', type: 'dress' },
    { color: '#7b3fa0', type: 'dress' },
    { color: '#e8d9f8', type: 'dress' },
    { color: '#d4a0d0', type: 'dress' },
  ]

  const rackItems2 = [
    { color: '#3d1a6e', type: 'jacket' },
    { color: '#5b2d9e', type: 'jacket' },
    { color: '#8a70a8', type: 'jacket' },
    { color: '#2a1a4e', type: 'jacket' },
  ]

  const rackItems3 = [
    { color: '#f4a878', type: 'shirt' },
    { color: '#c4a8e8', type: 'shirt' },
    { color: '#e8d9f8', type: 'shirt' },
    { color: '#7b3fa0', type: 'shirt' },
    { color: '#fde8d8', type: 'shirt' },
  ]

  return (
    <>
      <CameraRig />

      {/* Ambient and environment lighting */}
      <ambientLight intensity={0.4} color="#f5f0ff" />

      {/* Main warm spotlight from above */}
      <spotLight
        position={[0, 5, 2]}
        angle={0.5}
        penumbra={0.8}
        intensity={3}
        color="#fff5e8"
        castShadow
      />

      {/* Purple accent lights */}
      <pointLight position={[-3, 3, -1]} intensity={1.5} color="#7b3fa0" />
      <pointLight position={[3, 3, -1]} intensity={1.5} color="#5b2d9e" />
      <pointLight position={[0, 2, 3]} intensity={0.8} color="#c4a8e8" />

      {/* Peach warm fill light */}
      <pointLight position={[0, 1, 4]} intensity={1.2} color="#f4a878" />

      {/* Floor with reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={0.8}
          mixStrength={60}
          roughness={0.8}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#1a0a2e"
          metalness={0.5}
        />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2, -3.5]}>
        <planeGeometry args={[14, 8]} />
        <meshStandardMaterial color="#0d0520" roughness={0.8} />
      </mesh>

      {/* Side walls */}
      <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#120730" roughness={0.8} />
      </mesh>
      <mesh position={[5, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#120730" roughness={0.8} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.5, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#0a0318" roughness={1} />
      </mesh>

      {/* Ceiling light strips */}
      {[-2, 0, 2].map((x) => (
        <mesh key={x} position={[x, 4.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.15, 6]} />
          <meshStandardMaterial color="#fff5e8" emissive="#fff5e8" emissiveIntensity={2} />
        </mesh>
      ))}

      {/* Clothing racks */}
      <ClothingRack position={[-3.2, -0.8, -1.5]} items={rackItems1} />
      <ClothingRack position={[3.2, -0.8, -1.5]} items={rackItems2} />
      <ClothingRack position={[0, -0.8, -2.8]} items={rackItems3} />

      {/* Mannequins */}
      <Mannequin position={[-1.8, -0.8, 0.5]} color="#e8d9f8" />
      <Mannequin position={[1.8, -0.8, 0.5]} color="#c4a8e8" />

      {/* Walking fashion model */}
      <FashionModel />

      {/* Glowing center logo text */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 2.8, -2.8]}
          fontSize={0.65}
          font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFiD-vYSZviVYUb_rj3ij__anPXBYf9lW4e7dsg-_QK.woff"
          color="#c4a8e8"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.008}
          outlineColor="#7b3fa0"
        >
          TwistWear
        </Text>
      </Float>

      {/* Small glowing orbs / lights for premium feel */}
      {[[-2, 1, 0], [2, 1, 0], [0, 1.5, 1]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#f4a878" emissive="#f4a878" emissiveIntensity={3} />
        </mesh>
      ))}

      {/* Display pedestals */}
      {[-1.5, 1.5].map((x, i) => (
        <group key={i} position={[x, -0.8, 1.2]}>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.2, 0.22, 0.3, 32]} />
            <meshStandardMaterial color="#2a1a4e" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.32, 0]}>
            <cylinderGeometry args={[0.18, 0.2, 0.06, 32]} />
            <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Item on pedestal */}
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={i === 0 ? '#f4a878' : '#c4a8e8'}
              emissive={i === 0 ? '#f4a878' : '#7b3fa0'}
              emissiveIntensity={0.5}
              metalness={0.3}
              roughness={0.4}
            />
          </mesh>
        </group>
      ))}
    </>
  )
}
