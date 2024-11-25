import { motion, MotionValue, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface GalleryImage {
  id: number
  src: string
  alt: string
  category: string
}

export default function FullscreenGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Exemple d'images (à remplacer par vos propres images)
  const images: GalleryImage[] = [
    {
      id: 1,
      src: "/photos/concert_01.webp",
      alt: "Description 1",
      category: "Portrait",
    },
    {
      id: 2,
      src: "/photos/concert_03.webp",
      alt: "Description 2",
      category: "Paysage",
    },
    {
      id: 2,
      src: "/photos/concert_04.webp",
      alt: "Description 2",
      category: "Paysage",
    },
    // Ajoutez vos images...
  ]

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      // Hauteur totale pour permettre le défilement
      style={{ height: `${images.length * 100}vh` }}
    >
      {images.map((image, i) => (
        <FullscreenImage
          key={image.id}
          image={image}
          index={i}
          progress={scrollYProgress}
          total={images.length}
        />
      ))}
    </div>
  )
}

interface FullscreenImageProps {
  image: GalleryImage
  index: number
  progress: MotionValue<number>
  total: number
}

function FullscreenImage({ image, index, progress, total }: FullscreenImageProps) {
  // Calcul des points de transition pour cette image
  const imageProgress = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0, 1]
  )

  // Différentes animations selon la taille d'écran
  const yMobile = useTransform(imageProgress, [0, 1], ["0%", "-100%"])
  const scaleMobile = useTransform(imageProgress, [0, 0.5, 1], [1, 1, 0.8])
  const opacityMobile = useTransform(imageProgress, [0, 0.5, 1], [1, 1, 0])

  // Animation desktop différente
  const yDesktop = useTransform(
    progress,
    [index / total, (index + 1) / total],
    ["50%", "-50%"]
  )
  const scaleDesktop = useTransform(imageProgress, [0, 0.5, 1], [1.1, 1, 0.9])
  const opacityDesktop = useTransform(imageProgress, [0, 0.7, 1], [1, 1, 0])

  return (
    <motion.div
      className="fixed inset-0 w-full h-full"
      style={{
        zIndex: total - index,
      }}
    >
      {/* Version Mobile */}
      <motion.div
        className="relative w-full h-full md:hidden"
        style={{
          y: yMobile,
          scale: scaleMobile,
          opacity: opacityMobile,
        }}
      >
        <ImageContent image={image} isMobile total={total} />
      </motion.div>

      {/* Version Desktop */}
      <motion.div
        className="relative hidden md:block w-full h-full"
        style={{
          y: yDesktop,
          scale: scaleDesktop,
          opacity: opacityDesktop,
        }}
      >
        <ImageContent image={image} isMobile={false} total={total} />
      </motion.div>
    </motion.div>
  )
}

interface ImageContentProps {
  image: GalleryImage
  isMobile: boolean
  total: number
}

function ImageContent({ image, isMobile, total }: ImageContentProps) {
  return (
    <>
      {/* Container de l'image */}
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className={`w-full h-full object-cover ${
            isMobile ? "object-contain" : "object-cover"
          }`}
        />

        {/* Overlay avec les informations */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60">
          <div
            className={`absolute w-full px-6 py-8 ${
              isMobile ? "bottom-0" : "bottom-[10%]"
            }`}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <span
                className="inline-block px-3 py-1 mb-4 text-sm font-medium 
                           bg-white/20 text-white rounded-full backdrop-blur-sm"
              >
                {image.category}
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                {image.alt}
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Indicateur de progression (optionnel) */}
      {isMobile && (
        <div className="absolute bottom-4 right-4 text-white/80 font-medium">
          {image.id} / {total}
        </div>
      )}
    </>
  )
}
