"use client"
import { motion, stagger, useAnimate } from "framer-motion"
import { useEffect } from "react"

interface TextRevealEffectProps {
  text: string
  className?: string
  delay?: number
  duration?: number
}

export const TextRevealEffect = ({
  text,
  className = "",
  delay = 0.2,
  duration = 0.5,
}: TextRevealEffectProps) => {
  const words = text.split(" ")
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      ".word",
      {
        opacity: [0, 1],
        y: [20, 0],
        filter: ["blur(8px)", "blur(0px)"],
      },
      {
        duration,
        delay: stagger(delay),
        ease: "easeOut",
      }
    )
  }, [animate, delay, duration])

  return (
    <motion.div
      ref={scope}
      className={`text-neutral-950 dark:text-neutral-50 ${className} flex flex-wrap gap-x-1`}
    >
      {words.map((word: string, i: number) => (
        <span key={i} className="word opacity-0 blur-sm mr-1">
          {word}
        </span>
      ))}
    </motion.div>
  )
}
