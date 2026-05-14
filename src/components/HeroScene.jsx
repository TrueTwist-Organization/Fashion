/**
 * HeroScene — TwistWear Showroom Walkout
 *
 * Three models emerge from a glowing showroom door and walk toward
 * the camera in a continuous staggered loop, outfit-colours cycling
 * every 5 s.  Rendered via React-Three-Fiber so no real video file
 * is needed — it looks like a live fashion-show feed.
 */

import React, {
  useRef, useState, useEffect, useMemo, Suspense,
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF, useAnimations,
  MeshReflectorMaterial, ContactShadows, Environment,
} from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

useGLTF.preload('/models/human.glb')

// Model (Mixamo Xbot) measured at scale = 1:  height = 0.688, minY = -0.447
const SCALE_DAD = 2.52   // → 1.73 m
const SCALE_MOM = 2.32   // → 1.60 m
const SCALE_CHILD = 1.55   // → 1.07 m
const yFloor = (s) => 0.447 * s   // root offset so feet touch y = 0

// Walk path along Z
const WALK_START = -3.6   // just inside the door
const WALK_END = 5.8   // off-camera
const WALK_SPEED = 1.35  // units / second

// ─── Fashion Collections ──────────────────────────────────────────────────────
const COLLECTIONS = [
  {
    label: 'Elegant Evening',
    dad: { body: '#1c2b50', joint: '#c8a45c', emissive: '#000820' },
    mom: { body: '#7a1535', joint: '#c8a45c', emissive: '#200010' },
    child: { body: '#c8a45c', joint: '#1a1a2e', emissive: '#201000' },
  },
  {
    label: 'White Luxe',
    dad: { body: '#e8e4dc', joint: '#333', emissive: '#181818' },
    mom: { body: '#f5f2ec', joint: '#c8a45c', emissive: '#181818' },
    child: { body: '#aaccee', joint: '#2244aa', emissive: '#081020' },
  },
  {
    label: 'Gold Street',
    dad: { body: '#111111', joint: '#c8a45c', emissive: '#050505' },
    mom: { body: '#c8a45c', joint: '#080808', emissive: '#201000' },
    child: { body: '#cc4818', joint: '#111', emissive: '#200800' },
  },
  {
    label: 'Royal Night',
    dad: { body: '#5a1010', joint: '#f5f0e8', emissive: '#150005' },
    mom: { body: '#1a1a50', joint: '#c8a45c', emissive: '#060620' },
    child: { body: '#1a3a50', joint: '#88ccee', emissive: '#081020' },
  },
]

function applyOutfit(root, outfit) {
  root.traverse(child => {
    if (!child.isMesh) return
    const isSurf = child.name === 'Beta_Surface'
    const m = child.material.clone()
    m.color = new THREE.Color(isSurf ? outfit.body : outfit.joint)
    m.emissive = new THREE.Color(isSurf ? outfit.emissive : '#000000')
    m.emissiveIntensity = 0.08
    m.roughness = 0.72
    m.metalness = isSurf ? 0.04 : 0.25
    child.material = m
    child.castShadow = true
    child.visible = true
  })
}

