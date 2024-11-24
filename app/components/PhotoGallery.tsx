import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const PhotoGallery = () => {
  const [isDesktop, setIsDesktop] = useState(false)
  const galleryRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  })

  // Gestion responsive du parallax
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    // Check initial
    checkIsDesktop()

    // Listener pour les changements de taille d'écran
    window.addEventListener("resize", checkIsDesktop)

    // Cleanup
    return () => window.removeEventListener("resize", checkIsDesktop)
  }, [])

  // Parallax uniquement pour desktop
  const yOffset1 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 40, 80])
  const yOffset2 = useTransform(scrollYProgress, [0, 0.5, 1], [0, -30, -60])
  const yOffset3 = useTransform(scrollYProgress, [0.1, 0.6, 1], [0, 50, 100])
  const yOffset4 = useTransform(scrollYProgress, [0.2, 0.7, 1], [0, -40, -80])
  const yOffset5 = useTransform(scrollYProgress, [0.3, 0.8, 1], [0, 30, 60])
  const yOffset6 = useTransform(scrollYProgress, [0.4, 0.9, 1], [0, -50, -100])

  const yOffsets = [yOffset1, yOffset2, yOffset3, yOffset4, yOffset5, yOffset6]

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
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const photos = [
    {
      id: 1,
      src: "/api/placeholder/600/400",
      alt: "Projet photo 1",
      orientation: "landscape",
    },
    {
      id: 2,
      src: "/api/placeholder/400/600",
      alt: "Projet photo 2",
      orientation: "portrait",
    },
    {
      id: 3,
      src: "/api/placeholder/600/400",
      alt: "Projet photo 3",
      orientation: "landscape",
    },
    {
      id: 4,
      src: "/api/placeholder/400/600",
      alt: "Projet photo 4",
      orientation: "portrait",
    },
    {
      id: 5,
      src: "/api/placeholder/600/400",
      alt: "Projet photo 5",
      orientation: "landscape",
    },
    {
      id: 6,
      src: "/api/placeholder/400/600",
      alt: "Projet photo 6",
      orientation: "portrait",
    },
  ]

  return (
    <div
      className="relative min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 transition-colors duration-300"
      ref={galleryRef}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 dark:bg-blue-400 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 lg:gap-16">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={imageVariants}
              style={{
                y: isDesktop ? yOffsets[index] : 0,
              }}
              className={`
                group relative overflow-hidden rounded-lg shadow-lg 
                bg-white dark:bg-gray-800 
                transition-colors duration-300
                ${photo.orientation === "portrait" ? "sm:row-span-2" : ""}
                transform-gpu
                motion-reduce:transform-none
              `}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`
                  relative overflow-hidden
                  ${photo.orientation === "portrait" ? "aspect-[3/4]" : "aspect-video"}
                `}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-medium mb-2
                               shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      Voir le projet
                    </motion.button>
                    <p className="text-white text-sm text-center mt-2 max-w-xs line-clamp-2">
                      {photo.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default PhotoGallery
