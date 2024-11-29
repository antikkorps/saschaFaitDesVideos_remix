import {
  AnimatePresence,
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

interface GalleryImage {
  src: string
  alt: string
  category: string
}

interface PhotoItemProps {
  image: GalleryImage
  index: number
  progress: MotionValue<number>
  onSelect: () => void
}

interface ModalProps {
  image: GalleryImage
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (image: GalleryImage, index: number) => void
}

interface ThumbnailProps {
  thumb: GalleryImage
  index: number
  currentIndex: number
  onNavigate: (thumb: GalleryImage, index: number) => void
}

const buttonBaseStyle = `
  absolute z-10 p-3 rounded-full 
  bg-black/50 backdrop-blur-md
  text-white
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-white
  hover:bg-white/20 hover:scale-110
`

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const { scrollYProgress: titleScrollProgress } = useScroll({
    target: titleRef,
    offset: ["start center", "center center"],
  })

  const titleOpacity = useTransform(titleScrollProgress, [0, 0.5], [0, 1])
  const titleY = useTransform(titleScrollProgress, [0, 0.5], [100, 0])

  // Préchargement des images
  useEffect(() => {
    const preloadImages = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = image.src
        img.onload = resolve
        img.onerror = reject
      })
    })

    Promise.all(preloadImages)
      .then(() => setIsLoading(false))
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (selectedImage) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"

      return () => {
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        window.scrollTo(0, scrollY)
      }
    }
  }, [selectedImage])

  const images: GalleryImage[] = [
    { src: "/photos/concert_01.webp", alt: "Concert 1", category: "Concert" },
    { src: "/photos/concert_03.webp", alt: "Concert 2", category: "Concert" },
    { src: "/photos/concert_04.webp", alt: "Concert 3", category: "Concert" },
    { src: "/photos/concert_05.webp", alt: "Concert 4", category: "Concert" },
    { src: "/photos/concert_06.webp", alt: "Concert 5", category: "Concert" },
    { src: "/photos/fenetres_urbex_01.webp", alt: "Urbex", category: "Urbex" },
    { src: "/photos/fenetres_urbex_02.webp", alt: "Urbex", category: "Urbex" },
    { src: "/photos/fenetres_urbex_03.webp", alt: "Urbex", category: "Urbex" },
    { src: "/photos/fenetres_urbex_04.webp", alt: "Urbex", category: "Urbex" },
    { src: "/photos/foret_00.webp", alt: "Forêt", category: "Nature" },
    { src: "/photos/foret_01.webp", alt: "Forêt", category: "Nature" },
    { src: "/photos/Hall_Urbex.webp", alt: "Urbex", category: "Urbex" },
    { src: "/photos/homme_journal.webp", alt: "Homme", category: "Portrait" },
    { src: "/photos/italie_02.webp", alt: "Italie", category: "Paysage" },
    { src: "/photos/italie_03.webp", alt: "Italie", category: "Paysage" },
    { src: "/photos/italie_04.webp", alt: "Italie", category: "Paysage" },
    { src: "/photos/italie_05.webp", alt: "Italie", category: "Paysage" },
    { src: "/photos/L_enfant_et_le_ballon.webp", alt: "Enfant", category: "Portrait" },
    { src: "/photos/le_joueur_de_guitare.webp", alt: "Guitariste", category: "Portrait" },
    { src: "/photos/mer_00.webp", alt: "La Mer", category: "Nature" },
    { src: "/photos/reflets.webp", alt: "Reflets", category: "Nature" },
    { src: "/photos/spectacle_02.webp", alt: "Spectacle", category: "Spectacle" },
    { src: "/photos/urbex_balance.webp", alt: "Urbex", category: "Urbex" },
    { src: "/photos/urbex_escaliers.webp", alt: "Urbex", category: "Urbex" },
    { src: "/photos/urbex_hangar.webp", alt: "Urbex", category: "Urbex" },
    { src: "/photos/urbex_hangarReflets.webp", alt: "Urbex", category: "Urbex" },
    { src: "/photos/urbex_machineAEcrire.webp", alt: "Urbex", category: "Urbex" },
    { src: "/photos/urbex_mur.webp", alt: "Urbex", category: "Urbex" },
    { src: "/photos/urbex_radiateur.webp", alt: "Urbex", category: "Urbex" },
    { src: "/photos/urbex_reflets.webp", alt: "Urbex", category: "Urbex" },
    { src: "/photos/urbex_salon.webp", alt: "Urbex", category: "Urbex" },
  ]

  const handleImageSelect = useCallback((image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setSelectedIndex(index)
  }, [])

  return (
    <>
      <div ref={containerRef} className="w-full min-h-screen">
        <div ref={titleRef} className="w-full h-[40vh] flex items-center justify-center">
          <motion.h2
            className="text-4xl md:text-6xl lg:text-8xl font-bold text-center"
            style={{
              opacity: titleOpacity,
              y: titleY,
            }}
          >
            Mes photos
          </motion.h2>
        </div>

        <div className="w-full px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            {!isLoading &&
              images.map((image, index) => (
                <PhotoItem
                  key={image.src}
                  image={image}
                  index={index}
                  progress={scrollYProgress}
                  onSelect={() => handleImageSelect(image, index)}
                />
              ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedImage && (
          <Modal
            image={selectedImage}
            images={images}
            currentIndex={selectedIndex}
            onClose={() => {
              setSelectedImage(null)
              setSelectedIndex(-1)
            }}
            onNavigate={handleImageSelect}
          />
        )}
      </AnimatePresence>
    </>
  )
}

