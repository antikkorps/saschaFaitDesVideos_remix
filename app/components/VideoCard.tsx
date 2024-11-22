import { AnimatePresence, motion } from "framer-motion"
import { Youtube } from "lucide-react"
import { useState } from "react"

interface VideoCardProps {
  id: string
  title: string
  thumbnailUrl: string
  description: string
  date: string
  duration: string
  youtubeUrl: string
  views: number
  className?: string
}

export const VideoCard = ({ className = "", ...props }: VideoCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        layoutId={`card-${props.id}`}
        onClick={() => setIsOpen(true)}
        className={`group relative text-left overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Thumbnail et overlay */}
        <motion.div layoutId={`image-container-${props.id}`} className="absolute inset-0">
          <motion.img
            layoutId={`image-${props.id}`}
            src={props.thumbnailUrl}
            alt={props.title}
            className="w-full h-full object-cover"
          />
          <motion.div
            layoutId={`overlay-${props.id}`}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
          />
        </motion.div>

        {/* Contenu de la carte */}
        <motion.div
          layoutId={`content-${props.id}`}
          className="absolute bottom-0 left-0 right-0 p-4"
        >
          <motion.h3
            layoutId={`title-${props.id}`}
            className="font-bold text-white text-shadow-lg line-clamp-2"
          >
            {props.title}
          </motion.h3>
          <motion.div
            layoutId={`meta-${props.id}`}
            className="mt-2 text-sm text-white/80"
          >
            {props.duration} • {props.views.toLocaleString()} vues
          </motion.div>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay avec flou */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                layoutId={`card-${props.id}`}
                className="w-full max-w-3xl bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl overflow-hidden"
              >
                <div className="relative">
                  {/* Section image */}
                  <motion.div
                    layoutId={`image-container-${props.id}`}
                    className="aspect-video relative"
                  >
                    <motion.img
                      layoutId={`image-${props.id}`}
                      src={props.thumbnailUrl}
                      alt={props.title}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      layoutId={`overlay-${props.id}`}
                      className="absolute inset-0 bg-black/30"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <a
                        href={props.youtubeUrl}
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
                    </motion.div>
                  </motion.div>

                  {/* Section contenu */}
                  <motion.div layoutId={`content-${props.id}`} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <motion.h2
                          layoutId={`title-${props.id}`}
                          className="text-2xl font-bold text-white"
                        >
                          {props.title}
                        </motion.h2>
                        <motion.div
                          layoutId={`meta-${props.id}`}
                          className="mt-1 text-sm text-white/80"
                        >
                          {props.duration} • {props.views.toLocaleString()} vues
                        </motion.div>
                      </div>

                      <button
                        onClick={() => setIsOpen(false)}
                        className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
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

                    {/* Nouveau contenu avec animation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-4"
                    >
                      <div className="flex gap-2 text-sm text-white/60 mb-4">
                        <span className="bg-white/10 px-3 py-1 rounded-full">
                          {props.date}
                        </span>
                      </div>
                      <p className="text-white/90 leading-relaxed">{props.description}</p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
