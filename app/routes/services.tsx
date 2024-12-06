import { Link } from "@remix-run/react"
import { AnimatePresence, motion } from "framer-motion"
import { Camera, PenTool, Scissors, Video, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const ProjectDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const scrollPosition = useRef(0)

  useEffect(() => {
    if (isOpen) {
      scrollPosition.current = window.scrollY
      document.body.style.overflow = "hidden"
      document.body.style.height = "100vh"
      document.body.style.paddingRight = "var(--scrollbar-width)"
    } else {
      document.body.style.overflow = ""
      document.body.style.height = ""
      document.body.style.paddingRight = ""
    }

    return () => {
      if (!isOpen) {
        document.body.style.overflow = ""
        document.body.style.height = ""
        document.body.style.paddingRight = ""
      }
    }
  }, [isOpen])

  const handleClose = () => {
    document.body.style.overflow = ""
    document.body.style.height = ""
    document.body.style.paddingRight = ""
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 300,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: {
                duration: 0.2,
              },
            }}
            className="relative w-[calc(100%-2rem)] md:w-full md:max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-xl"
          >
            {/* Header avec bouton de fermeture */}
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Contenu avec padding ajusté */}
            <div className="p-6 pt-12 md:p-8 md:pt-12">
              <div className="text-center">
                <motion.h2
                  initial={{ y: 10, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.1,
                    },
                  }}
                  className="text-2xl md:text-3xl font-semibold mb-4 text-neutral-900 dark:text-white"
                >
                  Et si on parlait de votre projet ?
                </motion.h2>

                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.2,
                    },
                  }}
                  className="text-neutral-600 dark:text-neutral-400 mb-6"
                >
                  Je suis là pour répondre à vos questions et vous accompagner dans la
                  réalisation de votre projet.
                </motion.p>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                    },
                  }}
                >
                  <Link
                    to="/contact"
                    className="block w-full py-4 px-6 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 rounded-full font-medium transition-colors text-center"
                  >
                    Commencer la discussion
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  delay,
  index,
  onCardClick,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  delay: number
  index: number
  onCardClick: () => void
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCardClick}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-700"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex flex-col h-full p-8 rounded-2xl bg-white dark:bg-neutral-900 group-hover:bg-opacity-0 dark:group-hover:bg-opacity-0 transition-all duration-300">
        <motion.div
          className="flex items-center"
          animate={{
            y: isHovered ? -10 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-800 dark:group-hover:bg-neutral-700 transition-colors">
            <Icon className="w-8 h-8 text-neutral-600 dark:text-neutral-400 group-hover:text-white transition-colors" />
          </div>
          <h3 className="ml-4 text-2xl font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-white transition-colors">
            {title}
          </h3>
        </motion.div>

        <motion.div
          className="mt-6 space-y-4"
          animate={{
            y: isHovered ? -10 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className="text-lg text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-200 transition-colors">
            {description}
          </p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            className="h-px bg-white/30"
            transition={{ duration: 0.3 }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="pt-2"
          >
            <Link
              to="/contact"
              className="inline-flex items-center text-white group-hover:text-white/90"
              onClick={(e) => e.stopPropagation()} // Empêche le clic de la carte
            >
              Me contacter
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-4 right-4 text-6xl font-bold text-neutral-200/10 dark:text-neutral-700/20 group-hover:text-white/5">
          {(index + 1).toString().padStart(2, "0")}
        </div>
      </div>
    </motion.div>
  )
}

const ServicesPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const services = [
    {
      icon: Camera,
      title: "Photographie",
      description:
        "Shootings professionnels, événementiel, portraits, mariages. Équipement haute qualité pour des résultats exceptionnels.",
      delay: 0.1,
    },
    {
      icon: Video,
      title: "Vidéographie",
      description:
        "Captation vidéo 4K, films d'entreprise, clips musicaux, événements. Narration visuelle impactante.",
      delay: 0.2,
    },
    {
      icon: Scissors,
      title: "Montage Vidéo",
      description:
        "Montage professionnel, color grading, effets spéciaux, sound design pour des vidéos qui captent l'attention.",
      delay: 0.3,
    },
    {
      icon: PenTool,
      title: "Retouche Photo",
      description:
        "Retouche professionnelle, correction colorimétrique, retouche beauté, photomontage créatif.",
      delay: 0.4,
    },
  ]

  return (
    <div className="min-h-screen px-4 py-16 md:py-24 md:px-8 bg-neutral-50 dark:bg-neutral-950">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4 px-6 py-2 rounded-full bg-neutral-200 dark:bg-neutral-800/50"
          >
            <span className="text-neutral-600 dark:text-neutral-400">
              Services professionnels
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-neutral-900 dark:text-white"
          >
            Expertise visuelle
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-400"
          >
            De la capture à la retouche, je vous accompagne dans tous vos projets visuels
            avec une approche créative et professionnelle
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
              index={index}
              onCardClick={() => setIsDialogOpen(true)}
            />
          ))}
        </div>
      </motion.div>

      <ProjectDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  )
}

export default ServicesPage