// ─── Single walking member ────────────────────────────────────────────────────
function Member({ scale, laneX, timeScale, outfit, phase }) {
  const { scene, animations } = useGLTF('/models/human.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions, mixer } = useAnimations(animations, clone)
  const groupRef = useRef()

  // Start walk animation
  useEffect(() => {
    if (!actions) return
    const action = actions['walk'] ?? Object.values(actions)[0]
    if (!action) return
    Object.values(actions).forEach(a => a?.stop())
    action.reset().fadeIn(0.4).play()
    mixer.timeScale = timeScale
  }, [actions, mixer, timeScale])

  // Re-apply outfit whenever collection changes
  useEffect(() => {
    applyOutfit(clone, outfit)
  }, [clone, outfit])

  // Advance Z each frame; loop by teleporting behind the door
  const range = WALK_END - WALK_START
  useFrame(({ clock: { elapsedTime: t } }) => {
    if (!groupRef.current) return
    const z = WALK_START + ((t * WALK_SPEED + phase * range) % range)
    groupRef.current.position.z = z
    // Hide while "inside" the showroom (before clearing the arch)
    groupRef.current.visible = z > WALK_START + 0.35
  })

  return (
    <group ref={groupRef} position={[laneX, 0, 0]}>
      <primitive
        object={clone}
        scale={[scale, scale, scale]}
        position={[0, yFloor(scale), 0]}
        rotation={[0, Math.PI, 0]}   // face toward camera
      />
    </group>
  )
}

// ─── Showroom room + arch ─────────────────────────────────────────────────────
function Showroom() {
  // Gold material shared across trim pieces
  const goldMat = useMemo(() =>
    new THREE.MeshStandardMaterial({
      color: '#c8a45c', emissive: '#c8a45c',
      emissiveIntensity: 0.55, metalness: 0.9, roughness: 0.18,
    }), [])

  const wallMat = useMemo(() =>
    new THREE.MeshStandardMaterial({ color: '#080808', roughness: 0.85 }), [])

  const ceilMat = useMemo(() =>
    new THREE.MeshStandardMaterial({ color: '#060606', roughness: 0.9 }), [])

  // ── Arch geometry helpers ──────────────────────────────────────────────────
  // Vertical columns + horizontal lintel + top half-ring
  const ARCH_Z = -3.6
  const COL_H = 3.6
  const COL_W = 0.14
  const ARCH_HW = 1.0   // half-width of door opening

  return (
    <group>

      {/* ── Back wall ── */}
      <mesh position={[0, 3, -6]} rotation={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <primitive object={wallMat} attach="material" />
      </mesh>

      {/* Gold skirting band on back wall */}
      <mesh position={[0, 0.06, -5.98]}>
        <planeGeometry args={[12, 0.12]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      {/* Gold mid-rail on back wall */}
      <mesh position={[0, 2.8, -5.98]}>
        <planeGeometry args={[12, 0.06]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      {/* ── Side walls ── */}
      <mesh position={[-4.6, 3, -1.5]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[9, 8]} />
        <primitive object={wallMat} attach="material" />
      </mesh>
      <mesh position={[4.6, 3, -1.5]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[9, 8]} />
        <primitive object={wallMat} attach="material" />
      </mesh>

      {/* Gold pilasters on side walls (decorative columns) */}
      {[-4.58, 4.58].map((x, si) => (
        [-4, -1, 2].map((z, i) => (
          <mesh key={`pil-${si}-${i}`}
            position={[x, 1.8, z]}
            rotation={[0, si === 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
            <planeGeometry args={[0.06, 3.6]} />
            <primitive object={goldMat} attach="material" />
          </mesh>
        ))
      ))}

      {/* ── Ceiling ── */}
      <mesh position={[0, 5.2, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9.2, 10]} />
        <primitive object={ceilMat} attach="material" />
      </mesh>

      {/* Ceiling track light rail */}
      <mesh position={[0, 5.18, -1]}>
        <boxGeometry args={[0.06, 0.08, 9]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      {/* Track-light pendants along the ceiling rail */}
      {[-3.5, -1.8, 0, 1.8, 3.5].map((z, i) => (
        <group key={`pendant-${i}`} position={[0, 5.0, z]}>
          {/* Thin rod */}
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.6, 8]} />
            <primitive object={goldMat} attach="material" />
          </mesh>
          {/* Lamp shade */}
          <mesh position={[0, -0.65, 0]}>
            <cylinderGeometry args={[0.12, 0.08, 0.18, 12, 1, true]} />
            <primitive object={goldMat} attach="material" />
          </mesh>
          {/* Point light from each pendant */}
          <pointLight position={[0, -0.75, 0]} intensity={0.9} color="#fff4e0" distance={4} decay={2} />
        </group>
      ))}

      {/* ── Door arch ── */}
      {/* Left column */}
      <mesh position={[-ARCH_HW - COL_W / 2, COL_H / 2, ARCH_Z]}>
        <boxGeometry args={[COL_W, COL_H, COL_W]} />
        <primitive object={goldMat} attach="material" />
      </mesh>
      {/* Right column */}
      <mesh position={[ARCH_HW + COL_W / 2, COL_H / 2, ARCH_Z]}>
        <boxGeometry args={[COL_W, COL_H, COL_W]} />
        <primitive object={goldMat} attach="material" />
      </mesh>
      {/* Lintel (horizontal top bar) */}
      <mesh position={[0, COL_H + COL_W / 2, ARCH_Z]}>
        <boxGeometry args={[ARCH_HW * 2 + COL_W * 3, COL_W, COL_W]} />
        <primitive object={goldMat} attach="material" />
      </mesh>
      {/* Half-circle arch ring */}
      <mesh position={[0, COL_H, ARCH_Z]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ARCH_HW + COL_W * 0.5, COL_W * 0.5, 8, 24, Math.PI]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      {/* Warm glow from inside the door (simulates interior light) */}
      <pointLight position={[0, 2, ARCH_Z + 0.6]} intensity={4} color="#ffe8b0" distance={5} decay={2} />
      <pointLight position={[0, 1, ARCH_Z + 1.5]} intensity={2} color="#ffd080" distance={4} decay={2} />

      {/* ── Floor ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9.2, 13]} />
        <MeshReflectorMaterial
          blur={[500, 100]} resolution={512}
          mixBlur={1} mixStrength={60}
          roughness={0.55} depthScale={1.5}
          minDepthThreshold={0.4} maxDepthThreshold={1.6}
          color="#020202" metalness={0.92}
        />
      </mesh>

      {/* Centre runway strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[3.6, 13]} />
        <meshStandardMaterial color="#050505" metalness={0.95} roughness={0.18} />
      </mesh>

      {/* Outer gold runway lines */}
      {[-1.9, 1.9].map((x, i) => (
        <mesh key={`rl-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.002, 0]}>
          <planeGeometry args={[0.055, 13]} />
          <meshStandardMaterial color="#c8a45c" emissive="#c8a45c" emissiveIntensity={3.5} />
        </mesh>
      ))}

      {/* Floor dot-lights near camera */}
      {[-1.5, -0.75, 0, 0.75, 1.5].map((x, i) => (
        <mesh key={`dl-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.003, 2.5]}>
          <circleGeometry args={[0.05, 16]} />
          <meshStandardMaterial color="#fff" emissive="#c8a45c" emissiveIntensity={8} />
        </mesh>
      ))}

      {/* ── TWISTWEAR wall sign (geometry-only, no font needed) ── */}
      {/* Decorative horizontal rule */}
      <mesh position={[0, 4.5, -5.96]}>
        <planeGeometry args={[3.8, 0.04]} />
        <primitive object={goldMat} attach="material" />
      </mesh>
      <mesh position={[0, 3.9, -5.96]}>
        <planeGeometry args={[3.8, 0.04]} />
        <primitive object={goldMat} attach="material" />
      </mesh>
      {/* Vertical end bars of sign frame */}
      {[-1.9, 1.9].map((x, i) => (
        <mesh key={`sf-${i}`} position={[x, 4.2, -5.96]}>
          <planeGeometry args={[0.04, 0.64]} />
          <primitive object={goldMat} attach="material" />
        </mesh>
      ))}
      {/* Sign glow */}
      <pointLight position={[0, 4.2, -5.5]} intensity={0.6} color="#c8a45c" distance={3} />

    </group>
  )
}

// ─── Studio + fill lights ─────────────────────────────────────────────────────
function Lights() {
  const rimRef = useRef()
  useFrame(({ clock: { elapsedTime: t } }) => {
    if (rimRef.current)
      rimRef.current.intensity = 1.6 + Math.sin(t * 0.55) * 0.35
  })
  return (
    <>
      {/* Key */}
      <spotLight position={[3, 7.5, 3.5]} angle={0.22} penumbra={0.6}
        intensity={6} color="#fff8f0" castShadow
        shadow-mapSize-width={2048} shadow-mapSize-height={2048}
        shadow-bias={-0.0003} />
      {/* Fill */}
      <spotLight position={[-3, 6.5, 2.5]} angle={0.36} penumbra={0.9}
        intensity={2} color="#d8e8ff" />
      {/* Front top */}
      <spotLight position={[0, 7, 4.5]} angle={0.28} penumbra={0.75}
        intensity={1.6} color="#fff4e8" />
      {/* Rim / backlight — animated */}
      <spotLight ref={rimRef} position={[0, 4.5, -5]} angle={0.5}
        penumbra={0.4} intensity={1.6} color="#c8a45c" />
      {/* Ground bounce */}
      <pointLight position={[0, 0.3, 1.2]} intensity={0.4} color="#c8a45c" />
      <ambientLight intensity={0.22} />
    </>
  )
}

// ─── Ambient gold particles ───────────────────────────────────────────────────
function Particles({ n = 70 }) {
  const ref = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const pts = useMemo(() => Array.from({ length: n }, () => ({
    x: (Math.random() - 0.5) * 8.5, y: Math.random() * 5,
    z: (Math.random() - 0.5) * 9,
    s: 0.3 + Math.random() * 0.7,
    p: Math.random() * Math.PI * 2,
  })), [n])

  useFrame(({ clock: { elapsedTime: t } }) => {
    pts.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * 0.2 + p.p) * 0.2,
        p.y + Math.sin(t * p.s + p.p) * 0.28,
        p.z)
      dummy.scale.setScalar(0.011 + Math.sin(t + p.p) * 0.004)
      dummy.updateMatrix()
      ref.current?.setMatrixAt(i, dummy.matrix)
    })
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[null, null, n]}>
      <sphereGeometry args={[1, 5, 5]} />
      <meshStandardMaterial color="#c8a45c" emissive="#c8a45c"
        emissiveIntensity={2.2} roughness={0} />
    </instancedMesh>
  )
}

