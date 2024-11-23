import { motion } from "framer-motion"
import { ChevronDown, Youtube } from "lucide-react"
import { useEffect, useState } from "react"
import { Video } from "../types/types"

interface VideoModalProps {
  video: Video
  onClose: () => void
}

export const VideoModal = ({ video, onClose }: VideoModalProps) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

  // Bloquer le scroll quand la modale est ouverte
  useEffect(() => {
    document.body.style.overflow = "hidden"

    // Restaurer le scroll quand la modale se ferme
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
      />

      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClose()
          }
        }}
      >
        <motion.div
          className="w-full max-w-3xl bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl overflow-hidden group"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="aspect-video relative">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-white/10 p-4 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors"
                >
                  <Youtube className="w-12 h-12 text-white" />
                </motion.div>
              </a>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors z-50"
              aria-label="Fermer"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="relative h-[280px]">
            {/* Contenu statique en arrière-plan */}
            <div className="absolute inset-x-0 top-0 p-6">
              <h2 className="text-2xl font-bold text-white">{video.title}</h2>
              <div className="mt-1 text-sm text-white/80">
                {video.duration} • {video.views.toLocaleString()} vues
              </div>
              <div className="flex gap-2 text-sm text-white/80 mt-4">
                <span className="bg-white/20 px-3 py-1 rounded-full">{video.date}</span>
              </div>
            </div>

            {/* Contenu qui slide */}
            <motion.div
              className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-md shadow-2xl shadow-black/50"
              initial={false}
              animate={{
                y: isDescriptionOpen ? 0 : "calc(100% - 3.5rem)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                y: "calc(100% - 2rem)",
              }}
              whileHover={{
                y: 0,
              }}
            >
              {/* Barre de pull */}
              <div className="bg-gradient-to-b from-transparent to-black/20">
                {/* Version mobile */}
                <button
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                  className="w-full h-14 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors md:hidden"
                  aria-label={
                    isDescriptionOpen ? "Masquer la description" : "Voir la description"
                  }
                >
                  <div className="w-12 h-1 bg-white rounded-full mb-2" />
                  <motion.div
                    animate={{ rotate: isDescriptionOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-white" />
                  </motion.div>
                </button>

                {/* Version desktop */}
                <div className="hidden md:flex h-14 items-center justify-center">
                  <div className="w-12 h-1 bg-white/40 rounded-full transition-transform duration-300 group-hover:scale-75" />
                </div>
              </div>

              {/* Contenu */}
              <div className="overflow-y-auto h-[calc(100%-3.5rem)]">
                <div className="px-6 pt-2 pb-6 space-y-4">
                  <h3 className="text-lg font-semibold text-white">Description</h3>
                  <p className="text-white/90 leading-relaxed">{video.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 px-6 pb-6 border-t border-white/20">
                  <div>
                    <dt className="text-sm text-white/60 mb-1">Date de publication</dt>
                    <dd className="text-sm text-white font-medium">{video.date}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-white/60 mb-1">Durée</dt>
                    <dd className="text-sm text-white font-medium">{video.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-white/60 mb-1">Vues totales</dt>
                    <dd className="text-sm text-white font-medium">
                      {video.views.toLocaleString()}
                    </dd>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
