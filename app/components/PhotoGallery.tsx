import {
  AnimatePresence,
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import React, { useCallback, useEffect, useRef, useState } from "react"

interface GalleryImage {
  src: string
  alt: string
  category: string
}

const buttonBaseStyle = `
  absolute z-10 p-3 rounded-full 
  bg-black/40 backdrop-blur-sm
  text-white
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-white/50
  hover:bg-white/20
`

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
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
  ]

  const handleImageSelect = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setSelectedIndex(index)
  }

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
            {images.map((image, index) => (
              <PhotoItem
                key={index}
                image={image}
                index={index}
                progress={scrollYProgress}
                onSelect={() => handleImageSelect(image, index)}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
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

interface PhotoItemProps {
  image: GalleryImage
  index: number
  progress: MotionValue<number>
  onSelect: () => void
}

const PhotoItem = ({ image, index, progress, onSelect }: PhotoItemProps) => {
  const translateY = useTransform(progress, [0, 0.2 + index * 0.1], [50 + index * 15, 0])

  const opacity = useTransform(
    progress,
    [0, 0.1 + index * 0.05, 0.2 + index * 0.05],
    [0, 0.5, 1]
  )

  const scale = useTransform(
    progress,
    [0, 0.1 + index * 0.05, 0.2 + index * 0.05],
    [0.9, 0.95, 1]
  )

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y: translateY,
      }}
      className="mb-8 px-4 w-full md:w-3/4 mx-auto cursor-pointer"
      onClick={onSelect}
    >
      <motion.div
        className="relative aspect-[4/3] rounded-xl overflow-hidden group 
                   ring-1 ring-black/10 dark:ring-white/10
                   transition-all duration-300
                   bg-black/5 dark:bg-transparent"
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover object-center
                     contrast-[1.02] saturate-[1.05]"
          loading="lazy"
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                      dark:from-black/80"
        >
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="inline-block px-3 py-1 mb-2 text-sm font-medium 
                             bg-white/10 rounded-full text-white backdrop-blur-sm"
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

interface ModalProps {
  image: GalleryImage
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (image: GalleryImage, index: number) => void
}

const Modal = ({ image, images, currentIndex, onClose, onNavigate }: ModalProps) => {
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

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentIndex > 0) {
      onNavigate(images[currentIndex - 1], currentIndex - 1)
    }
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentIndex < images.length - 1) {
      onNavigate(images[currentIndex + 1], currentIndex + 1)
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full h-full max-h-[85vh] bg-black/40 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className={`${buttonBaseStyle} top-4 right-4`}
        >
          <X size={24} />
        </button>

        {currentIndex > 0 && (
          <button
            onClick={handlePrevious}
            className={`${buttonBaseStyle} left-4 top-1/2 -translate-y-1/2`}
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            onClick={handleNext}
            className={`${buttonBaseStyle} right-4 top-1/2 -translate-y-1/2`}
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div className="w-full h-full flex items-center justify-center bg-black/20">
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-contain contrast-[1.02] saturate-[1.05]"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="p-6 bg-gradient-to-t from-black/90 to-transparent">
            <span
              className="inline-block px-3 py-1 mb-2 text-sm font-medium 
                           bg-white/10 rounded-full text-white backdrop-blur-sm"
            >
              {image.category}
            </span>
            <h2 className="text-white text-2xl font-medium">{image.alt}</h2>
          </div>

          <div className="hidden md:flex justify-center items-center gap-2 p-4 bg-black/80">
            {images.map((thumb, index) => (
              <motion.div
                key={index}
                className={`relative w-20 h-16 rounded-lg overflow-hidden cursor-pointer
                          ${
                            currentIndex === index
                              ? "ring-2 ring-white"
                              : "opacity-60 hover:opacity-100"
                          }`}
                onClick={(e) => {
                  e.stopPropagation()
                  onNavigate(thumb, index)
                }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={thumb.src}
                  alt={thumb.alt}
                  className="w-full h-full object-cover contrast-[1.02] saturate-[1.05]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PhotoGallery
