import { motion, MotionValue, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface GalleryImage {
  src: string
  alt: string
  category: string
}

export default function AnimatedGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const images: GalleryImage[] = [
    { src: "/photos/concert_01.webp", alt: "Description 1", category: "Photo" },
    { src: "/photos/concert_03.webp", alt: "Description 2", category: "Photo" },
    { src: "/photos/concert_04.webp", alt: "Description 2", category: "Photo" },
    { src: "/photos/concert_05.webp", alt: "Description 2", category: "Photo" },
    { src: "/photos/concert_06.webp", alt: "Description 2", category: "Photo" },
    { src: "/photos/fenetres_urbex_01.webp", alt: "Description 2", category: "Photo" },
    // Ajoutez vos images ici
  ]

  return (
    <div ref={containerRef} className="relative w-full px-4 py-8 md:py-16">
      {/* Grille responsive */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((image, i) => (
          <GalleryItem key={i} index={i} image={image} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  )
}

interface GalleryItemProps {
  image: GalleryImage
  index: number
  progress: MotionValue<number>
}

function GalleryItem({ image, index, progress }: GalleryItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)

  // Animation différente selon la position dans la grille
  const translateY = useTransform(progress, [0, 1], [100 + (index % 3) * 50, 0])

  const opacity = useTransform(
    progress,
    // Apparition progressive basée sur l'index
    [0, 0.2 + index * 0.1, 0.3 + index * 0.1, 1],
    [0, 0, 1, 1]
  )

  const scale = useTransform(
    progress,
    [0, 0.2 + index * 0.1, 0.3 + index * 0.1, 1],
    [0.8, 0.8, 1, 1]
  )

  return (
    <motion.div
      ref={itemRef}
      style={{
        opacity,
        scale,
        y: translateY,
      }}
      className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900 
                 hover:z-10 transition-all duration-300"
    >
      {/* Image Container */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Overlay sur hover */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="inline-block px-2 py-1 mb-2 text-xs font-medium bg-white/20 
                           rounded-full text-white backdrop-blur-sm"
              >
                {image.category}
              </span>
              <h3 className="text-white text-lg font-medium">{image.alt}</h3>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Effet de brillance au hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                   opacity-0 group-hover:opacity-100 -skew-x-12 translate-x-[-100%]"
        animate={{
          translateX: ["-100%", "200%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </motion.div>
  )
}
