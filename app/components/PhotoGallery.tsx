import { AnimatePresence, motion, useScroll } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useRef, useState } from "react"

type Photo = {
  id: number
  src: string
  alt: string
  orientation: "landscape" | "portrait"
}

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const galleryRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  const photos: Photo[] = [
    {
      id: 1,
      src: `/api/placeholder/800/600`,
      alt: "Photo 1",
      orientation: "landscape",
    },
    {
      id: 2,
      src: `/api/placeholder/800/1000`,
      alt: "Photo 2",
      orientation: "portrait",
    },
    {
      id: 3,
      src: `/api/placeholder/800/600`,
      alt: "Photo 3",
      orientation: "landscape",
    },
    {
      id: 4,
      src: `/api/placeholder/800/1000`,
      alt: "Photo 4",
      orientation: "portrait",
    },
    {
      id: 5,
      src: `/api/placeholder/800/600`,
      alt: "Photo 5",
      orientation: "landscape",
    },
    {
      id: 6,
      src: `/api/placeholder/800/1000`,
      alt: "Photo 6",
      orientation: "portrait",
    },
  ]

  const navigatePhoto = (direction: "prev" | "next") => {
    if (!selectedPhoto) return

    const currentIndex = photos.findIndex((photo) => photo.id === selectedPhoto.id)
    let newIndex: number

    if (direction === "next") {
      newIndex = currentIndex + 1 >= photos.length ? 0 : currentIndex + 1
    } else {
      newIndex = currentIndex - 1 < 0 ? photos.length - 1 : currentIndex - 1
    }

    setSelectedPhoto(photos[newIndex])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation()
    switch (e.key) {
      case "ArrowLeft":
        navigatePhoto("prev")
        break
      case "ArrowRight":
        navigatePhoto("next")
        break
      case "Escape":
        setSelectedPhoto(null)
        break
    }
  }

  const Modal = ({ photo }: { photo: Photo }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={() => setSelectedPhoto(null)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <button
        className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 
                   bg-black/20 rounded-full transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          setSelectedPhoto(null)
        }}
      >
        <X size={24} />
      </button>

      <button
        className="absolute left-4 p-2 text-white hover:text-gray-300 
                   bg-black/20 rounded-full transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          navigatePhoto("prev")
        }}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className="absolute right-4 p-2 text-white hover:text-gray-300 
                   bg-black/20 rounded-full transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          navigatePhoto("next")
        }}
      >
        <ChevronRight size={24} />
      </button>

      <motion.img
        src={photo.src}
        alt={photo.alt}
        className="max-h-[90vh] max-w-[90vw] object-contain"
        layoutId={`photo-${photo.id}`}
      />

      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 
                    text-white bg-black/20 px-4 py-2 rounded-full"
      >
        {photo.alt}
      </div>
    </motion.div>
  )

  return (
    <div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 transition-colors duration-300"
      ref={galleryRef}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 dark:bg-blue-400 origin-left z-40"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={imageVariants}
              layoutId={`photo-${photo.id}`}
              className="break-inside-avoid"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 
                         shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <motion.img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-auto"
                    onClick={() => setSelectedPhoto(photo)}
                  />
                  <div
                    className="absolute inset-0 bg-black/0 hover:bg-black/30 
                                transition-all duration-300 flex items-center justify-center 
                                opacity-0 hover:opacity-100"
                  >
                    <button
                      className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 
                               text-gray-900 dark:text-white rounded-lg 
                               transform -translate-y-2 hover:translate-y-0 
                               transition-all duration-300"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      Voir en grand
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedPhoto && <Modal photo={selectedPhoto} />}
      </AnimatePresence>
    </div>
  )
}

export default PhotoGallery
