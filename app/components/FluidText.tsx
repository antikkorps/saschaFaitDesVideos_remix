import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface ParallaxProps {
  children: string
  baseVelocity: number
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const wrapValues = windowWidth < 768 ? [-10, -30] : [-20, -45]
  const x = useTransform(baseX, (v) => `${wrap(wrapValues[0], wrapValues[1], v)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    const adjustedVelocity = windowWidth < 768 ? baseVelocity * 0.7 : baseVelocity
    let moveBy = directionFactor.current * adjustedVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  const repetitions = windowWidth < 768 ? 3 : 4

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span key={i} className="inline-block">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function App() {
  return (
    <section className="flex flex-col -space-y-4 sm:-space-y-6 md:-space-y-8 lg:-space-y-10 py-0">
      <ParallaxText baseVelocity={-5}>Sascha fait des vidéos</ParallaxText>
      <ParallaxText baseVelocity={5}>Et de très belles photos</ParallaxText>
    </section>
  )
}