const PhotoItem = ({ image, index, progress, onSelect }: PhotoItemProps) => {
  const translateY = useTransform(progress, [0, 0.1 + index * 0.05], [50 + index * 10, 0])

  const opacity = useTransform(progress, [0, 0.05 + index * 0.02], [0, 1])

  return (
    <motion.div
      style={{
        opacity,
        y: translateY,
      }}
      className="mb-8 px-4 w-full md:w-3/4 mx-auto cursor-pointer"
      onClick={onSelect}
    >
      <motion.div
        className="relative aspect-[4/3] rounded-xl overflow-hidden group 
                   transition-transform duration-300
                   bg-gray-100 dark:bg-gray-800"
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover object-center
                     brightness-100 contrast-105 saturate-105
                     dark:brightness-90"
          loading="lazy"
        />

        <div
          className="absolute inset-0 bg-gradient-to-t 
                     from-black/50 via-transparent to-transparent 
                     opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300
                     dark:from-black/70"
        >
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <motion.div
              initial={false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span
                className="inline-block px-3 py-1 mb-2 text-sm font-medium 
                             bg-white/20 rounded-full text-white 
                             backdrop-blur-sm"
              >
                {image.category}
              </span>
              <h3 className="text-white text-xl font-medium">{image.alt}</h3>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Thumbnail = ({ thumb, index, currentIndex, onNavigate }: ThumbnailProps) => (
  <motion.div
    key={thumb.src}
    className={`relative w-20 h-16 rounded-lg overflow-hidden 
                cursor-pointer flex-shrink-0
                ${
                  currentIndex === index
                    ? "ring-2 ring-white"
                    : "opacity-60 hover:opacity-100"
                }`}
    onClick={() => onNavigate(thumb, index)}
    whileHover={{ scale: 1.05 }}
  >
    <img
      src={thumb.src}
      alt={thumb.alt}
      className="w-full h-full object-cover
                 brightness-100 contrast-105 saturate-105
                 dark:brightness-90"
    />
  </motion.div>
)

const Modal = ({ image, images, currentIndex, onClose, onNavigate }: ModalProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set([image.src]))

  useEffect(() => {
    const imagesToPreload = [
      images[currentIndex - 1]?.src,
      images[currentIndex + 1]?.src,
    ].filter((src): src is string => !!src && !loadedImages.has(src))

    imagesToPreload.forEach((src) => {
      const img = new Image()
      img.src = src
      img.onload = () => setLoadedImages((prev) => new Set(prev).add(src))
    })
  }, [currentIndex, images, loadedImages])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(images[currentIndex - 1], currentIndex - 1)
      }
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
        onNavigate(images[currentIndex + 1], currentIndex + 1)
      }
    },
    [currentIndex, images, onClose, onNavigate]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full h-full max-h-[85vh] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className={`${buttonBaseStyle} top-4 right-4`}>
          <X size={24} />
        </button>

        {currentIndex > 0 && (
          <button
            onClick={() => onNavigate(images[currentIndex - 1], currentIndex - 1)}
            className={`${buttonBaseStyle} left-4 top-1/2 -translate-y-1/2`}
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            onClick={() => onNavigate(images[currentIndex + 1], currentIndex + 1)}
            className={`${buttonBaseStyle} right-4 top-1/2 -translate-y-1/2`}
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div className="w-full h-full flex items-center justify-center">
          <motion.img
            key={image.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-contain
                       brightness-100 contrast-105 saturate-105
                       dark:brightness-90"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="p-6 bg-gradient-to-t from-black/90 to-transparent">
            <span
              className="inline-block px-3 py-1 mb-2 text-sm font-medium 
                           bg-white/20 rounded-full text-white backdrop-blur-sm"
            >
              {image.category}
            </span>
            <h2 className="text-white text-2xl font-medium">{image.alt}</h2>
          </div>

          <div className="hidden md:flex overflow-x-auto justify-center items-center gap-2 p-4 bg-black/80">
            {images
              .slice(
                Math.max(0, currentIndex - 3),
                Math.min(images.length, currentIndex + 4)
              )
              .map((thumb, idx) => {
                const actualIndex = Math.max(0, currentIndex - 3) + idx
                return (
                  <Thumbnail
                    key={thumb.src}
                    thumb={thumb}
                    index={actualIndex}
                    currentIndex={currentIndex}
                    onNavigate={onNavigate}
                  />
                )
              })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PhotoGallery