// ─── Subtle handheld-camera feel ─────────────────────────────────────────────
function CameraRig() {
  useFrame(({ camera, clock: { elapsedTime: t } }) => {
    camera.position.x = Math.sin(t * 0.06) * 0.25
    camera.position.y = 1.45 + Math.sin(t * 0.09) * 0.08
  })
  return null
}

// ─── Loading spinner ──────────────────────────────────────────────────────────
function Loader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none z-10">
      <div className="w-10 h-10 rounded-full border-2 border-[#c8a45c]/25 border-t-[#c8a45c] animate-spin" />
      <p className="text-[#c8a45c]/60 text-[10px] tracking-[0.4em] uppercase font-sans">
        Loading Showroom…
      </p>
    </div>
  )
}

// ─── HUD overlay ─────────────────────────────────────────────────────────────
function Overlay({ colIdx }) {
  const col = COLLECTIONS[colIdx]
  return (
    <>
      {/* Collection dots + label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none">
        <div className="flex gap-2">
          {COLLECTIONS.map((_, i) => (
            <div key={i} className={`rounded-full border border-[#c8a45c]/50 transition-all duration-500 ${i === colIdx ? 'w-5 h-[5px] bg-[#c8a45c]' : 'w-[5px] h-[5px]'
              }`} />
          ))}
        </div>
        <span className="text-[#c8a45c]/65 text-[9px] tracking-[0.38em] uppercase font-sans">
          {col.label}
        </span>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 25%, #030303 100%)' }} />
    </>
  )
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function HeroScene() {
  const [colIdx, setColIdx] = useState(0)
  const [ready, setReady] = useState(false)
  const col = COLLECTIONS[colIdx]

  // Cycle collections every 5 s
  useEffect(() => {
    const id = setInterval(() => setColIdx(i => (i + 1) % COLLECTIONS.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full h-full">
      {!ready && <Loader />}

      <Canvas
        shadows
        camera={{ position: [0, 1.45, 6.2], fov: 48 }}
        gl={{
          antialias: true, alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.35,
        }}
        style={{ background: 'transparent' }}
        onCreated={() => setTimeout(() => setReady(true), 600)}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={['#030303', 12, 22]} />

          <CameraRig />
          <Lights />
          <Environment preset="studio" />
          <Showroom />

          {/* Three walkers — phase offsets stagger their positions along the runway */}
          <Member
            scale={SCALE_DAD}
            laneX={-0.75}
            timeScale={0.82}
            outfit={col.dad}
            phase={0}
          />
          <Member
            scale={SCALE_CHILD}
            laneX={0.15}
            timeScale={1.9}
            outfit={col.child}
            phase={0.38}
          />
          <Member
            scale={SCALE_MOM}
            laneX={0.75}
            timeScale={1.05}
            outfit={col.mom}
            phase={0.70}
          />

          <ContactShadows
            position={[0, 0.004, 0]}
            opacity={0.7} scale={14} blur={3.5} far={2}
          />
          <Particles n={70} />
        </Suspense>
      </Canvas>

      <Overlay colIdx={colIdx} />
    </div>
  )
}
